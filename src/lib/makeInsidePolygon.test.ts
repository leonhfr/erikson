// Packages.
import * as turfHelpers from '@turf/helpers';

// Internal.
import { makeInsidePolygon, mergeBoxes } from './makeInsidePolygon';

// Code.
describe('makeInsidePolygon', () => {
  it('should correctly compute the polygon', () => {
    const boxes: Array<Array<turfHelpers.BBox>> = [
      [
        [0, 0, 1, 1],
        [0, 1, 1, 2],
        [0, 2, 1, 3],
        [0, 4, 1, 5],
        [0, 6, 1, 7],
        [0, 7, 1, 8],
      ],
      [
        [1, 1, 2, 2],
        [1, 2, 2, 3],
        [1, 3, 2, 4],
        [1, 4, 2, 5],
        [1, 5, 2, 6],
        [1, 6, 2, 7],
      ],
      [[2, 2, 3, 3], [2, 4, 3, 6], [2, 6, 3, 7]],
    ];
    const result = makeInsidePolygon(boxes);
    expect(result).toMatchSnapshot();
  });
});

describe('mergeBoxes', () => {
  it('should correctly reduce the boxes', () => {
    const boxes: Array<turfHelpers.BBox> = [
      [0, 0, 1, 1],
      [0, 1, 1, 2],
      [0, 2, 1, 3],
      [0, 4, 1, 5],
      [0, 6, 1, 7],
      [0, 7, 1, 8],
    ];
    const result = mergeBoxes(boxes);
    expect(result).toMatchSnapshot();
  });
});
