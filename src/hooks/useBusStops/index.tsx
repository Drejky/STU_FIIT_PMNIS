import { useState, useEffect } from 'react';
import { BUS_STOPS_QUERY } from '../../../lib/queries';
import { BusStop } from '../../../lib/types';

const useBusStops = () => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch bus stop coordinates and names
  useEffect(() => {
    const fetchBusStops = async () => {
      setIsLoading(true);
      try {
        fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: `data=${encodeURIComponent(BUS_STOPS_QUERY)}`,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
          .then((response) => response.json())
          .then((data) => {
            const busStopsData = data.elements.map(
              (element: {
                lat: number;
                lon: number;
                tags: { name: string };
              }) => ({
                lat: element.lat,
                lng: element.lon,
                name: element.tags ? element.tags.name : null,
              })
            );
            setBusStops(busStopsData);
            setIsLoading(false);
          });
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchBusStops();
  }, []);

  return { busStops, isLoading, error };
};

export default useBusStops;
