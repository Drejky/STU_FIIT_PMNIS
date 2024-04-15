import React, { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import styles from './index.module.css';
import { BUS_ICON, ROUTE_FILES, colours } from '../../../lib/constants';
import { BusStop, Route } from '@/../lib/types';
import getRouteFromStopNames from '@/../lib/hooks/getRouteFromStopNames';

import useBusStops from '@/hooks/useBusStops';
import CustomMap from '@/components/CustomMap';
import dynamic from 'next/dynamic';
import CustomButton from '@/components/CustomButton';
import Loading from '@/components/Loading';
import _ from 'lodash';
// import MapRoute from '@/components/MapRoute';
import { Rating, Typography } from '@mui/material';
import test from 'node:test';
const CustomMarker = dynamic(() => import('@/components/CustomMarker'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const CustomMapPin = dynamic(() => import('@/components/CustomMapPin'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const MapRoute = dynamic(() => import('@/components/MapRoute'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const grafikonPage = () => {
  const [fakeLoad, setFakeLoad] = useState(true);
  const [fakeLoadPending, setFakeLoadPending] = useState(false);
  const [ratings, setRatings] = useState<number[]>([]);
  const [busDetailIframe, setBusDetailIframe] = useState(false);
  const [grafikonDetailIframe, setGrafikonDetailIframe] = useState(false);
  const [testRoute, setTestRoute] = useState<Route[] | null>(null);
  const [currentGrafikon, setCurrentGrafikon] = useState<number>(1);
  const [ratingsSubmitted, setRatingsSubmitted] = useState(false);

  const { busStops, isLoading, error } = useBusStops();

  useEffect(() => {
    if (!isLoading) {
      const randomRoutes = _.range(5).map((foo) => {
        const randomStopNames = [
          busStops[Math.floor(Math.random() * busStops.length) + 1]?.name,
          busStops[Math.floor(Math.random() * busStops.length) + 1]?.name,
          busStops[Math.floor(Math.random() * busStops.length) + 1]?.name,
          busStops[Math.floor(Math.random() * busStops.length) + 1]?.name,
          busStops[Math.floor(Math.random() * busStops.length) + 1]?.name,
          busStops[Math.floor(Math.random() * busStops.length) + 1]?.name,
          busStops[Math.floor(Math.random() * busStops.length) + 1]?.name,
        ];

        return getRouteFromStopNames(busStops, randomStopNames, '1');
      });

      setTestRoute(randomRoutes);
    }
  }, [isLoading, busStops]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (fakeLoad) {
    if (fakeLoadPending) return <Loading />;
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.description}>
          Návrh nových grafikonov sa realizuje podla klasifikacie vyťaženosti.
          Navrhnuté grafikony ponúkajú 4 najlepšie alternatívy, kde každá je
          ohodnotená percentami. Trnavikon sa adaptuje a učí sa navrhovať lepšie
          grafikony podľa používateľovho hodnotenia.
        </p>
        <CustomButton
          onClick={() => {
            setFakeLoadPending(true);
            setTimeout(() => {
              setFakeLoad(false);
            }, 1);
          }}
        >
          Generuj
        </CustomButton>
      </div>
    );
    // setFakeLoad(false);
  }
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
                      <p className={styles.busStopName}>Linka {i + 1} </p>
                      <button
                        className={styles.busStopDetail}
                        onClick={() => {
                          setBusDetailIframe(!busDetailIframe);
                        }}
                      >
                        Detail
                      </button>
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
                  {testRoute?.map((route, index) => {
                    return <MapRoute route={route} />;
                  })}
                </CustomMap>
              </div>
            </div>
            {!ratingsSubmitted && (
              <div className={styles.rating}>
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
              </div>
            )}
            <CustomButton
              onClick={() => {
                setCurrentGrafikon(foo + 1);
                setGrafikonDetailIframe(true);
              }}
            >
              Detail Grafikonu
            </CustomButton>{' '}
          </div>
        ))}
        {!ratingsSubmitted ? (
          <CustomButton onClick={() => setRatingsSubmitted(true)}>
            Odošli hodnotenia
          </CustomButton>
        ) : (
          <p>Ďakujeme</p>
        )}
        {busDetailIframe && (
          <div className={styles.iframeModal}>
            <iframe src="/busDetail" title="Bus Detail"></iframe>
            <CustomButton
              onClick={() => setBusDetailIframe(false)}
              className={styles.whiteButton}
            >
              Close
            </CustomButton>
          </div>
        )}
        {grafikonDetailIframe && (
          <div className={styles.iframeModal}>
            <iframe
              src={`/grafikonDetail/${currentGrafikon}`}
              title="Bus Detail"
            ></iframe>
            <CustomButton
              onClick={() => setGrafikonDetailIframe(false)}
              className={styles.whiteButton}
            >
              Close
            </CustomButton>
          </div>
        )}
      </div>
    )
  );
};

export default grafikonPage;
