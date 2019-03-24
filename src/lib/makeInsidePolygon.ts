// Packages.
import * as _ from 'lodash';
import union from '@turf/union';

// Internal.
import { Geometry } from './Geometry';
import * as Types from '../types';

// Code.
export const makeInsidePolygon = (
  boxes: Array<Array<Types.BoundingBox>>
): Types.MultiPolygon | undefined => {
  const polygons: Array<Types.MultiPolygon> = [];

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

export const mergeBoxes = (boxes: Array<Types.BoundingBox>) => {
  let accumulator: Array<Types.BoundingBox> = [];
  return _.reduce(boxes, mergeIteratee, accumulator);
};

export const mergeIteratee = (
  boxes: Array<Types.BoundingBox>,
  value: Types.BoundingBox
): Array<Types.BoundingBox> => {
  if (!boxes.length) {
    return [value];
  }

  const [minX, minY, maxX, maxY] = value;
  const lastBbox = boxes[boxes.length - 1];

  if (minY === lastBbox[3]) {
    return [
      ...boxes.slice(0, -1),
      [minX, lastBbox[1], maxX, maxY] as Types.BoundingBox,
    ];
  }

  return [...boxes, value];
};
