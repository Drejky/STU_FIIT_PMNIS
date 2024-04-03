import useBusStops from '@/hooks/useBusStops';
import styles from './index.module.css';
import Loading from '@/components/Loading';
const busDetail = () => {
  const { busStops, isLoading, error } = useBusStops();
  if (isLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>
          Grafikon {Math.round(Math.random()) * 3 + 1}, Linka{' '}
          {Math.round(Math.random()) * 8 + 1}:
        </h1>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 2
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 2
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
      </div>
      <div>
        <h1 className={styles.title}>Podobne generované linky sú:</h1>
        <h2 className={styles.subTitle}>
          {' '}
          Grafikon {Math.round(Math.random()) * 3 + 1}, Linka{' '}
          {Math.round(Math.random()) * 8 + 1}:
        </h2>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 2
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
        <h2 className={styles.subTitle}>
          {' '}
          Grafikon {Math.round(Math.random()) * 3 + 1}, Linka{' '}
          {Math.round(Math.random()) * 8 + 1}:
        </h2>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 2
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 2
        </p>
        <p className={styles.text}>
          {busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown'}
          : Vytazenost 3
        </p>
      </div>
    </div>
  );
};

export default busDetail;
