// Packages.
import * as _ from 'lodash';
import * as turfHelpers from '@turf/helpers';

// Internal.
import { rectangleDecomposition } from './rectangleDecomposition';

// Code.
describe('rectangleDecomposition', () => {
  it('should return the expected output', () => {
    const result = rectangleDecomposition(polygon);
    expect(result).toMatchSnapshot();
  });
});

// Mocks.
const polygon: turfHelpers.Feature<turfHelpers.Polygon> = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [2, 41.58],
        [2, 41.54],
        [2.04, 41.54],
        [2.04, 41.51],
        [2.09, 41.51],
        [2.09, 41.47],
        [2, 41.47],
        [2, 41.43],
        [2.09, 41.43],
        [2.09, 41.4],
        [2.18, 41.4],
        [2.18, 41.36],
        [2.29, 41.36],
        [2.29, 41.4],
        [2.39, 41.4],
        [2.39, 41.47],
        [2.29, 41.47],
        [2.29, 41.51],
        [2.34, 41.51],
        [2.34, 41.61],
        [2.29, 41.61],
        [2.29, 41.58],
        [2.18, 41.58],
        [2.09, 41.58],
        [2, 41.58],
      ],
    ],
  },
};
