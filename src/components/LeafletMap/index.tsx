import React, { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import { Marker, Popup, Polyline, MapContainer } from 'react-leaflet';
import styles from './page.module.css';
import { BUS_ICON, ROUTE_FILES, colours } from '../../../lib/constants';
import { BusStop, Route } from '@/../lib/types';
import getRouteFromStopNames from '@/../lib/hooks/getRouteFromStopNames';
import CustomMapPin from '../CustomMapPin';
import useBusStops from '@/hooks/useBusStops';
import CustomMap from '@/components/CustomMap';
import Loading from '../Loading';
import MapRoute from '../MapRoute';

export type LeafletMapProps = {
  className?: string;
  routeFilters: Route[];
};

const LeafletMap: React.FC<LeafletMapProps> = ({ className, routeFilters }) => {
  const {
    busStops,
    isLoading: busStopsLoading,
    error: busStopsError,
  } = useBusStops();
  const [routes, setRoutes] = useState<(Route | null)[]>([]);

  useEffect(() => {
    // Fetch scraped route data and map it to fetched bus stops
    const promises = ROUTE_FILES.map(
      (route: { fileName: string; routeName: string }) =>
        fetch(`/routes/${route.fileName}`)
          .then((response) => response.json())
          .then((order) =>
            getRouteFromStopNames(busStops, order, route.routeName)
          )
    );

    // Wait for all fetches to complete
    Promise.all(promises)
      .then((coordinatesList: (Route | null)[]) => {
        const filteredCoordinatesList = coordinatesList.filter(Boolean);
        setRoutes(filteredCoordinatesList);
      })
      .catch((error) => console.error(error));
  }, [busStops]);

  if (busStopsLoading) {
    return <Loading />;
  } else if (busStopsError) {
    return (
      <div className={styles.container}>
        <p>There was an error loading the bus stops</p>
      </div>
    );
  } else {
    return (
      // window !== undefined &&
      <CustomMap className={className}>
        {busStops.map((busStop: BusStop) => (
          <Marker position={[busStop.lat, busStop.lng]} icon={BUS_ICON}>
            <Popup className={styles.popup} closeButton={false}>
              <CustomMapPin name={busStop.name ? busStop.name : 'Bus stop'} />
            </Popup>
          </Marker>
        ))}
        {routes
          .filter((route) => {
            const routeFilter = routeFilters.find(
              (filter) => filter.routeName === route?.routeName
            );
            return routeFilter?.show;
          })
          .map((route, index) => {
            return <MapRoute route={route} />;
          })}
      </CustomMap>
    );
  }
};

export default LeafletMap;
