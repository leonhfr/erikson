// Packages.
import * as turfHelpers from '@turf/helpers';

// Internal.
import { getBoundingBox } from './getBoundingBox';
import * as Mocks from '../mocks';

// Code.
describe('getBoundingBox', () => {
  it('should return the rounded bounding box', () => {
    const result = getBoundingBox(polygon);
    expect(result).toMatchSnapshot();
  });
  it('should return the bounding box for a big polygon', () => {
    const result = getBoundingBox(Mocks.santMarti);
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
        [2.1869659423828125, 41.40269443107466],
        [2.219409942626953, 41.411449504915495],
        [2.2019004821777344, 41.424322470327],
        [2.186450958251953, 41.42406503602331],
        [2.1869659423828125, 41.40269443107466],
      ],
    ],
  },
};
