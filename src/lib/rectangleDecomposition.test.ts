// Internal.
import { rectangleDecomposition } from './rectangleDecomposition';
import * as Mocks from '../mocks';

// Code.
describe('rectangleDecomposition', () => {
  it('should return the expected output', () => {
    const result = rectangleDecomposition(Mocks.boxesPolygon);
    expect(result).toMatchSnapshot();
  });
});
