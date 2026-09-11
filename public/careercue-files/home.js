// home.js - Logic for CareerCue Home Page
document.addEventListener('DOMContentLoaded', () => {
  console.log('CareerCue Home Module Initialized');

  // Animated counter effect for placements
  const placementCounter = document.getElementById('counter-placements');
  if (placementCounter) {
    let count = 13800;
    const target = 14200;
    const step = 25;
    const interval = setInterval(() => {
      count += step;
      if (count >= target) {
        placementCounter.textContent = '14,200+';
        clearInterval(interval);
      } else {
        placementCounter.textContent = count.toLocaleString() + '+';
      }
    }, 40);
  }

  // Smooth hover signal animation
  const cuePulse = document.querySelector('.cue-pulse');
  if (cuePulse) {
    setInterval(() => {
      cuePulse.style.opacity = cuePulse.style.opacity === '0.4' ? '1' : '0.4';
    }, 900);
  }
});
