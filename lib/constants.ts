import L from 'leaflet';

export const ROUTE_FILES = [
  { fileName: '1_stop.json', routeName: '1' },
  { fileName: '2_stop.json', routeName: '2' },
  { fileName: '3_stop.json', routeName: '3' },
  { fileName: '4_stop.json', routeName: '4' },
  { fileName: '5_stop.json', routeName: '5' },
  { fileName: '6_stop.json', routeName: '6' },
  { fileName: '12_stop.json', routeName: '12' },
  { fileName: '13_stop.json', routeName: '13' },
  { fileName: '14_stop.json', routeName: '14' },
  { fileName: '16_stop.json', routeName: '16' },
  { fileName: '21_stop.json', routeName: '21' },
  { fileName: '22_stop.json', routeName: '22' },
  { fileName: '23_stop.json', routeName: '23' },
];

export const BUS_ICON = L.divIcon({
  className: 'customIcon',
  html: `<i class="fas fa-bus"></i>`,
  iconSize: [20, 20],
});
