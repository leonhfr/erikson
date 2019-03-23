// Packages.
import * as _ from 'lodash';
import * as turfHelpers from '@turf/helpers';

// Internal.

// Code.
export const areaDivider = (
  boxes: Array<Array<turfHelpers.BBox>>
): turfHelpers.Feature<turfHelpers.Polygon> => {
  console.log(boxes);

  // do stuff

  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [2.1869659423828125, 41.40269443107466],
          [2.219409942626953, 41.411449504915495],
          [2.2019004821777344, 41.424322470327],
          [2.186450958251953, 41.42406503602331],
          [2.1869659423828125, 41.40269443107466],
        ],
      ],
    },
  };
};
