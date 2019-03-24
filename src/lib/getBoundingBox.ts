// Packages.
import bbox from '@turf/bbox';

// Internal.
import { ceiling, flooring } from './rounding';
import * as Types from '../types';

// Code.
export const getBoundingBox = (
  areaPolygon: Types.Polygon
): Types.BoundingBox => {
  const turfBoundingBox = bbox(areaPolygon);

  const [minX, minY] = turfBoundingBox.slice(0, 2).map(flooring);

  const [maxX, maxY] = turfBoundingBox.slice(2, 4).map(ceiling);

  return [minX, minY, maxX, maxY];
};
