// Boilerplate nextjs page
import React, { useEffect, useState } from 'react';
import styles from '../grafikon/index.module.css';
import graphStyles from '../../pages/data/index.module.css';
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
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { useRouter } from 'next/router';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);
// import CustomMapPin from '@/components/CustomMapPin';
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

const GrafikonMap = ({ name }: any) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true in useEffect to ensure it's only run after component has mounted
    setIsClient(true);
  }, []);
  // Changed component name to GrafikonMap
  const { busStops, isLoading, error } = useBusStops();
  if (isLoading || error) return <Loading />;
  else
    return (
      typeof window !== 'undefined' && (
        <div>
          <h1>Grafikon {name}</h1>
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
                      {isClient && (
                        <CustomMapPin
                          name={busStop.name ? busStop.name : 'Bus stop'}
                        />
                      )}
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
  const router = useRouter();
  const { number: fuck } = router.query;

  const { busStops, isLoading, error } = useBusStops();
  const data = {
    labels: ['Vytazenost', 'Nastup', 'Vystup', 'Cas'],
    datasets: [
      {
        label: 'Feature Attribute',
        data: [95, 90, 80, 30],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
  };
  if (isLoading || error) return <Loading />;
  else
    return (
      typeof window !== 'undefined' && (
        <>
          <div className={newStyles.maps}>
            <GrafikonMap name={fuck} />
            <GrafikonMap name="grecka" />
          </div>
          <div className={newStyles.conteiner}>
            <div className={newStyles.container}>
              <h2>Counterfactual examples</h2>
              <p>Grafikon {fuck}, Linka 1:</p>
              <p>
                Ak by vytazenost zastavky Kollárova bola 1, linka by isla cez
                zastavku Bernolákova
              </p>
              <div className={graphStyles.graphContainer}>
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </>
      )
    );
};

export default GrafikonDetailPage;
