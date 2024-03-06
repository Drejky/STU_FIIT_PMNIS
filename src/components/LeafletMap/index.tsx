// components/YourComponent.tsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';
import classNames from 'classnames';
import { faBus, prefix } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';

// Create a new icon instance

export type LeafletMapProps = {
  className?: string;
};

const LeafletMap: React.FC<LeafletMapProps> = ({ className }) => {
  const [busStops, setBusStops] = useState([]);

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
        setBusStops(
          data.elements.map(
            (element: { lat: any; lon: any; tags: { name: string } }) => ({
              lat: element.lat,
              lon: element.lon,
              name: element.tags ? element.tags.name : null,
            })
          )
        );
      });
  }, []);

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
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
