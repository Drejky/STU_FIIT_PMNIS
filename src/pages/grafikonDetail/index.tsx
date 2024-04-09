// Boilerplate nextjs page
import React from 'react';
import styles from '../grafikon/index.module.css';
import newStyles from './index.module.css';
import CustomButton from '@/components/CustomButton';
import CustomMap from '@/components/CustomMap';
import { Typography, Rating } from '@mui/material';
import { Polyline, MapContainer } from 'react-leaflet';
import _ from 'lodash';
import { BusStop } from '../../../lib/types';
import useBusStops from '@/hooks/useBusStops';
import Loading from '@/components/Loading';
import { BUS_ICON } from '../../../lib/constants';
import dynamic from 'next/dynamic';

const CustomMarker = dynamic(() => import('@/components/CustomMarker'), {
  ssr: false,
});

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

const CustomMapPin = dynamic(() => import('@/components/CustomMapPin'), {
  ssr: false,
});

const GrafikonMap = () => {
  // Changed component name to GrafikonMap
  const { busStops, isLoading, error } = useBusStops();
  if (isLoading || error) return <Loading />;
  else
    return (
      typeof window !== 'undefined' && (
        <div>
          <h1>Grafikon {1}</h1>
          <div className={styles.grafikonContent}>
            <div className={styles.busStopList}>
              {_.range(10).map((i) => {
                return (
                  <div className={styles.busStop}>
                    <p className={styles.busStopName}>Linka {i + 1} </p>
                  </div>
                );
              })}
            </div>
            <div className={styles.mapContainer}>
              <CustomMap className={styles.map}>
                {busStops.map((busStop: BusStop) => (
                  <CustomMarker position={[busStop.lat, busStop.lng]}>
                    <Popup className={styles.popup} closeButton={false}>
                      <CustomMapPin
                        name={busStop.name ? busStop.name : 'Bus stop'}
                      />
                    </Popup>
                  </CustomMarker>
                ))}
              </CustomMap>
            </div>
          </div>
        </div>
      )
    );
};

const GrafikonDetailPage: React.FC = () => {
  const { busStops, isLoading, error } = useBusStops();
  if (isLoading || error) return <Loading />;
  else
    return (
      typeof window !== 'undefined' && (
        <div>
          <div className={newStyles.container}>
            <GrafikonMap />
            <GrafikonMap />
          </div>
        </div>
      )
    );
};

export default GrafikonDetailPage;
