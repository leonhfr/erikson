// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';
import { Eratosthenes } from '@scenicroutes/eratosthenes';

// Internal.

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
      throw new Error('area not found');
    }

    const area = maybeArea[0];

    debugVerbose(`area to divide: %o`, area);

    // concave hull

    // rectangle decomposition

    // make zones for rectangles

    // make zones for polygons

    // First we divide it using the areaDivider
    // We have squares of the minimum dimension

    // Those who also have a a polygon are one the edge
    // We save them for publishing (1)

    // Concave hull on the remainers

    // Mapping to integers

    // Rectangle decomposition

    // Mapping to coordinates

    // We have bboc-rectangles for the inside (2)

    // We publish (1) and (2)

    return callback(undefined, 'Done');
  } catch (err) {
    debugError(err);
    return callback(err, 'Error');
  }
};
