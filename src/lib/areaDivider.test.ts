// Internal.
import { areaDivider } from './areaDivider';
import * as Mocks from '../mocks';

// Code.
describe('areaDivider', () => {
  it('should return the expected output', () => {
    const result = areaDivider(Mocks.santMartiPolygon, Mocks.santMartiBox);
    expect(result).toMatchSnapshot();
  });
});
