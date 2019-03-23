// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';

// Internal.
import { areaDivider } from './lib/areaDivider';
import { getBoundingBox } from './lib/getBoundingBox';

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

    // make inside zone
    // rectangle decomposition
    // make zones for rectangles
    // make zones for polygons
    // puting everything to dynamo

    return callback(undefined, 'Done');
  } catch (err) {
    debugError(err);
    return callback(err, 'Error');
  }
};
