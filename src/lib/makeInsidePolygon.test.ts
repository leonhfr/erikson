// Packages.
import * as turfHelpers from '@turf/helpers';

// Internal.
import { mergeBoxes } from './makeInsidePolygon';

// Code.
describe('makeInsidePolygon', () => {});

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
