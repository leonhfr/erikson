// Packages.
import * as _ from 'lodash';
import * as turfHelpers from '@turf/helpers';

// Internal.
import { rectangleDecomposition } from './rectangleDecomposition';

// Code.
describe('rectangleDecomposition', () => {
  it('should return', () => {
    const pointsCollection = turfHelpers.featureCollection(
      _.map(_.uniqWith(points, _.isEqual), p => turfHelpers.point(p))
    );
    const result = rectangleDecomposition(pointsCollection);
    expect(result).toMatchSnapshot();
  });
});

const points = [[0, 44.5], [0, 42.8], [2.1, 42.8], [2.1, 44.5]].map(x =>
  x.map(Math.floor)
);
// const points = [
//   [0, 44.5],
//   [0, 42.8],
//   [2.1, 42.8],
//   [2.1, 39],
//   [10.2, 39],
//   [10.2, 40.9],
//   [4.6, 40.9],
//   [4.6, 42.8],
//   [10.2, 42.8],
//   [10.2, 44.5],
// ].map(x => x.map(Math.floor));
