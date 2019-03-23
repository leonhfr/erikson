// Packages.
import * as turfHelpers from '@turf/helpers';

// Definition.
export type Result<T, E> = {
  readonly ok: T;
  readonly err: E;
};

export type DividedArea = {
  readonly boxes: Array<Array<turfHelpers.BBox>>;
  readonly zones: Array<{
    readonly zone: turfHelpers.Feature<
      turfHelpers.Polygon | turfHelpers.MultiPolygon
    >;
    readonly box: turfHelpers.BBox;
  }>;
};
