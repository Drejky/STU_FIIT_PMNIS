import { useEffect, useState } from 'react';
import newStyles from './index.module.css';
import styles from '../data/index.module.css';
import Cookies from 'js-cookie';

const wizardPage = () => {
  const [importData, setImportData] = useState<any[]>([]);
  useEffect(() => {
    setImportData(JSON.parse(Cookies.get('importData')));
  }, []);

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch('/dataBeforeInsert.json')
      .then((response) => response.json())
      .then((data) =>
        setData(data.map((log: any) => ({ ...log, edited: false })))
      );
  }, []);

  return (
    <div className={newStyles.container}>
      <h1>Wizard</h1>
      <h2>Dáta pred pridaním nových</h2>
      <div>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Linka</th>
              <th className={styles.th}>Zastávka</th>
              <th className={styles.th}>Nástup</th>
              <th className={styles.th}>Výstup</th>
              <th className={styles.th}>Ground truth</th>
              <th className={styles.th}>Vyťaženosť</th>
              <th className={styles.th}>Istota</th>
            </tr>
          </thead>
        </table>
        <div className={styles.tbodyContainer}>
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              {data.map((log: any, i: number) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{log.route}</td>
                  <td className={styles.td}>{log.stop}</td>
                  <td className={styles.td}>{log.enter}</td>
                  <td className={styles.td}>{log.exit}</td>
                  <td className={styles.td}>{log.groundTruth}</td>
                  <td className={styles.td}>{log.load}</td>
                  <td className={styles.td}>{log.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2>Pridané pripravené dáta</h2>
      <div>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Linka</th>
              <th className={styles.th}>Zastávka</th>
              <th className={styles.th}>Nástup</th>
              <th className={styles.th}>Výstup</th>
              <th className={styles.th}>Ground truth</th>
              <th className={styles.th}>Vyťaženosť</th>
              <th className={styles.th}>Istota</th>
            </tr>
          </thead>
        </table>
        <div className={styles.tbodyContainer}>
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              {importData &&
                importData.map((log: any, i: number) => (
                  <tr key={i} className={styles.tr}>
                    <td className={styles.td}>{log.route}</td>
                    <td className={styles.td}>{log.stop}</td>
                    <td className={styles.td}>{log.enter}</td>
                    <td className={styles.td}>{log.exit}</td>
                    <td className={styles.td}>{log.groundTruth}</td>
                    <td className={styles.td}>{log.load}</td>
                    <td className={styles.td}>{log.confidence}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default wizardPage;
