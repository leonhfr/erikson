// Packages.
import * as _ from 'lodash';
import * as turfHelpers from '@turf/helpers';
import union from '@turf/union';

// Internal.
import { Geometry } from './Geometry';

// Code.
export const makeInsidePolygon = (
  boxes: Array<Array<turfHelpers.BBox>>
):
  | turfHelpers.Feature<turfHelpers.Polygon | turfHelpers.MultiPolygon>
  | undefined => {
  const polygons: Array<
    turfHelpers.Feature<turfHelpers.Polygon | turfHelpers.MultiPolygon>
  > = [];

  for (const colBboxes of boxes) {
    const mergedBoxes = mergeBoxes(colBboxes);

    if (mergedBoxes.length === 1) {
      polygons.push(Geometry.bboxToPolygon(mergedBoxes[0]));
      continue;
    }

    polygons.push(Geometry.bboxesToMultiPolygon(mergedBoxes));
  }

  return _.reduce(polygons, (acc, val) => union(acc, val));
};

export const mergeBoxes = (boxes: Array<turfHelpers.BBox>) => {
  let accumulator: Array<turfHelpers.BBox> = [];
  return _.reduce(boxes, mergeIteratee, accumulator);
};

export const mergeIteratee = (
  boxes: Array<turfHelpers.BBox>,
  value: turfHelpers.BBox
): Array<turfHelpers.BBox> => {
  if (!boxes.length) {
    return [value];
  }

  const [minX, minY, maxX, maxY] = value;
  const lastBbox = boxes[boxes.length - 1];

  if (minY === lastBbox[3]) {
    return [
      ...boxes.slice(0, -1),
      [minX, lastBbox[1], maxX, maxY] as turfHelpers.BBox,
    ];
  }

  return [...boxes, value];
};
