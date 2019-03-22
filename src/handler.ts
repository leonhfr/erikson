// Packages.
import * as AWSLambda from 'aws-lambda';
import * as debug from 'debug';

// Internal.

// Code.
const debugError = debug('cartier:error:scheduler');
const debugVerbose = debug('cartier:verbose:scheduler');

export const main = async (
  event: AWSLambda.ScheduledEvent,
  context: AWSLambda.Context,
  callback: AWSLambda.Callback
) => {
  try {
    debugVerbose(`event: %j`, event);
    debugVerbose(`context: %j`, context);

    return callback(undefined, 'Done');
  } catch (err) {
    debugError(err);
    return callback(err, 'Error');
  }
};
