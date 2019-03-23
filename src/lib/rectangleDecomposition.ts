// Packages.
import * as _ from 'lodash';
import * as decompose from 'rectangle-decomposition';
import * as turfHelpers from '@turf/helpers';

// Internal.

// Code.
export const rectangleDecomposition = (
  polygon: turfHelpers.Feature<turfHelpers.Polygon>
) => {
  const coordinates = polygon.geometry.coordinates[0].slice(0, -1);

  // Assuming turf returns a counter-clockwise polygon as the first ring
  // So passing false to the decompose clockwise flag
  const rectangles = decompose(coordinates, false);

  return rectangles;
};
