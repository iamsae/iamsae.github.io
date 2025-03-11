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


const blob = document.querySelector('.blob');


    // Update blob position
    document.addEventListener('mousemove', (event) => {
      const tracker = document.querySelector('.blob');
      const trackerSize = tracker.offsetWidth; // Assuming a square element
      const x = event.pageX - trackerSize / 2; // Center horizontally
      const y = event.pageY - trackerSize / 2; // Center vertically
    
      // Update position
      tracker.style.left = `${x}px`;
      tracker.style.top = `${y}px`;
    });

 
    if (window.innerWidth <= 768) {
      document.body.innerHTML = '<div style="text-align: center; font-size: 24px; margin-top: 20%;">Please use a bigger display to preview this website</div>';
      document.body.style.backgroundColor = "#f0f0f0"; // Optional: background color
  }
  

// const updateBlobPosition = () => {
//     blobX += (mouseX - blobX) * 0.1; // Adjust 0.1 to change lag intensity
//     blobY += (mouseY - blobY) * 0.1;

//     blob.style.transform = `translate(${blobX}px, ${blobY}px)`;

//     requestAnimationFrame(updateBlobPosition);
// };

// document.addEventListener('mousemove', (event) => {
//     mouseX = event.clientX;
//     mouseY = event.clientY;
// });

// updateBlobPosition();