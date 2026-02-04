// =======================
// NAVBAR SCROLL BEHAVIOR
// =======================
const navHolder = document.getElementById('navHolder');
let prevScrollPos = window.pageYOffset;

function setAnimationSpeed(speed) {
  navHolder.style.setProperty('--animation-speed', speed);
}
setAnimationSpeed('0.5s');

window.addEventListener('scroll', () => {
  const currentScrollPos = window.pageYOffset;
  navHolder.style.top = prevScrollPos > currentScrollPos ? "0" : "-100px";
  prevScrollPos = currentScrollPos;
});

// =======================
// HELPER: LINEAR INTERPOLATION
// =======================
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

// =======================
// BLOB TRACKER + WIGGLE
// =======================
const blob = document.querySelector('.blob');
const blobSize = blob.offsetWidth;

let blobTargetX = 0, blobTargetY = 0;
let blobCurrentX = 0, blobCurrentY = 0;

// Wiggle settings
const wiggleFrequency = 0.2; // wiggles per second
const wiggleAmplitude = 10; // max offset in px

document.addEventListener('mousemove', (event) => {
  blobTargetX = event.pageX - blobSize / 2;
  blobTargetY = event.pageY - blobSize / 2;
});

function animateBlob() {
  const speed = 0.03;
  blobCurrentX += (blobTargetX - blobCurrentX) * speed;
  blobCurrentY += (blobTargetY - blobCurrentY) * speed;

  // Wiggle offset based on time
  const time = Date.now() / 1000;
  const wiggleX = Math.sin(time * wiggleFrequency * Math.PI * 2) * wiggleAmplitude;
  const wiggleY = Math.cos(time * wiggleFrequency * Math.PI * 2) * wiggleAmplitude;

  blob.style.left = `${blobCurrentX + wiggleX}px`;
  blob.style.top = `${blobCurrentY + wiggleY}px`;

  requestAnimationFrame(animateBlob);
}
animateBlob();

// =======================
// TRIANGLE SCROLL ROTATION
// =======================
const triangle = document.querySelector('.triangle');
let triangleTargetRotation = 0;
let triangleCurrentRotation = 0;

function animateTriangle() {
  triangleCurrentRotation = lerp(triangleCurrentRotation, triangleTargetRotation, 0.01);
  triangle.style.transform = `rotate(${triangleCurrentRotation}deg)`;
  requestAnimationFrame(animateTriangle);
}

window.addEventListener('scroll', () => {
  triangleTargetRotation = window.scrollY * 0.2;
});
animateTriangle();

// =======================
// CUSTOM CURSOR + COLLISION
// =======================
const cursor = document.querySelector('.cursor');
let cursorMouseX = 0, cursorMouseY = 0;
let cursorCurrentX = 0, cursorCurrentY = 0;

document.addEventListener('mousemove', (e) => {
  cursorMouseX = e.clientX;
  cursorMouseY = e.clientY;
});

function animateCursor() {
  cursorCurrentX = lerp(cursorCurrentX, cursorMouseX, 0.2);
  cursorCurrentY = lerp(cursorCurrentY, cursorMouseY, 0.2);

  cursor.style.transform = `translate(${cursorCurrentX}px, ${cursorCurrentY}px)`;

  // Collision detection with blob
  const cursorRect = cursor.getBoundingClientRect();
  const blobRect = blob.getBoundingClientRect();

  const isTouching = !(
    cursorRect.right < blobRect.left ||
    cursorRect.left > blobRect.right ||
    cursorRect.bottom < blobRect.top ||
    cursorRect.top > blobRect.bottom
  );

  if (isTouching) {
    cursor.style.background = "#2E3440"; // Dark Nord
    cursor.style.border = "2px solid #3B4252";
  } else {
    cursor.style.background = "#ECEFF4"; // Light Nord
    cursor.style.border = "2px solid #D8DEE9";
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();



// =======================
// WAVE ANIMATION (faster + wavier)
// =======================

const waves = document.querySelectorAll('.wave1 path');

// Settings per wave
// w-5 (last path, brightest) stays solid
const waveSettings = [
  { speed: 1.2, amplitudeX: 40, amplitudeY: 12, animateOpacity: true },  // w-1
  { speed: 1.5, amplitudeX: 45, amplitudeY: 15, animateOpacity: true },  // w-2
  { speed: 1.8, amplitudeX: 50, amplitudeY: 18, animateOpacity: true },  // w-3
  { speed: 2.0, amplitudeX: 55, amplitudeY: 20, animateOpacity: true },  // w-4
  { speed: 1.0, amplitudeX: 25, amplitudeY: 8, animateOpacity: false }   // w-5 (brightest, stays solid)
];

function animateWaves() {
  const time = Date.now() / 1000;

  waves.forEach((wave, i) => {
    const { speed, amplitudeX, amplitudeY, animateOpacity } = waveSettings[i];

    // Faster oscillation
    const offsetX = Math.sin(time * speed) * amplitudeX;
    const offsetY = Math.cos(time * speed * 0.9) * amplitudeY;

    wave.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    wave.style.transformOrigin = "center";
    wave.style.transformBox = "fill-box";

    if (animateOpacity) {
      const opacity = 0.6 + (Math.sin(time * speed * 1.2) + 1) / 2 * 0.4; // range 0.6–1
      wave.style.opacity = opacity;
    } else {
      wave.style.opacity = 1; // keep solid for w-5
    }
  });

  requestAnimationFrame(animateWaves);
}

animateWaves();
