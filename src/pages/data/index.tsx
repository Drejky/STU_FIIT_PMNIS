import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Line } from 'react-chartjs-2';
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
import useBusStops from '@/hooks/useBusStops';
import Loading from '@/components/Loading';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

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

const DataTable = ({
  data,
  children,
  editable,
  setData,
  imported,
  importData,
  setImportData,
  classified,
}: any) => {
  const { busStops, isLoading, error } = useBusStops();
  useEffect(() => {
    Cookies.set('importData', JSON.stringify(importData));
    Cookies.set('data', JSON.stringify(data));
  }, [importData, data]);

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
            <th className={styles.th}>Vyťaženosť (istota)</th>
          </tr>
        </thead>
      </table>
      <div className={styles.tbodyContainer}>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            {imported &&
              importData.map((log: any, i: number) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{log.route}</td>
                  <td className={styles.td}>{log.stop}</td>
                  <td className={styles.td}>{log.enter}</td>
                  <td className={styles.td}>{log.exit}</td>
                  <td className={styles.td}>
                    {classified &&
                      (editable ? (
                        <>
                          <input
                            type="text"
                            value={`${importData[i].load}`}
                            onChange={(e) => {
                              setImportData(
                                importData.map((item, index) =>
                                  index === i
                                    ? {
                                        ...item,
                                        load: parseInt(e.target.value),
                                        edited: true,
                                      }
                                    : item
                                )
                              );
                            }}
                          />
                          {!log.edited && `${Math.floor(log.confidence)}%`}
                        </>
                      ) : log.edited ? (
                        `${log.load}`
                      ) : (
                        `${log.load} (${Math.floor(log.confidence)}%)`
                      ))}
                  </td>
                </tr>
              ))}
            {data.map((log: any, i: number) => (
              <tr key={i} className={styles.tr}>
                <td className={styles.td}>{log.route}</td>
                <td className={styles.td}>{log.stop}</td>
                <td className={styles.td}>{log.enter}</td>
                <td className={styles.td}>{log.exit}</td>
                <td className={styles.td}>
                  {editable ? (
                    <>
                      <input
                        type="text"
                        value={`${data[i].load}`}
                        onChange={(e) => {
                          setData(
                            data.map((item, index) =>
                              index === i
                                ? {
                                    ...item,
                                    load: parseInt(e.target.value),
                                    edited: true,
                                  }
                                : item
                            )
                          );
                        }}
                      />
                      {!log.edited && `${Math.floor(log.confidence)}%`}
                    </>
                  ) : log.edited ? (
                    `${log.load}`
                  ) : (
                    `${log.load} (${Math.floor(log.confidence)}%)`
                  )}
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
      const newFakeData = _.range(10).map(() => {
        const enter = Math.round(Math.random() * 450 + 1);
        let load;

        if (enter > 300) {
          load = Math.random() < 0.9 ? 3 : Math.round(Math.random() * 2 + 1);
        } else if (enter >= 150) {
          load = Math.random() < 0.9 ? 2 : Math.round(Math.random() * 2 + 1);
        } else {
          load = Math.random() < 0.9 ? 1 : Math.round(Math.random() * 2 + 1);
        }

        let grouindTruth =
          Math.random() < 0.8 ? load : Math.round(Math.random() * 2 + 1);

        return {
          groundTruth: grouindTruth,
          // load,
          load: load,
          route: Math.round(Math.random() * 6 + 1),
          stop:
            busStops[Math.round(Math.random() * (busStops.length - 1))].name ||
            'Unknown',
          enter: enter,
          exit: Math.round(Math.random() * 450 + 1),
          confidence:
            load == grouindTruth
              ? 80 + Math.random() * 20
              : 30 + Math.random() * 70 - 20,
          time: `${Math.round(Math.random() * 24 + 1)}:${Math.round(
            Math.random() * 60 + 1
          )}`,
          edited: false,
        };
      });
      setFakeData(newFakeData);
      console.log(newFakeData);
    }
  }, [isLoading, busStops]);

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

  const [data, setData] = useState(null);
  const [importData, setImportData] = useState(null);
  const [imported, setImported] = useState(false);
  const [classified, setClassified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/dataBeforeInsert.json')
      .then((response) => response.json())
      .then((data) =>
        setData(data.map((log: any) => ({ ...log, edited: false })))
      );
  }, []);
  useEffect(() => {
    fetch('/dataToInsert.json')
      .then((response) => response.json())
      .then((data) =>
        setImportData(data.map((log: any) => ({ ...log, edited: false })))
      );
  }, []);

  useEffect(() => {
    Cookies.set('importData', JSON.stringify(importData));
  }, [importData]);

  useEffect(() => {
    Cookies.set('data', JSON.stringify(data));
  }, [data]);

  const [editable, setEditable] = useState(false);
  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Trnavikon dáta klasifikuje do troch kategórií vyťaženosti podľa
        nástupov, výstupov, kategorizácie cestujúcich, počtu cestujúcich na
        vozidle. Stačí vložiť dátový súbor. V prípade nesprávnej klasifikácie je
        možné ju opraviť, táto informácia bude použitá pre vylepšenie AI
      </p>
      <div className={styles.dataControls}>
        <button className={styles.button} onClick={() => setImported(true)}>
          Import new data
        </button>
        <button className={styles.button} onClick={() => setClassified(true)}>
          Klasifikuj vyťaženosť
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setEditable(!editable);
          }}
        >
          Zapni/Vypni editovanie vyťaženosti
        </button>
        <button
          className={styles.button}
          onClick={() => {
            router.push('/hodnotenie');
          }}
        >
          Hodnotenie
        </button>
      </div>

      {fakeData && (
        <DataTable
          data={data}
          editable={editable}
          setData={setData}
          importData={importData}
          setImportData={setImportData}
          imported={imported}
          classified={classified}
        />
      )}
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
            src="/images/decisionFlow.png"
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
