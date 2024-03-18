// pages/_app.tsx

import '../styles/global.css';
import { AppProps } from 'next/app';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CustomNavbar from '@/components/Navbar';
import { SidebarProvider } from '@/components/SidebarContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <CustomNavbar />
      <Component {...pageProps} />
    </SidebarProvider>
  );
}

export default MyApp;
