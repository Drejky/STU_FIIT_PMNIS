// Boilerplate nextjs page
import React from 'react';
import styles from '../grafikon/index.module.css';
import newStyles from './index.module.css';
import CustomButton from '@/components/CustomButton';
import CustomMap from '@/components/CustomMap';
import CustomMapPin from '@/components/CustomMapPin';
import CustomMarker from '@/components/CustomMarker';
import { Typography, Rating } from '@mui/material';
import { Popup } from 'leaflet';
import _ from 'lodash';
import { BusStop } from '../../../lib/types';
import useBusStops from '@/hooks/useBusStops';
import Loading from '@/components/Loading';

const GrafikonMap = () => {
  // Changed component name to GrafikonMap
  const { busStops, isLoading, error } = useBusStops();
  return isLoading || error ? (
    <Loading />
  ) : (
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
                {/* <Popup className={styles.popup} closeButton={false}>
                    <CustomMapPin
                      name={busStop.name ? busStop.name : 'Bus stop'}
                    />
                  </Popup> */}
              </CustomMarker>
            ))}
          </CustomMap>
        </div>
      </div>
    </div>
  );
};

const GrafikonDetailPage: React.FC = () => {
  return (
    <div>
      <div className={newStyles.container}>
        <GrafikonMap />
        <GrafikonMap />
        {/* <div className={styles.rating}>
          <Typography>Rate grafikon</Typography>
          <Rating
            name="simple-controlled"
            value={ratings[foo]}
            onChange={(event, newValue) => {
              if (typeof newValue === 'number') {
                setRatings(
                  ratings.map((item, index) =>
                    index === foo ? newValue : item
                  )
                );
              }
            }}
          />
        </div> */}
        {/* <CustomButton onClick={() => setGrafikonDetailIframe(true)}>
          Detail Grafikonu
        </CustomButton>{' '} */}
      </div>
    </div>
  );
};

export default GrafikonDetailPage;
