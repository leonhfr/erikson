// Packages.
import * as _ from 'lodash';
// import * as decompose from 'rectangle-decomposition';
// import concaveHull from '@turf/concave';
import * as turfHelpers from '@turf/helpers';
// import * as turfInvariant from '@turf/invariant';

// Internal.
// import { GEOJSON_ZONES_MAXIMUM_PRECISION } from '../constants';
// import * as Types from '../types';

// Code.
export const rectangleDecomposition = (
  points: turfHelpers.FeatureCollection<turfHelpers.Point>
) => {
  if (points.features.length < 4) {
    return;
  }

  console.log(JSON.stringify(points));

  // const hull = concaveHull(points);
  // console.log(JSON.stringify(hull));
  //
  // if (hull === null) {
  //   return;
  // }
  //
  // const featureType = turfInvariant.getType(hull);
  //
  // if (featureType !== 'Polygon') {
  //   throw new Error(`rectangleDecomposition returned a ${featureType}`);
  // }
  //
  // const { geometry } = hull as turfHelpers.Feature<turfHelpers.Polygon>;
  //
  // // Assuming turf returns a counter-clockwise polygon as the first ring
  // // So passing false to the decompose clockwise flag
  //
  // console.log([geometry.coordinates[0].slice(0, -1)]);
  //
  // const rectangles = decompose([geometry.coordinates[0].slice(0, -1)], true);
  //
  // return rectangles;
};
