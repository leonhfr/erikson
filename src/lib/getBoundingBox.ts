// Packages.
import * as debug from 'debug';
import bbox from '@turf/bbox';
import * as turfHelpers from '@turf/helpers';

// Internal.
import { GEOJSON_ZONES_MAXIMUM_PRECISION } from '../constants';

// Code.
const debugVerbose = debug('erikson:verbose:getBoundingBox');

export const getBoundingBox = (
  areaPolygon: turfHelpers.Feature<turfHelpers.Polygon>
): turfHelpers.BBox => {
  const digits = (GEOJSON_ZONES_MAXIMUM_PRECISION.toString()
    .split('.')
    .pop() as string).length;

  const turfBoundingBox = bbox(areaPolygon);

  const [minX, minY, maxX, maxY] = turfBoundingBox.map(x =>
    flooring(x, GEOJSON_ZONES_MAXIMUM_PRECISION, digits)
  );

  debugVerbose(`boundingBox: %j`, [
    minX,
    minY,
    maxX + GEOJSON_ZONES_MAXIMUM_PRECISION,
    maxY + GEOJSON_ZONES_MAXIMUM_PRECISION,
  ]);

  return [
    minX,
    minY,
    maxX + GEOJSON_ZONES_MAXIMUM_PRECISION,
    maxY + GEOJSON_ZONES_MAXIMUM_PRECISION,
  ];
};

const flooring = (x: number, p: number, d: number) =>
  Number((Math.floor(x / p) * p).toFixed(d));
