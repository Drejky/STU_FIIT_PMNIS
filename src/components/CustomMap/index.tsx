// components/YourComponent.tsx
import dynamic from 'next/dynamic';
import React from 'react';
import styles from './page.module.css';
import classNames from 'classnames';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export type CustomMapProps = {
  className?: string;
  children: React.ReactNode;
};

const CustomMap: React.FC<CustomMapProps> = ({ className, children }) => {
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
        {children}
      </MapContainer>
    </div>
  );
};

export default CustomMap;
