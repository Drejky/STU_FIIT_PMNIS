import dynamic from 'next/dynamic';
import styles from './index.module.css';
import _ from 'lodash';
// import lodash

const DynamicLeafletMap = dynamic(
  () => import('@/components/LeafletMap'),
  { ssr: false } // This will disable server-side rendering for the LeafletMap component
);

const grafikonPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grafikonContainer}>
        <h1>Grafikon N</h1>
        <div className={styles.grafikonContent}>
          <div className={styles.busStopList}>
            {_.range(10).map((i: number) => {
              return (
                <div className={styles.busStop}>
                  <p className={styles.busStopName}>Bus1 </p>
                  <button className={styles.busStopDetail}> Detail</button>
                </div>
              );
            })}
          </div>
          <div className={styles.mapContainer}>
            <DynamicLeafletMap routeFilters={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default grafikonPage;
