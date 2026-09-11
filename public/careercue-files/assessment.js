// assessment.js - Career Diagnostic Flow
let currentStep = 1;

function goToStep(step) {
  // Hide current
  document.getElementById(`quiz-step-${currentStep}`).style.display = 'none';
  document.getElementById(`step-${currentStep}-ind`).classList.remove('active');

  // Show target
  currentStep = step;
  document.getElementById(`quiz-step-${currentStep}`).style.display = 'block';
  document.getElementById(`step-${currentStep}-ind`).classList.add('active');

  // Update progress bar
  const pct = (currentStep / 4) * 100;
  document.getElementById('progress-fill').style.width = `${pct}%`;
  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function calculateResults() {
  const selectedDomain = document.querySelector('input[name="domain"]:checked')?.value || 'backend';
  const targetRoleTitle = document.getElementById('result-title');
  const targetDesc = document.getElementById('result-desc');

  if (selectedDomain === 'frontend') {
    targetRoleTitle.textContent = 'Senior Frontend & Web Systems Architect';
    targetDesc.textContent = 'High visual and structural execution strength. Suited for customer-facing unicorn startups and design-driven tech companies.';
  } else if (selectedDomain === 'ai') {
    targetRoleTitle.textContent = 'Applied AI & Foundation Models Engineer';
    targetDesc.textContent = 'Strong mathematical foundations and data-pipeline prowess. Ideal for AI research labs and intelligent platform startups.';
  } else if (selectedDomain === 'cloud') {
    targetRoleTitle.textContent = 'Cloud Infrastructure & Platform Reliability Engineer';
    targetDesc.textContent = 'Mastery over automation, security perimeters, and distributed container topologies.';
  } else {
    targetRoleTitle.textContent = 'Full-Stack Distributed Systems Engineer';
    targetDesc.textContent = 'Your logical profile combines high systemic reasoning with full-stack adaptability. You have high alignment with high-growth fintech, cloud platforms, and tier-1 product organizations.';
  }

  goToStep(4);
}
