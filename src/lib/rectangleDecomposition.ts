// Packages.
import * as _ from 'lodash';
import * as decompose from 'rectangle-decomposition';
import * as turfHelpers from '@turf/helpers';

// Internal.

// Code.
export const rectangleDecomposition = (
  polygon: turfHelpers.Feature<turfHelpers.Polygon>
): Array<turfHelpers.BBox> => {
  const coordinates = polygon.geometry.coordinates[0]
    .slice(0, -1)
    .map(a => a.map(n => Math.round(100 * n)));

  // Assuming turf returns a counter-clockwise polygon as the first ring
  // So passing false to the decompose clockwise flag
  const rectangles = decompose([coordinates], false) as Array<
    Array<Array<number>>
  >;

  const boxes: Array<turfHelpers.BBox> = rectangles.map(rectangle => {
    const [[minX, minY], [maxX, maxY]] = rectangle;
    return [minX, minY, maxX, maxY].map(n =>
      Number((n / 100).toFixed(2))
    ) as turfHelpers.BBox;
  });

  return boxes;
};
