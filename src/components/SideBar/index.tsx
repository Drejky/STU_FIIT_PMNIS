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
  routeFiles: Route[];
  setRouteFiles: Function;
};

const SideBar: React.FC<SideBarProps> = ({
  sidebarOpen,
  switchSidebar,
  classname,
  routeFiles,
  setRouteFiles,
}) => {
  return (
    <div className={classNames(classname, styles.sidebar)}>
      {routeFiles.map((route, index) => (
        <div className={styles.filter} key={index}>
          {route.routeName}
          <div className={styles.checkbox_wrapper_3}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              className={styles.checkbox}
              checked={route.show}
              onChange={() => {
                const newRouteFiles = routeFiles.map((rf) =>
                  rf.routeName === route.routeName
                    ? { ...rf, show: !rf.show }
                    : rf
                );
                setRouteFiles(newRouteFiles);
              }}
            />
            <label htmlFor={`checkbox-${index}`} className={styles.toggle}>
              <span className={styles.styleSpan}></span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
