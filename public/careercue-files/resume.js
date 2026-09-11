// resume.js
function updatePreview() {
  const name = document.getElementById('res-name').value;
  const role = document.getElementById('res-role').value;
  const email = document.getElementById('res-email').value;
  const summary = document.getElementById('res-summary').value;
  const bullet = document.getElementById('res-bullet').value;
  const skills = document.getElementById('res-skills').value;

  document.getElementById('preview-name').textContent = name || 'Your Name';
  document.getElementById('preview-role').textContent = role || 'Target Engineering Role';
  document.getElementById('preview-contact').textContent = `${email || 'email@example.com'} • +91 98765 43210 • Bangalore, India`;
  document.getElementById('preview-summary').textContent = summary;
  document.getElementById('preview-bullet').textContent = bullet;
  document.getElementById('preview-skills').textContent = skills;
}

function improveBulletWithAI() {
  const bulletInput = document.getElementById('res-bullet');
  const atsDial = document.getElementById('ats-score-display');

  // AI Cue Enhancement Simulation
  bulletInput.value = "Architected high-throughput REST APIs handling 1.8M daily transactions, slashing checkout latency by 32% and achieving 99.98% uptime using Redis and Spring Boot.";
  
  atsDial.textContent = "96";
  atsDial.style.background = "#059669";
  updatePreview();

  alert("✨ CareerCue AI Cue Applied! Passive bullet converted to metric-driven achievement (+7 ATS Score).");
}

document.addEventListener('DOMContentLoaded', () => {
  updatePreview();
});
