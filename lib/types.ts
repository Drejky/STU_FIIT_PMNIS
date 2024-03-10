import { LatLngLiteral } from 'leaflet';

export type BusStop = LatLngLiteral & {
  name: string;
};
export type Route = {
  coordinates: LatLngLiteral[];
  routeName: string;
};
