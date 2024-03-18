import styles from './page.module.css';
import { useEffect, useState } from 'react';
// pages/index.tsx

import React from 'react';
import { ROUTE_FILES } from '../../../lib/constants';
import { Route } from '../../../lib/types';
import classNames from 'classnames';

export type SideBarProps = {
  sidebarOpen: boolean;
  switchSidebar: Function;
  classname?: any;
};

const SideBar: React.FC<SideBarProps> = ({
  sidebarOpen,
  switchSidebar,
  classname,
}) => {
  const [routeFiles, setRouteFiles] = useState<Route[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { ROUTE_FILES } = require('../../../lib/constants');
      setRouteFiles(ROUTE_FILES);
    }
  }, []);
  return (
    <div className={classNames(classname, styles.sidebar)}>
      <p>TODO</p>
    </div>
  );
};

export default SideBar;
