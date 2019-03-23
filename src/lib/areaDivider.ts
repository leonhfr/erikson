// Packages.
import * as _ from 'lodash';
import bbox from '@turf/bbox';
import pointInPolygon from '@turf/boolean-point-in-polygon';
import intersect from '@turf/intersect';
import * as turfHelpers from '@turf/helpers';

// Internal.
import { GEOJSON_ZONES_MAXIMUM_PRECISION } from '../constants';
import * as Types from '../types';

// Code.
export const areaDivider = (
  areaPolygon: turfHelpers.Feature<turfHelpers.Polygon>,
  boundingBox: turfHelpers.BBox
): Types.DividedArea => {
  const [minX, minY, maxX, maxY] = boundingBox;
  const p = GEOJSON_ZONES_MAXIMUM_PRECISION;

  const boxes: Array<Array<turfHelpers.BBox>> = [];
  const zones: Array<{
    zone: turfHelpers.Feature<turfHelpers.Polygon | turfHelpers.MultiPolygon>;
    box: turfHelpers.BBox;
  }> = [];

  for (let x = minX; x < maxX; x += p) {
    const colBboxes: Array<turfHelpers.BBox> = [];

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
      const zonePolygon = turfHelpers.polygon([[a, b, c, d, a]]);
      const zoneBbox = bbox(zonePolygon);

      if (i && j && k && l) {
        // if 4 points are inside, add the bbox of the polygon to the list of boxes
        colBboxes.push(zoneBbox);
        continue;
      }

      // otherwise, compute intersection and add it to the list of zones
      const intersection = intersect(areaPolygon, zonePolygon);

      // No intersection
      if (!intersection) {
        continue;
      }

      zones.push({
        zone: intersection,
        box: zoneBbox,
      });
    }

    boxes.push(colBboxes);
  }

  return { zones, boxes };
};
