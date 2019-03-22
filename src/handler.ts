// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';

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

    // List Areas
    // Select the one whose ID match

    // Check if it is an Area, check if it has already been computed

    // We have an Area

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
