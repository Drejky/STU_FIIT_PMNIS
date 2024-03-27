import L from 'leaflet';

const createBusIcon = () => {
  return L.divIcon({
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
};

export default createBusIcon;
