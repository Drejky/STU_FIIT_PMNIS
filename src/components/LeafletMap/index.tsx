// components/YourComponent.tsx
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import styles from './page.module.css';
import classNames from 'classnames';
import { BUS_ICON, ROUTE_FILES, colours } from '../../../lib/constants';
import { BusStop, Route } from '@/../lib/types';
import { BUS_STOPS_QUERY } from '@/../lib/queries';
import getRouteFromStopNames from '@/../lib/hooks/getRouteFromStopNames';
import CustomMapPin from '../CustomMapPin';

export type LeafletMapProps = {
  className?: string;
  routeFilters: Route[];
};

const LeafletMap: React.FC<LeafletMapProps> = ({ className, routeFilters }) => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [routes, setRoutes] = useState<(Route | null)[]>([]);

  // Fetch bus stop coordinates and names
  useEffect(() => {
    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(BUS_STOPS_QUERY)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => response.json())
      .then((data) => {
        const busStopsData = data.elements.map(
          (element: { lat: number; lon: number; tags: { name: string } }) => ({
            lat: element.lat,
            lng: element.lon,
            name: element.tags ? element.tags.name : null,
          })
        );
        setBusStops(busStopsData);
      });
  }, []);

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

    console.log(routes);
  }, [busStops]);

  return (
    window !== undefined && (
      <div className={styles.container}>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        ></script>

        <MapContainer
          center={[48.3709, 17.5833]}
          zoom={13}
          className={classNames(styles.map, className)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
              return route?.coordinates.map((section, sectionIndex) => (
                <>
                  <Polyline
                    key={`border-${index}`}
                    positions={route.coordinates.slice(
                      sectionIndex,
                      sectionIndex + 2
                    )}
                    color="black" // This is the border color
                    weight={8} // This should be larger than the weight of the main line
                  />
                  <Polyline
                    key={`line-${index}`}
                    positions={route.coordinates.slice(
                      sectionIndex,
                      sectionIndex + 2
                    )}
                    color={colours[index]}
                    weight={6} // This should be smaller than the weight of the border line
                  />
                </>
              ));
            })}
        </MapContainer>
      </div>
    )
  );
};

export default LeafletMap;
