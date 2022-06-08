import './form.js';
import './map.js';
import { getData } from './api.js';
import { setUsualMarker } from './map.js';
import { showAllertMessage, createErrorMessage } from './util/util.js';

getData((advertise) => setUsualMarker(advertise), () => showAllertMessage(createErrorMessage));
