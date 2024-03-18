import dynamic from 'next/dynamic';

import styles from './index.module.css';
import Example from '@/components/SideBar';
import { useEffect, useState } from 'react';
import { useSidebar } from '@/components/SidebarContext';
import SideBar from '@/components/SideBar';
import classNames from 'classnames';

const DynamicLeafletMap = dynamic(
  () => import('@/components/LeafletMap'),
  { ssr: false } // This will disable server-side rendering for the LeafletMap component
);

const map = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const switchSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.container}>
      <DynamicLeafletMap className={styles.map} />
      <SideBar
        sidebarOpen={sidebarOpen}
        switchSidebar={switchSidebar}
        classname={classNames(
          sidebarOpen ? styles.sidebar_open : styles.sidebar_closed,
          styles.sidebar
        )}
      />
    </div>
  );
};

export default map;
