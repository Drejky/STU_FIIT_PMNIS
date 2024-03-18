import { LatLngLiteral } from 'leaflet';

export type BusStop = LatLngLiteral & {
  name: string;
};
export type Route = {
  coordinates: RouteSection[];
  routeName: string;
};

export type RouteSection = LatLngLiteral & {
  howBusy?: number;
};
