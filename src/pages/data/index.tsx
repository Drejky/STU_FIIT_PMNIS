import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './index.module.css';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import _ from 'lodash';
import { faker } from '@faker-js/faker';
import useBusStops from '@/hooks/useBusStops';
import Loading from '@/components/Loading';
import Image from 'next/image';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const DataTable = ({ data }: any) => {
  const { busStops, isLoading, error } = useBusStops();
  if (isLoading) return <Loading />;
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
            {data.map((data: any, i: number) => (
              <tr key={i} className={styles.tr}>
                <td className={styles.td}>{data.route}</td>
                <td className={styles.td}>{data.stop}</td>
                <td className={styles.td}>{data.enter}</td>
                <td className={styles.td}>{data.exit}</td>
                <td className={styles.td}>{data.load}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { busStops, isLoading, error } = useBusStops();
  const [fakeData, setFakeData] = useState<
    {
      route: number;
      stop: string;
      enter: number;
      exit: number;
      load: number;
    }[]
  >([]);

  useEffect(() => {
    if (!isLoading) {
      const newFakeData = _.range(50).map(() => {
        const enter = Math.round(Math.random() * 450 + 1);
        let load;
        if (enter > 300) {
          load = Math.random() < 0.9 ? 3 : Math.round(Math.random() * 2 + 1);
        } else if (enter >= 150) {
          load = Math.random() < 0.9 ? 2 : Math.round(Math.random() * 2 + 1);
        } else {
          load = Math.random() < 0.9 ? 1 : Math.round(Math.random() * 2 + 1);
        }
        return {
          route: Math.round(Math.random() * 6 + 1),
          stop:
            busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown',
          enter: enter,
          exit: Math.round(Math.random() * 450 + 1),
          load: load,
        };
      });
      setFakeData(newFakeData);
    }
  }, [isLoading, busStops]);

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

  const combinedData = fakeData.map((data) => ({
    enter: data.enter,
    load: data.load,
  }));
  const sortedData = _.sortBy(combinedData, 'enter');

  const areaGraphData = {
    labels: sortedData.map((data) => data.enter),
    datasets: [
      {
        label: 'Load',
        data: sortedData.map((data) => data.load),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const areaGraphOptions = {
    scales: {
      x: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nástupy',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Vyťaženosť',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    indexAxis: 'x',
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

      {fakeData && <DataTable data={fakeData} />}
      <div className={styles.graphContainer}>
        <div className={styles.graph}>
          <Line data={areaGraphData} options={areaGraphOptions as any} />
        </div>
        <div className={styles.graph}>
          {/* <Bar data={data} options={options as any} /> */}
          <Image src="/images/heatmap.png" layout="fill" objectFit="contain" />
        </div>{' '}
      </div>
      <div className={styles.graphContainer}>
        <div className={styles.graph}>
          <Image
            src="/images/decisionFLow.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={styles.graph}>
          {/* <Bar data={data} options={options as any} /> */}
          <Image
            src="/images/decisionTree.png"
            layout="fill"
            objectFit="contain"
          />
        </div>{' '}
      </div>
      <p className={styles.description}>Overall accuracy of model: 89%</p>
      <p className={styles.description}> Overall error: 11%</p>
    </div>
  );
};

export default HomePage;
