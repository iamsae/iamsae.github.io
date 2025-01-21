let prevScrollpos = window.pageYOffset;
const navHolder = document.getElementById('navHolder');

function setAnimationSpeed(speed) {
  navHolder.style.setProperty('--animation-speed', speed);
}

// Example usage: setAnimationSpeed('1s'); to set the animation speed to 1 second
setAnimationSpeed('0.5s'); // Set your desired speed here

window.onscroll = function() {
  let currentScrollpos = window.pageYOffset;
  if (prevScrollpos > currentScrollpos) {
    navHolder.style.top = "0";
  } else {
    navHolder.style.top = "-100px"; // Adjust this value based on your navbar height
  }
  prevScrollpos = currentScrollpos;
}


const blob = document.querySelector('.blob');

document.addEventListener('mousemove', (event) => {
    // Update blob position
    blob.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});


let mouseX = 0, mouseY = 0;
let blobX = 0, blobY = 0;

const updateBlobPosition = () => {
    blobX += (mouseX - blobX) * 0.1; // Adjust 0.1 to change lag intensity
    blobY += (mouseY - blobY) * 0.1;

    blob.style.transform = `translate(${blobX}px, ${blobY}px)`;

    requestAnimationFrame(updateBlobPosition);
};

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

updateBlobPosition();
