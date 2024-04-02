import dynamic from 'next/dynamic';
import styles from './index.module.css';
import _ from 'lodash';
import CustomMap from '@/components/CustomMap';
import useBusStops from '@/hooks/useBusStops';
// import CustomMapPin from '@/components/CustomMapPin';
// import { BUS_ICON } from '../../../lib/constants';
import useBusIcon from '@/hooks/useBusIcon';
import { BusStop } from '../../../lib/types';
import { GridLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import createBusIcon from '@/hooks/useBusIcon';
import L from 'leaflet';
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

const grafikonPage = () => {
  const { busStops, isLoading, error } = useBusStops();

  if (isLoading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          height: '100vh',
        }}
      >
        <GridLoader color="rgb(17,0,77)" size={30} />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    window && (
      <div className={styles.container}>
        {_.range(4).map((foo) => (
          <div className={styles.grafikonContainer}>
            <h1>Grafikon {foo + 1}</h1>
            <div className={styles.grafikonContent}>
              <div className={styles.busStopList}>
                {_.range(10).map((i) => {
                  return (
                    <div className={styles.busStop}>
                      <p className={styles.busStopName}>Bus1 </p>
                      <button className={styles.busStopDetail}> Detail</button>
                    </div>
                  );
                })}
              </div>
              <div className={styles.mapContainer}>
                <CustomMap className={styles.map}>
                  {/* <CustomMarker position={[busStops[5].lat, busStops[5].lng]}>
                  <Popup>
                    <CustomMapPin name={busStops[5].name} />
                  </Popup>
                </CustomMarker> */}
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
        ))}
      </div>
    )
  );
};

export default grafikonPage;
