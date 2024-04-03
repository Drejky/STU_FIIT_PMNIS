import { ReactNode } from 'react';
import styles from './index.module.css';

const CustomButton = ({
  children,
  onclick,
}: {
  onclick: any;
  children: ReactNode;
}) => {
  return (
    <button onClick={onclick} className={styles.button}>
      {' '}
      {children}
    </button>
  );
};

export default CustomButton;
