// Packages.
import * as _ from 'lodash';
import bbox from '@turf/bbox';
import * as turfHelpers from '@turf/helpers';
import pointInPolygon from '@turf/boolean-point-in-polygon';

// Internal.
import { GEOJSON_ZONES_MAXIMUM_PRECISION } from '../constants';
import { getIntersections } from './getIntersections';
import * as Types from '../types';

// Code.
export const areaDivider = (
  areaPolygon: turfHelpers.Feature<turfHelpers.Polygon>,
  boundingBox: turfHelpers.BBox
): Types.DividedArea => {
  const [minX, minY, maxX, maxY] = boundingBox;
  const p = GEOJSON_ZONES_MAXIMUM_PRECISION;

  const polygons: Array<turfHelpers.Feature<turfHelpers.Polygon>> = [];
  const bboxes: Array<Array<turfHelpers.BBox>> = [];

  for (let x = minX; x < maxX; x += p) {
    const rowBboxes: Array<turfHelpers.BBox> = [];

    for (let y = minY; y < maxY; y += p) {
      const [a, b, c, d] = [[x, y], [x + p, y], [x + p, y + p], [x, y + p]];

      const [i, j, k, l] = [a, b, c, d].map(point =>
        pointInPolygon(point, areaPolygon)
      );

      if (!i || !j || !k || !l) {
        // if 4 points are outside, continue
        continue;
      }

      // we make a polygon with the points
      const polygon = turfHelpers.polygon([[a, b, c, d, a]]);

      if (i && j && k && l) {
        // if 4 points are inside, add the bbox of the polygon to the list
        rowBboxes.push(bbox(polygon));
        continue;
      }

      // otherwise, compute intersections and add it to the list
      const intersections = getIntersections(areaPolygon, polygon);

      if (intersections === null) {
        continue;
      }

      polygons.push(...intersections);
    }

    bboxes.push(rowBboxes);
  }

  return { polygons, bboxes };
};
