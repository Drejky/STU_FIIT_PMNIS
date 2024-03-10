// pages/_app.tsx

import '../styles/global.css';
import { AppProps } from 'next/app';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CustomNavbar from '@/components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomNavbar />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
