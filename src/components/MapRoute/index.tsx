import { Polyline } from 'react-leaflet';
import { Route } from '../../../lib/types';
import { colours } from '../../../lib/constants';

const MapRoute = ({ route }: { route: Route | null }) => {
  if (!route) return null;
  const colour = colours[Math.floor(Math.random() * colours.length)];
  return (
    <div>
      {route?.coordinates.map((section, sectionIndex) => (
        <>
          <Polyline
            key={`border-${sectionIndex}`}
            positions={route.coordinates.slice(sectionIndex, sectionIndex + 2)}
            color="black" // This is the border color
            weight={8} // This should be larger than the weight of the main line
          />
          <Polyline
            key={`line-${sectionIndex}`}
            positions={route.coordinates.slice(sectionIndex, sectionIndex + 2)}
            color={colour}
            weight={6} // This should be smaller than the weight of the border line
          />
        </>
      ))}
    </div>
  );
};

export default MapRoute;
