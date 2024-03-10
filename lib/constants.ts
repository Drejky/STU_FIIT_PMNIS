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
