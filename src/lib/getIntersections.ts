// Packages.
import * as turfHelpers from '@turf/helpers';
import * as turfInvariant from '@turf/invariant';
import intersect from '@turf/intersect';

// Code.
export const getIntersections = (
  area: turfHelpers.Feature<turfHelpers.Polygon>,
  mask: turfHelpers.Feature<turfHelpers.Polygon>
): Array<turfHelpers.Feature<turfHelpers.Polygon>> | null => {
  const intersection = intersect(area, mask);

  // No intersection
  if (!intersection) {
    return null;
  }

  const featureType = turfInvariant.getType(intersection);

  if (featureType === 'Polygon') {
    return [intersection] as Array<turfHelpers.Feature<turfHelpers.Polygon>>;
  }

  if (featureType === 'MultiPolygon') {
    const zones: Array<turfHelpers.Feature<turfHelpers.Polygon>> = [];
    const { coordinates } = intersection.geometry as turfHelpers.MultiPolygon;
    for (const coords of coordinates) {
      zones.push(turfHelpers.polygon(coords));
    }
    return zones;
  }

  return null;
};
