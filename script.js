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

 
  

  








// background blobs

    if (window.innerWidth <= 768) {
      document.body.innerHTML = `
          <div id="message" style="text-align: center; font-size: 30px; color: #fff; font-weight: bold; 
              position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: fadeIn 2s ease-out;">
              Please use a bigger display to preview this website
          </div>
      `;
  
      // Apply black background and disable scrolling
      document.body.style.margin = '0';
      document.body.style.height = '100vh';
      document.body.style.backgroundColor = 'black'; // Set black background
      document.body.style.position = 'relative';
      document.body.style.overflow = 'hidden'; // Disable scrolling on body
      document.documentElement.style.overflow = 'hidden'; // Disable scrolling on the whole document
  
      const style = document.createElement('style');
      style.innerHTML = `
          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          @keyframes fadeOut {
              from { opacity: 1; }
              to { opacity: 0; }
          }
          @keyframes moveBlob {
              0% { transform: translate(0, 0); }
              100% { transform: translate(500px, 500px); }
          }
  
          .blob {
              position: absolute;
              background: rgba(28, 60, 98, 0.3); /* Nordic-inspired blue */
              border-radius: 50%;
              filter: blur(100px);
              animation: moveBlob 30s ease-in-out infinite, fadeIn 6s ease-in forwards, fadeOut 6s ease-out forwards;
          }
      `;
      document.head.appendChild(style);
  
      // Function to generate random positions and sizes
      function createBlob() {
          const blob = document.createElement('div');
          blob.className = 'blob';
          const size = Math.random() * 300 + 200;  // Random size between 200px and 500px
          const left = Math.random() * 100 + '%';  // Random horizontal position
          const top = Math.random() * 100 + '%';   // Random vertical position
  
          blob.style.width = `${size}px`;
          blob.style.height = `${size}px`;
          blob.style.left = left;
          blob.style.top = top;
  
          // Add random colors for the blobs
          const colors = [
              'rgba(3, 64, 98, 0.3)', 'rgba(23, 78, 97, 0.3)', 'rgba(169, 218, 220, 0.3)'
          ];
          blob.style.background = colors[Math.floor(Math.random() * colors.length)];
  
          document.body.appendChild(blob);
  
          // Remove the blob after its animation
          setTimeout(() => {
              blob.remove();
          }, 30000);  // After 30 seconds (duration of the animation)
      }
  
      // Generate multiple blobs at random intervals
      setInterval(createBlob, 2000);  // Create a new blob every 2 seconds
  }
  