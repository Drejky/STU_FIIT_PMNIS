import { LatLngLiteral } from 'leaflet';
import { BusStop, Route } from '../types';

function getRouteFromStopNames(
  busStops: BusStop[],
  order: string[],
  routeName: string
): Route {
  const coordinates = order
    .map((name) => {
      const stop = busStops.find((stop) => stop.name == name);
      return stop || null;
    })
    .filter(Boolean) as LatLngLiteral[];

  return { coordinates, routeName };
}
