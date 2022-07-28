import { setInactiveState, setActiveState } from './page-state.js';
import { setAddress } from './form.js';
import { renderAdvertise } from './advertise.js';
import * as L from '../leaflet/leaflet-src.esm.js';

const SHOW_ADVERTISE_COUNT = 10;

const DEFAULT_POSITION = {
  LAT: 35.681729,
  LNG: 139.753927,
  ZOOM: 14,
};

const PIN_SIZES = {
  MAIN: {
    X: 52,
    Y: 52,
  },
  USUAL: {
    X: 40,
    Y: 40,
  },
};

const mapCanvas = document.querySelector('#map-canvas');

setInactiveState();

const map = L.map(mapCanvas).on('load', () => {
  setActiveState();
}).setView({
  lat: DEFAULT_POSITION.LAT,
  lng: DEFAULT_POSITION.LNG,
}, DEFAULT_POSITION.ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [PIN_SIZES.MAIN.X, PIN_SIZES.MAIN.Y],
  iconAnchor: [PIN_SIZES.MAIN.X / 2, PIN_SIZES.MAIN.Y],
  popupAnchor: [0, -PIN_SIZES.USUAL.Y / 2],
});

const mainMarker = L.marker(
  {
    lat: DEFAULT_POSITION.LAT,
    lng: DEFAULT_POSITION.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setMainMarkerDefault = () => {
  mainMarker.setLatLng([DEFAULT_POSITION.LAT, DEFAULT_POSITION.LNG]);
  setAddress(DEFAULT_POSITION.LAT, DEFAULT_POSITION.LNG);
};

mainMarker.addTo(map);

const usualPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PIN_SIZES.USUAL.X, PIN_SIZES.USUAL.Y],
  iconAnchor: [PIN_SIZES.USUAL.X / 2, PIN_SIZES.USUAL.Y],
  popupAnchor: [0, -PIN_SIZES.USUAL.Y / 2],
});

const markers = [];

const setUsualMarker = (advertise) => {
  const marker = L.marker(
    {
      lat: advertise.location.lat,
      lng: advertise.location.lng,
    },
    {
      icon: usualPinIcon,
    });

  marker.addTo(map).bindPopup(renderAdvertise(advertise),
    {
      keepInView: true,
    },
  );
  markers.push(marker);
};

const renderPins = (advertise) => {
  advertise.slice(0, SHOW_ADVERTISE_COUNT).forEach((place) => {
    setUsualMarker(place);
  });
};

const removePins = () => {
  markers.forEach((marker) => marker.remove());
};

// const setUsualMarker = (similarAdvertise) => {
//   similarAdvertise.forEach(({ author, offer, location }) => {
//     const usualMarker = L.marker(
//       {
//         lat: location.lat,
//         lng: location.lng,
//       },
//       {
//         icon: usualPinIcon,
//       },
//     );
//     usualMarker.addTo(map).bindPopup(renderAdvertise({ author, offer, location })),
//     {
//       keepInView: true,
//     };
//   });
// };

setMainMarkerDefault();

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

export { setUsualMarker, setMainMarkerDefault, renderPins, removePins };
