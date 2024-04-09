import React from 'react';
import style from './page.module.css';
import { useRouter } from 'next/router';
import { useSidebar } from '@/components/SidebarContext';

const CustomNavbar: React.FC = () => {
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  console.log(router.pathname);
  if (router.pathname === '/busDetail' || router.pathname === '/grafikonDetail')
    return '';
  return (
    <div className={style.navbar_container}>
      <h1 className={style.title} onClick={() => router.push('/')}>
        Trnavikon
      </h1>
      <div className={style.button_container}>
        <button
          className={style.navbar_button}
          onClick={() => router.push('/map')}
        >
          Map
        </button>
        <button
          className={style.navbar_button}
          onClick={() => router.push('/data')}
        >
          Data
        </button>
        <button
          className={style.navbar_button}
          onClick={() => router.push('/grafikon')}
        >
          Grafikon
        </button>
      </div>
      <button
        className={style.filters}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        Filt
      </button>
    </div>
  );
};

export default CustomNavbar;
