import { LatLngLiteral } from 'leaflet';

export type BusStop = LatLngLiteral & {
  name: string;
};
export type Route = {
  coordinates: RouteSection[];
  routeName: string;
  show?: boolean;
};

export type RouteSection = LatLngLiteral & {
  howBusy?: number;
};
