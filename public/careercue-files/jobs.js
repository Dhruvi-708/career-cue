// jobs.js
const jobsData = [
  {
    id: 'job-1',
    title: 'Associate Software Engineer',
    company: 'Google',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    category: 'software',
    salary: '₹18 - ₹24 LPA',
    match: 95,
    tags: ['Java', 'Distributed Systems', 'GCP'],
    description: 'Join the Core Infrastructure team to develop scalable backend microservices and reliable distributed data systems.'
  },
  {
    id: 'job-2',
    title: 'Frontend React Developer',
    company: 'Razorpay',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore, India',
    type: 'Full-time',
    category: 'frontend',
    salary: '₹14 - ₹19 LPA',
    match: 92,
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    description: 'Build responsive merchant checkout experiences and transaction monitoring applications with exceptional reliability.'
  },
  {
    id: 'job-3',
    title: 'Machine Learning Research Intern',
    company: 'Microsoft Research',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    location: 'Hyderabad (Hybrid)',
    type: 'Internship',
    category: 'ai',
    salary: '₹60,000 / month',
    match: 88,
    tags: ['Python', 'PyTorch', 'LLMs'],
    description: 'Work alongside research scientists on neural evaluation benchmarks, agentic models, and mathematical reasoning.'
  },
  {
    id: 'job-4',
    title: 'Cloud DevOps & Platform Engineer',
    company: 'Atlassian',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    location: 'Remote',
    type: 'Full-time',
    category: 'cloud',
    salary: '₹16 - ₹22 LPA',
    match: 86,
    tags: ['Kubernetes', 'Docker', 'AWS'],
    description: 'Automate build pipelines, maintain cloud infrastructure clusters, and boost developer release velocity.'
  }
];

function renderJobs(list) {
  const container = document.getElementById('jobs-container');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<div class="card" style="text-align: center; padding: 3rem;">
      <h3>No jobs match your filter criteria</h3>
      <p style="color: #64748B; margin-top: 0.5rem;">Try adjusting your keywords or clearing the category filter.</p>
    </div>`;
    return;
  }

  container.innerHTML = list.map(job => `
    <div class="job-card-item" onclick="openJobDetail('${job.id}')">
      <div class="job-info-left">
        <img src="${job.logo}" alt="${job.company}" class="company-logo">
        <div class="job-meta">
          <h3>${job.title}</h3>
          <div class="job-submeta">
            <strong>${job.company}</strong>
            <span>📍 ${job.location}</span>
            <span>⏱️ ${job.type}</span>
          </div>
          <div class="job-tags">
            ${job.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="job-info-right">
        <span class="salary-tag">${job.salary}</span>
        <span class="match-pill">${job.match}% Cue Match</span>
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); openJobDetail('${job.id}')">Quick View &rarr;</button>
      </div>
    </div>
  `).join('');
}

function filterJobs() {
  const query = (document.getElementById('job-search-input')?.value || '').toLowerCase();
  const selectedType = document.getElementById('filter-type')?.value || 'all';
  const selectedCat = document.querySelector('input[name="cat"]:checked')?.value || 'all';
  const highMatch = document.getElementById('high-match-only')?.checked || false;

  const filtered = jobsData.filter(j => {
    const matchesQuery = j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query) || j.tags.some(t => t.toLowerCase().includes(query));
    const matchesType = selectedType === 'all' || j.type === selectedType;
    const matchesCat = selectedCat === 'all' || j.category === selectedCat;
    const matchesScore = !highMatch || j.match >= 90;
    return matchesQuery && matchesType && matchesCat && matchesScore;
  });

  renderJobs(filtered);
}

function openJobDetail(id) {
  const job = jobsData.find(j => j.id === id);
  if (!job) return;

  const modal = document.getElementById('job-modal');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
      <img src="${job.logo}" alt="${job.company}" class="company-logo">
      <div>
        <h2 style="font-size: 1.5rem; margin-bottom: 0.25rem;">${job.title}</h2>
        <p style="color: #64748B;">${job.company} &bull; ${job.location}</p>
      </div>
    </div>

    <div style="background: #F8FAFC; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; justify-content: space-between;">
      <div>
        <span style="font-size: 0.8rem; color: #64748B;">Compensation</span>
        <div style="font-weight: 700; font-size: 1.1rem;">${job.salary}</div>
      </div>
      <div>
        <span style="font-size: 0.8rem; color: #64748B;">Career Cue Alignment</span>
        <div style="font-weight: 700; color: #10B981;">${job.match}% High Compatibility</div>
      </div>
    </div>

    <h4 style="margin-bottom: 0.5rem;">Role Overview</h4>
    <p style="color: #334155; line-height: 1.6; margin-bottom: 1.5rem;">${job.description}</p>

    <div style="border-top: 1px solid #E2E8F0; padding-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
      <button class="btn btn-outline" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" onclick="submitApplication('${job.company}', '${job.title}')">Submit 1-Click FastTrack Application &rarr;</button>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('job-modal').style.display = 'none';
}

function submitApplication(company, title) {
  alert(`🎉 Application for ${title} at ${company} submitted successfully! Added to your CareerCue Application Tracker.`);
  closeModal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderJobs(jobsData);
});
