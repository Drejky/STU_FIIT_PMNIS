import dynamic from 'next/dynamic';
import styles from './index.module.css';
import _, { set } from 'lodash';
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
import { Rating, Typography } from '@mui/material';
import CustomButton from '@/components/CustomButton';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';

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
  const [fakeLoad, setFakeLoad] = useState(false);
  const [fakeLoadPending, setFakeLoadPending] = useState(false);
  const { busStops, isLoading, error } = useBusStops();
  const [ratings, setRatings] = useState<number[]>([]);
  const [busDetailIframe, setBusDetailIframe] = useState(false);
  const [grafikonDetailIframe, setGrafikonDetailIframe] = useState(false);

  const router = useRouter();
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
                </CustomMap>
              </div>
            </div>
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
            <CustomButton onClick={() => setGrafikonDetailIframe(true)}>
              Detail Grafikonu
            </CustomButton>{' '}
          </div>
        ))}
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
            <iframe src="/grafikonDetail" title="Bus Detail"></iframe>
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
