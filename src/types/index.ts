// Packages.
import * as turfHelpers from '@turf/helpers';

// Definition.
export type Result<T, E> = {
  readonly ok: T;
  readonly err: E;
};

export type DividedArea = {
  readonly polygons: Array<turfHelpers.Feature<turfHelpers.Polygon>>;
  readonly bboxes: Array<Array<turfHelpers.BBox>>;
};
