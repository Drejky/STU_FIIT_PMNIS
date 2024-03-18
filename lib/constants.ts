import L from 'leaflet';

export const ROUTE_FILES = [
  { fileName: '1_stop.json', routeName: '1', show: true },
  { fileName: '2_stop.json', routeName: '2', show: true },
  { fileName: '3_stop.json', routeName: '3', show: true },
  { fileName: '4_stop.json', routeName: '4', show: true },
  { fileName: '5_stop.json', routeName: '5', show: true },
  { fileName: '6_stop.json', routeName: '6', show: true },
  { fileName: '12_stop.json', routeName: '12', show: true },
  { fileName: '13_stop.json', routeName: '13', show: true },
  { fileName: '14_stop.json', routeName: '14', show: true },
  { fileName: '16_stop.json', routeName: '16', show: true },
  { fileName: '21_stop.json', routeName: '21', show: true },
  { fileName: '22_stop.json', routeName: '22', show: true },
  { fileName: '23_stop.json', routeName: '23', show: true },
];
export const BUS_ICON = L.divIcon({
  className: 'customIcon',
  html: `
    <span style="
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid black;
      border-radius: 50%;
      background: white;
      width: 20px;
      height: 20px;
    ">
      <i class="fas fa-bus" style="color: #000080;"></i>
    </span>
  `,
  iconSize: [20, 20], // Increase the size to accommodate the background and border
});

export const colours = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];
