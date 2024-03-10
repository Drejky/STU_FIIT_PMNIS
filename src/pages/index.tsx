// pages/index.js

// import LeafletMap from '@/components/LeafletMap';
import dynamic from 'next/dynamic';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
const DynamicLeafletMap = dynamic(
  () => import('@/components/LeafletMap'),
  { ssr: false } // This will disable server-side rendering for the LeafletMap component
);
import styles from './index.module.css';
import Head from 'next/head';
import CustomNavbar from '@/components/Navbar';
// import styles from './index.module.css';

export default function Home() {
  return (
    <div>
      {/* <div style={{display:'flex'}}>
        <button className={styles.navButton}>foo</button>
        <button className={styles.navButton}>foo</button>
        <button className={styles.navButton}>foo</button>
      </div> */}

      <DynamicLeafletMap className={styles.map} />
    </div>
  );
}
