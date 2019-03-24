// Packages.
import * as turfHelpers from '@turf/helpers';

// Internal.
import { areaDivider } from './areaDivider';
import * as Mocks from '../mocks';

// Code.
describe('getBoundingBox', () => {
  it('should return the bounding box for a big polygon', () => {
    const result = areaDivider(Mocks.santMarti, bbox);
    expect(result).toMatchSnapshot();
  });
});

const bbox: turfHelpers.BBox = [2.17, 41.38, 2.23, 41.44];
