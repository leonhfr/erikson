// Packages.
import * as turfHelpers from '@turf/helpers';

// Internal.

// Code.
export class Geometry {
  static bboxToPolygon(
    bbox: turfHelpers.BBox
  ): turfHelpers.Feature<turfHelpers.Polygon> {
    const [minX, minY, maxX, maxY] = bbox;
    return turfHelpers.polygon([
      [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY], [minX, minY]],
    ]);
  }

  static bboxesToMultiPolygon(
    bboxes: Array<turfHelpers.BBox>
  ): turfHelpers.Feature<turfHelpers.MultiPolygon> {
    const coordinates = bboxes.map(
      bbox => this.bboxToPolygon(bbox).geometry.coordinates
    );
    return turfHelpers.multiPolygon(coordinates);
  }
}
