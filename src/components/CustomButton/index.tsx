import { ReactNode } from 'react';
import styles from './index.module.css';
import { ClassNames } from '@emotion/react';
import classNames from 'classnames';

const CustomButton = ({
  children,
  onClick,
  className,
}: {
  onClick: () => void;
  children?: ReactNode;
  className?: any;
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames([className, styles.button])}
    >
      {' '}
      {children}
    </button>
  );
};

export default CustomButton;
