let prevScrollpos = window.pageYOffset;
const navHolder = document.getElementById('navHolder');

function setAnimationSpeed(speed) {
  navHolder.style.setProperty('--animation-speed', speed);
}


setAnimationSpeed('0.5s');

window.onscroll = function() {
  let currentScrollpos = window.pageYOffset;
  if (prevScrollpos > currentScrollpos) {
    navHolder.style.top = "0";
  } else {
    navHolder.style.top = "-100px";
  }
  prevScrollpos = currentScrollpos;
}


// const blob = document.querySelector('.blob');

const tracker = document.querySelector('.blob');
const trackerSize = tracker.offsetWidth;

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

// Listen for mouse movement and update target position
document.addEventListener('mousemove', (event) => {
  targetX = event.pageX - trackerSize / 2;
  targetY = event.pageY - trackerSize / 2;
});

// Animation loop with interpolation
function animate() {
  // Lerp factor controls delay (0.1 = slow, 0.3 = faster)
  const speed = 0.03;
  currentX += (targetX - currentX) * speed;
  currentY += (targetY - currentY) * speed;

  tracker.style.left = `${currentX}px`;
  tracker.style.top = `${currentY}px`;

  requestAnimationFrame(animate);
}

animate();


// triangle animation 
const triangle = document.querySelector('.triangle');

let targetRotation = 0;
let currentRotation = 0;

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function updateRotation() {
  currentRotation = lerp(currentRotation, targetRotation, 0.01); // 0.1 = smooth easing
  triangle.style.transform = `rotate(${currentRotation}deg)`;
  requestAnimationFrame(updateRotation);
}

window.addEventListener('scroll', () => {
  targetRotation = window.scrollY * 0.2; // tweak multiplier for vibe
});

updateRotation();


 
  

  








// background blobs
if (window.innerWidth <= 768) {
  document.body.innerHTML = `
    <div id="message" style="text-align: center; font-size: 30px; color: #fff; font-weight: bold; 
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: fadeIn 2s ease-out;">
      Please view this on a larger screen for the best experience.
    </div>
  `;

  // Create the "Under Development" message
  const devMessage = document.createElement('div');
  devMessage.id = 'devMessage';
  devMessage.textContent = 'Website Is Currently Under Development';
  devMessage.style.position = 'absolute';
  devMessage.style.top = '10px';
  devMessage.style.left = '50%';
  devMessage.style.transform = 'translateX(-50%)';
  devMessage.style.fontSize = '20px';
  devMessage.style.fontWeight = 'bold';
  devMessage.style.color = '#FF6347'; // Highlighted color (tomato)
  devMessage.style.zIndex = '9999'; // Make sure it stays on top
  document.body.appendChild(devMessage);

  document.body.style.margin = '0';
  document.body.style.height = '100vh';
  document.body.style.backgroundColor = 'black';
  document.body.style.position = 'relative';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .blob {
      position: absolute;
      background: rgba(28, 60, 98, 0.3);
      border-radius: 50%;
      filter: blur(100px);
      transition: transform 0.2s ease-out;
    }
  `;
  document.head.appendChild(style);

  function createBlob() {
    const blob = document.createElement('div');
    blob.className = 'blob';
    const size = Math.random() * 300 + 200;
    const left = Math.random() * 100 + '%';
    const top = Math.random() * 100 + '%';

    blob.style.width = `${size}px`;
    blob.style.height = `${size}px`;
    blob.style.left = left;
    blob.style.top = top;

    const colors = [
      'rgba(3, 64, 98, 0.3)', 'rgba(23, 78, 97, 0.3)', 'rgba(169, 218, 220, 0.3)'
    ];
    blob.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(blob);

    setTimeout(() => {
      blob.remove();
    }, 4000);
  }

  setInterval(createBlob, 2500);
}
