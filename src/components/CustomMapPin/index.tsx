import styles from './page.module.css';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { useMapEvents } from 'react-leaflet';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useRouter } from 'next/router';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type CustomMapPinProps = {
  name: string;
  classname?: any;
};

const CustomMapPin: React.FC<CustomMapPinProps> = ({ name, classname }) => {
  const router = useRouter();
  const map = useMapEvents({
    click: () => {
      map.closePopup();
    },
  });

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  return (
    <div className={classNames(classname, styles.container)}>
      <p className={styles.popupTitle}>{name}</p>
      <div className={styles.graphsContainer}>
        <div className={styles.dataDayContainer}>
          {_.range(10).map(() => {
            const randomDate = faker.date.anytime();
            const day = String(randomDate.getDate()).padStart(2, '0');
            const month = String(randomDate.getMonth() + 1).padStart(2, '0');
            const year = randomDate.getFullYear();

            return (
              <p className={styles.dataDayText}>
                {`${day}.${month}.${year} - ${faker.datatype.number({
                  min: 1,
                  max: 3,
                })}`}
              </p>
            );
          })}
        </div>
        <Bar data={data} options={options} />
        {/* <Bar data={data} options={options} /> */}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>View data</button>
        <button
          className={styles.button}
          onClick={() => {
            map.closePopup();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CustomMapPin;
