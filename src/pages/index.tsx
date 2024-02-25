// pages/index.js

// import LeafletMap from '@/components/LeafletMap';
import dynamic from 'next/dynamic';
const DynamicLeafletMap = dynamic(
  () => import('@/components/LeafletMap'),
  { ssr: false } // This will disable server-side rendering for the LeafletMap component
);
import styles from './index.module.css';
import Head from 'next/head';
// import styles from './index.module.css';

export default function Home() {
  return (
    <div>
      <DynamicLeafletMap className={styles.map} />
      <p className={styles.foo}>foo</p>
    </div>
  );
}
