import dynamic from 'next/dynamic';

import styles from './index.module.css';
import Example from '@/components/SideBar';
import { useEffect, useState } from 'react';
import { useSidebar } from '@/components/SidebarContext';
import SideBar from '@/components/SideBar';
import classNames from 'classnames';
import { Route } from '../../../lib/types';

const DynamicLeafletMap = dynamic(
  () => import('@/components/LeafletMap'),
  { ssr: false } // This will disable server-side rendering for the LeafletMap component
);

const map = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const switchSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [routeFiles, setRouteFiles] = useState<Route[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { ROUTE_FILES } = require('../../../lib/constants');
      setRouteFiles(ROUTE_FILES);
    }
  }, []);

  return (
    <div className={styles.container}>
      <DynamicLeafletMap className={styles.map} routeFilters={routeFiles} />
      <SideBar
        sidebarOpen={sidebarOpen}
        switchSidebar={switchSidebar}
        classname={classNames(
          sidebarOpen ? styles.sidebar_open : styles.sidebar_closed,
          styles.sidebar
        )}
        routeFiles={routeFiles}
        setRouteFiles={setRouteFiles}
      />
    </div>
  );
};

export default map;
