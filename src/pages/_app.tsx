// pages/_app.tsx

import '../styles/global.css';
import { AppProps } from 'next/app';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
