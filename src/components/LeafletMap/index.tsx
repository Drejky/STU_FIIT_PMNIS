// components/YourComponent.tsx
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';
import classNames from 'classnames';
import { faBus, prefix } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';

// Create a new icon instance

export type LeafletMapProps = {
  className?: string;
};

export type BusStop = {
  lat: number;
  lon: number;
  name: string;
};

export type coordinates = {
  lat: number;
  lon: number;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ className }) => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [polylinePoints, setPolylinePoints] = useState<coordinates[]>([]);
  const [routes, setRoutes] = useState<coordinates[][]>([]);
  const route_files = [
    '1_stop.json',
    '2_stop.json',
    '3_stop.json',
    '4_stop.json',
    '5_stop.json',
    '6_stop.json',
    '12_stop.json',
    '13_stop.json',
    '14_stop.json',
    '16_stop.json',
    '21_stop.json',
    '22_stop.json',
    '23_stop.json',
  ];

  const query = `
  [out:json];
  area["name"="Trnava"]["boundary"="administrative"];
  node["highway"="bus_stop"](area);
  out body;
`;

  const customIcon = L.divIcon({
    className: 'customIcon',
    html: `<i class="fas fa-bus"></i>`,
    iconSize: [20, 20],
  });

  useEffect(() => {
    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => response.json())
      .then((data) => {
        const busStopsData = data.elements.map(
          (element: { lat: number; lon: number; tags: { name: string } }) => {
            // console.log(element.tags ? element.tags.name : null);
            return {
              lat: element.lat,
              lon: element.lon,
              name: element.tags ? element.tags.name : null,
            };
          }
        );
        setBusStops(busStopsData);
      });
  }, []);

  useEffect(() => {
    // Fetch each route file
    const promises = route_files.map((route) =>
      fetch(`/routes/${route}`)
        .then((response) => response.json())
        .then((order) => mapNamesToCoordinates(busStops, order))
    );

    // Wait for all fetches to complete
    Promise.all(promises)
      .then((coordinatesList) => {
        // coordinatesList is an array of arrays of coordinates
        setRoutes(coordinatesList);
      })
      .catch((error) => console.error(error));

    console.log(routes);
  }, [busStops]);

  function mapNamesToCoordinates(busStops: BusStop[], order: string[]) {
    return order
      .map((name) => {
        const stop = busStops.find((stop) => stop.name == name);

        return stop ? { lat: stop.lat, lon: stop.lon } : null;
      })
      .filter(Boolean) as coordinates[];
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
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
        {busStops.map((busStop: any) => (
          <Marker position={[busStop.lat, busStop.lon]} icon={customIcon}>
            <Popup>{busStop.name ? busStop.name : 'Bus stop'}</Popup>
          </Marker>
        ))}
        {routes.map((route) => (
          <Polyline positions={route} color={getRandomColor()} />
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
