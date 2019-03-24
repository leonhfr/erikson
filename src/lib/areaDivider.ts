// Packages.
import * as _ from 'lodash';
import bbox from '@turf/bbox';
import * as debug from 'debug';
import pointInPolygon from '@turf/boolean-point-in-polygon';
import intersect from '@turf/intersect';
import * as turfHelpers from '@turf/helpers';

// Internal.
import { GEOJSON_ZONES_MAXIMUM_PRECISION } from '../constants';
import { rounding } from './rounding';
import * as Types from '../types';

// Code.
const debugError = debug('erikson:error:areaDivider');

export const areaDivider = (
  areaPolygon: Types.Polygon,
  boundingBox: Types.BoundingBox
): Types.DividedArea => {
  const [minX, minY, maxX, maxY] = boundingBox;
  const p = GEOJSON_ZONES_MAXIMUM_PRECISION;

  const boxes: Array<Array<Types.BoundingBox>> = [];
  const zones: Array<Types.ZoneGeometry> = [];

  for (let x = minX; x < maxX; x += p) {
    const colBboxes: Array<Types.BoundingBox> = [];

    for (let y = minY; y < maxY; y += p) {
      const [a, b, c, d] = [[x, y], [x + p, y], [x + p, y + p], [x, y + p]].map(
        a => a.map(rounding)
      );

      const [i, j, k, l] = [a, b, c, d].map(point =>
        pointInPolygon(point, areaPolygon)
      );

      if (!i && !j && !k && !l) {
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
      // We ignore the test case as this will not happen
      /*istanbul ignore next*/
      if (!intersection) {
        debugError(`intersect returned null for %o`, zonePolygon);
        continue;
      }

      zones.push({
        zone: intersection,
        box: zoneBbox,
      });
    }

    if (colBboxes.length) {
      boxes.push(colBboxes);
    }
  }

  return { zones, boxes };
};
