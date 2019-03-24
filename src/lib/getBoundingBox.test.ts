// Internal.
import { getBoundingBox } from './getBoundingBox';
import * as Mocks from '../mocks';

// Code.
describe('getBoundingBox', () => {
  it('should return the rounded bounding box', () => {
    const result = getBoundingBox(Mocks.polygon);
    expect(result).toMatchSnapshot();
  });
  it('should return the bounding box for a big polygon', () => {
    const result = getBoundingBox(Mocks.santMartiPolygon);
    expect(result).toMatchSnapshot();
  });
});
