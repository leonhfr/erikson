// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';
import * as Wittgenstein from '@scenicroutes/wittgenstein';
import * as turfInvariant from '@turf/invariant';
import { v4 as uuid } from 'uuid';

// Internal.
import { areaDivider } from './lib/areaDivider';
import { getBoundingBox } from './lib/getBoundingBox';
import { makeInsidePolygon } from './lib/makeInsidePolygon';

// Code.
const debugError = debug('erikson:error:handler');
const debugVerbose = debug('erikson:verbose:handler');

export const main = async (
  event: { area: string }, // Area ID to divide
  context: AWSLambda.Context,
  callback: AWSLambda.Callback
) => {
  try {
    debugVerbose(`event: %j`, event);
    debugVerbose(`context: %j`, context);

    if (!event.area || typeof event.area !== 'string') {
      throw new Error('area must be provided and must be a string');
    }

    const areaList = await Eratosthenes.AreaModel.list();

    if (areaList instanceof Error) {
      throw areaList;
    }

    const maybeArea = areaList.ok.filter(area => area.id === event.area);

    if (maybeArea.length !== 1) {
      throw new Error('Area not found.');
    }

    const area = maybeArea[0];

    debugVerbose(`area to divide: %o`, area);

    // Fetching Geojson

    const areaGeojson = await Eratosthenes.AreaModel.getAreaGeojson(area.file);

    if (areaGeojson instanceof Error) {
      throw areaGeojson;
    }

    debugVerbose(`area geojson: %o`, areaGeojson);

    // Bounding Box

    const boundingBox = getBoundingBox(areaGeojson);

    debugVerbose(`area boundingBox: %o`, boundingBox);

    // Area division

    const areaDivision = areaDivider(areaGeojson, boundingBox);

    debugVerbose(`area areaDivision: %o`, areaDivision);

    // Saving border zones

    const borderZonesPromises = areaDivision.zones.map(async zone => {
      const maybeZone = Wittgenstein.Zone.create({
        id: uuid(),
        area,
        bbox: zone.box,
        zone: zone.zone,
      });

      if (maybeZone instanceof Error) {
        debugError(`fail to build a zone: %o`, maybeZone);
        return maybeZone;
      }

      return await Eratosthenes.ZoneModel.put(maybeZone);
    });

    // Inside polygon

    const insidePolygon = makeInsidePolygon(areaDivision.boxes);

    debugVerbose(`area insidePolygon: %o`, insidePolygon);

    if (!insidePolygon) {
      throw new Error(
        `rectangleDecomposition returned: ${JSON.stringify(insidePolygon)}`
      );
    }

    const featureType = turfInvariant.getType(insidePolygon);

    if (featureType !== 'Polygon') {
      throw new Error(`rectangleDecomposition returned a ${featureType}`);
    }

    // Rectangle decomposition

    // make zones for rectangles
    // put to db

    // Awaiting saving before exiting

    const putResponses = await Promise.all([...borderZonesPromises]);

    putResponses.forEach(response => {
      if (response instanceof Error) {
        debugError(`response error: %o`, response);
      }
    });

    return callback(undefined, 'Done');
  } catch (err) {
    debugError(err);
    return callback(err, 'Error');
  }
};
