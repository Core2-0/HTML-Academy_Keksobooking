import { setInactiveState, setActiveState } from './page-state.js';
import { setAddress } from './form.js';
import { createAdvertise } from './data.js';
import { createCustomPopup } from './advertise.js';
import * as L from '../leaflet/leaflet-src.esm.js';

const centerMap = {
  LAT: 35.681729,
  LNG: 139.753927,
  ZOOM: 12,
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
  lat: centerMap.LAT,
  lng: centerMap.LNG,
}, centerMap.ZOOM);

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

const usualPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PIN_SIZES.USUAL.X, PIN_SIZES.USUAL.Y],
  iconAnchor: [PIN_SIZES.USUAL.X / 2, PIN_SIZES.USUAL.Y],
  popupAnchor: [0, -PIN_SIZES.USUAL.Y / 2],
});

const mainMarker = L.marker(
  {
    lat: centerMap.LAT,
    lng: centerMap.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

const setUsualMarker = (advertise) => {
  const usualMarker = L.marker(
    {
      lat: advertise.location.x,
      lng: advertise.location.y,
    },
    {
      icon: usualPinIcon,
    },
  );
  usualMarker.addTo(map).bindPopup(createCustomPopup(advertise)),
  {
    keepInView: true,
  };
};

createAdvertise().forEach((element) => {
  setUsualMarker(element);
});

setAddress(centerMap.LAT, centerMap.LNG);

mainMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});
