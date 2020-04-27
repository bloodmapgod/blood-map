
let redStyle = [
  {
    "stylers": [
      {
        "hue": "#B61530"
      },
      {
        "saturation": 60
      },
      {
        "lightness": -40
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "color": "#B61530"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "color": "#B61530"
      },
      {}
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "color": "#B61530"
      },
      {
        "lightness": 6
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "color": "#B61530"
      },
      {
        "lightness": -25
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "color": "#B61530"
      },
      {
        "lightness": -10
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "color": "#B61530"
      },
      {
        "lightness": 70
      }
    ]
  },
  {
    "featureType": "transit.line",
    "stylers": [
      {
        "color": "#B61530"
      },
      {
        "lightness": 90
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  }
];

for (let i=0; i<150; i++) {
  let drop = document.createElement('i');
  drop.classList.add('rain');
  document.getElementById('rain-container').appendChild(drop);
}

// https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
let map = new google.maps.Map(document.getElementById('map-view'), {
  fullscreenControl: false, // toggling between street/map view in fullscreen not resolved
  zoom: 4,
  center: {lat: 39.0445613, lng: 125.7526908},
  styles: redStyle,
  backgroundColor: '#AC1B31', // night:1B253C
  draggableCursor: 'crosshair',
  minZoom: 3,
  mapTypeControl: false
  // disableDefaultUI: true
});

let tracks = [];
document.querySelectorAll('.btn-audio').forEach(el => {
  tracks.push({
    el: el,
    active: false,
    audio: new Audio(el.getAttribute('data-src'))
  });
  el.addEventListener('click', e => {
    tracks.forEach(track => {
      if (track.el === e.target && !track.active) {
        track.el.classList.add('active');
        track.active = true;
        track.audio.play();
      } else {
        track.el.classList.remove('active');
        track.active = false;
        track.audio.pause();
      }
    })
  });
});


let $vol = document.getElementById('vol');
setVolume(Cookies.get('vol') || 100);
$vol.addEventListener('input', e => setVolume(e.target.value));

function setVolume(vol100) {
  let vol1 = vol100 / 100;
  tracks.forEach(track => {
    track.audio.volume = vol1;
  });
  Cookies.set('vol', vol100);
  $vol.value = vol100;
}

let $orbText = document.getElementById('orb-text');
document.getElementById('btn-incr').addEventListener('click', () => incrSacrifice());
document.getElementById('btn-decr').addEventListener('click', () => decrSacrifice());

let sacrificeNum = parseInt(Cookies.get('sacrificeNum')) || 0;
setNum(sacrificeNum);

function setNum(num) {
  num = num >= 0 ? num : 0;
  sacrificeNum = num;
  $orbText.innerText = num;
  Cookies.set('sacrificeNum', num);
}

function incrSacrifice() {
  setNum(sacrificeNum + 1);
}

function decrSacrifice() {
  setNum(sacrificeNum - 1);
}
