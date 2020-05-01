import { redStyle } from "./constants.mjs";
import Login from './login.mjs'

firebase.initializeApp({
  apiKey: "AIzaSyDS9yg5xONZDiP-zw1BbloaS5Iw05qYNOo",
  authDomain: "bloodmap-3997a.firebaseapp.com",
  databaseURL: "https://bloodmap-3997a.firebaseio.com",
  projectId: "bloodmap-3997a",
  storageBucket: "bloodmap-3997a.appspot.com",
  messagingSenderId: "195113289420",
  appId: "1:195113289420:web:0e21d46174b6b8a628a469"
});

const db = firebase.firestore();

// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
const map = new google.maps.Map(document.getElementById('map-view'), {
  fullscreenControl: false, // toggling between street/map view in fullscreen not resolved
  zoom: 4,
  center: { lat: 39.0445613, lng: 125.7526908 },
  styles: redStyle,
  backgroundColor: '#AC1B31', // night:1B253C
  draggableCursor: 'crosshair',
  minZoom: 3,
  mapTypeControl: false
  // disableDefaultUI: true
});

google.maps.event.addListener(map, 'click', handleClick);

async function handleClick({ latLng }) {
  const name = prompt("Who are you sending to the bloodmap?")
  if (!name) return;

  const lat = latLng.lat()
  const lng = latLng.lng()

  await createMarker({ name, lat, lng });
  setMarkerOnMap({
    name,
    lat,
    lng
  })
}

function setMarkerOnMap({ name, lat, lng }) {
  const image = 'img/stockPray.png'

  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    title: name,
    icon: {
      url: image,
      labelOrigin: new google.maps.Point(12, 35),
    },
    label: name,
  });

  marker.setMap(map);
}

async function setMarkers() {
  const ref = db.collection("markers");

  try {
    const query = await ref.get();
    console.log(query.size)
    document.querySelector('#orb-text').textContent = query.size
    query.forEach((row) => {
      const { name, lat, lng } = row.data();
      setMarkerOnMap({ name, lat, lng })
    })
  } catch (e) {
    throw e
  }
}

export async function login(email, password) {
 return await firebase.auth().signInWithEmailAndPassword(email, password)
}

async function createMarker({ name, lat, lng }) {
  const ref = db.collection('markers');

  try {
    await ref.doc().set({
      name: name,
      lat: lat,
      lng: lng
    })
  } catch (e) {
    console.error("Error creating new marker")
  }
}

export function init() {
  setMarkers()
    .then(() => {
      console.log("Actually logged in PogU")
    })
    .catch(() => {
      Login()
    })
}

init()
