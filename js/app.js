// for (let i=0; i<150; i++) {
//   const drop = document.createElement('i');
//   drop.classList.add('rain');
//   document.getElementById('rain-container').appendChild(drop);
// }

const tracks = [];
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


const $vol = document.getElementById('vol');
setVolume(Cookies.get('vol') || 100);
$vol.addEventListener('input', e => setVolume(e.target.value));

function setVolume(vol100) {
  const vol1 = vol100 / 100;
  tracks.forEach(track => {
    track.audio.volume = vol1;
  });
  Cookies.set('vol', vol100);
  $vol.value = vol100;
}

const $orbText = document.getElementById('orb-text');
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
