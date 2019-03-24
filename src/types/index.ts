// Packages.
import * as turfHelpers from '@turf/helpers';

// Definition.
export type Result<T, E> = {
  readonly ok: T;
  readonly err: E;
};

export type BoundingBox = turfHelpers.BBox;

export type Polygon = turfHelpers.Feature<turfHelpers.Polygon>;

export type MultiPolygon = turfHelpers.Feature<
  turfHelpers.Polygon | turfHelpers.MultiPolygon
>;

export type DividedArea = {
  readonly boxes: Array<Array<BoundingBox>>;
  readonly zones: Array<ZoneGeometry>;
};

export type ZoneGeometry = {
  readonly zone: MultiPolygon;
  readonly box: BoundingBox;
};
