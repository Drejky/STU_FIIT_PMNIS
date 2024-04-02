import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import CustomMap from '../CustomMap';
import CustomMapPin from '../CustomMapPin';
import { BUS_ICON } from '../../../lib/constants';

const CustomMarker = ({
  children,
  position,
}: {
  children: React.ReactNode;
  position: any;
}) => {
  return (
    <Marker position={position} icon={BUS_ICON}>
      {children}
    </Marker>
  );
};

export default CustomMarker;
