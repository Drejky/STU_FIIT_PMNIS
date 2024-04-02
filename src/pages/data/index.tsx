import React from 'react';
import Head from 'next/head';
import styles from './index.module.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import _ from 'lodash';
import { faker } from '@faker-js/faker';
import useBusStops from '@/hooks/useBusStops';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataTable = () => {
  const { busStops, isLoading, error } = useBusStops();
  console.log(busStops);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Linka</th>
            <th className={styles.th}>Zastávka</th>
            <th className={styles.th}>Nástup</th>
            <th className={styles.th}>Výstup</th>
            <th className={styles.th}>Vyťaženosť</th>
          </tr>
        </thead>
      </table>
      <div className={styles.tbodyContainer}>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            {_.range(50).map((i) => (
              <tr key={i} className={styles.tr}>
                <td className={styles.td}>
                  {Math.round(Math.random() * 6 + 1)}
                </td>
                <td className={styles.td}>
                  {busStops[Math.round(Math.random() * (busStops.length - 1))]
                    .name || 'Unknown'}
                </td>
                <td className={styles.td}>
                  {Math.round(Math.random() * 450 + 1)}
                </td>
                <td className={styles.td}>
                  {Math.round(Math.random() * 450 + 1)}
                </td>
                <td className={styles.td}>
                  {Math.round(Math.random() * 2 + 1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HomePage = () => {
  const busStops = useBusStops();
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
    // responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Trnavikon dáta klasifikuje do troch kategórií vyťaženosti podľa
        nástupov, výstupov, kategorizácie cestujúcich, počtu cestujúcich na
        vozidle. Stačí vložiť dátový súbor. V prípade nesprávnej klasifikácie je
        možné ju opraviť, táto informácia bude použitá pre vylepšenie AI
      </p>
      <div className={styles.dataControls}>
        <button className={styles.button}>Import new data</button>
        <button className={styles.button}>Klasifikuj vyťaženosť</button>
        <button className={styles.button}>Edituj vyťaženosť</button>
        <button className={styles.button}>Hodnotenie</button>
      </div>

      <DataTable />
      <div className={styles.graphContainer}>
        <div className={styles.graph}>
          <Bar data={data} options={options as any} />
        </div>
        <div className={styles.graph}>
          <Bar data={data} options={options as any} />
        </div>{' '}
      </div>
    </div>
  );
};

export default HomePage;
