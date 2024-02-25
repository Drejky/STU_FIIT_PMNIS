// pages/index.js

import LeafletMap from '@/components/LeafletMap';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <LeafletMap />
      <p>foo</p>
    </div>
  );
}
