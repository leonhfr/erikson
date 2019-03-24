// Internal.
import { GEOJSON_ZONES_MAXIMUM_PRECISION } from '../constants';

// Code.
const p = GEOJSON_ZONES_MAXIMUM_PRECISION;

export const digits = (GEOJSON_ZONES_MAXIMUM_PRECISION.toString()
  .split('.')
  .pop() as string).length;

export const rounding = (x: number) =>
  Number((Math.round(x / p) * p).toFixed(digits));

export const ceiling = (x: number) =>
  Number((Math.ceil(x / p) * p).toFixed(digits));

export const flooring = (x: number) =>
  Number((Math.floor(x / p) * p).toFixed(digits));
