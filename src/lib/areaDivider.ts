// Packages.
import * as _ from 'lodash';
import * as turfHelpers from '@turf/helpers';
import pointInPolygon from '@turf/boolean-point-in-polygon';

// Internal.
import { GEOJSON_ZONES_MAXIMUM_PRECISION } from '../constants';
import { getIntersections } from './getIntersections';
import * as Types from '../types';

// Code.
export const areaDivider = (
  areaPolygon: turfHelpers.Feature<turfHelpers.Polygon>,
  bbox: turfHelpers.BBox
): Types.DividedArea => {
  const [minX, minY, maxX, maxY] = bbox;
  const p = GEOJSON_ZONES_MAXIMUM_PRECISION;

  const polygons: Array<turfHelpers.Feature<turfHelpers.Polygon>> = [];
  const pointsInside: Array<Array<number>> = [];

  for (let x = minX; x < maxX + p; x += p) {
    for (let y = minY; y < maxY + p; y += p) {
      const [a, b, c, d] = [[x, y], [x + p, y], [x + p, y + p], [x, y + p]];

      const [i, j, k, l] = [a, b, c, d].map(point =>
        pointInPolygon(point, areaPolygon)
      );

      if (!i || !j || !k || !l) {
        // if 4 points are outside, continue
        continue;
      }

      if (i && j && k && l) {
        // if 4 points are inside, add them to the list
        pointsInside.push(a, b, c, d);
        continue;
      }

      // otherwise, compute intersections and add it to the list
      const mask = turfHelpers.polygon([[a, b, c, d, a]]);
      const intersections = getIntersections(areaPolygon, mask);

      if (intersections === null) {
        continue;
      }

      polygons.push(...intersections);
    }
  }

  const points = _.uniqWith(pointsInside, _.isEqual);

  return { polygons, points };
};
