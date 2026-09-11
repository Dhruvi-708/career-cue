// dashboard.js
let applications = [
  {
    id: 'app-1',
    company: 'Microsoft Research',
    role: 'Machine Learning Intern',
    status: 'Applied',
    date: 'Sep 08, 2026',
    salary: '₹60k/mo'
  },
  {
    id: 'app-2',
    company: 'Razorpay',
    role: 'Frontend React Developer',
    status: 'Screening',
    date: 'Sep 05, 2026',
    salary: '₹16 LPA'
  },
  {
    id: 'app-3',
    company: 'Google',
    role: 'Associate Software Engineer',
    status: 'Technical',
    date: 'Sep 02, 2026',
    salary: '₹22 LPA'
  },
  {
    id: 'app-4',
    company: 'CRED',
    role: 'Junior UI/UX Designer',
    status: 'Offer',
    date: 'Aug 28, 2026',
    salary: '₹15 LPA'
  }
];

function renderKanban() {
  const cols = {
    Applied: document.getElementById('col-applied'),
    Screening: document.getElementById('col-screening'),
    Technical: document.getElementById('col-technical'),
    Offer: document.getElementById('col-offer')
  };

  // Reset
  Object.values(cols).forEach(c => { if(c) c.innerHTML = ''; });

  const counts = { Applied: 0, Screening: 0, Technical: 0, Offer: 0 };

  applications.forEach(app => {
    counts[app.status] = (counts[app.status] || 0) + 1;
    const targetCol = cols[app.status];
    if (!targetCol) return;

    const card = document.createElement('div');
    card.className = 'kanban-item';
    card.innerHTML = `
      <div class="item-company">${app.company}</div>
      <div class="item-role">${app.role}</div>
      <div class="item-meta">
        <span>📅 ${app.date}</span> &bull; 
        <span>💰 ${app.salary || 'Competitive'}</span>
      </div>
      <div class="item-actions">
        ${app.status !== 'Applied' ? `<button class="btn-move" onclick="moveApp('${app.id}', 'prev')">&larr;</button>` : ''}
        ${app.status !== 'Offer' ? `<button class="btn-move" onclick="moveApp('${app.id}', 'next')">&rarr;</button>` : ''}
      </div>
    `;
    targetCol.appendChild(card);
  });

  // Update counts
  if (document.getElementById('count-applied')) document.getElementById('count-applied').textContent = counts.Applied;
  if (document.getElementById('count-screening')) document.getElementById('count-screening').textContent = counts.Screening;
  if (document.getElementById('count-technical')) document.getElementById('count-technical').textContent = counts.Technical;
  if (document.getElementById('count-offer')) document.getElementById('count-offer').textContent = counts.Offer;
  if (document.getElementById('stat-total')) document.getElementById('stat-total').textContent = applications.length;
}

const stages = ['Applied', 'Screening', 'Technical', 'Offer'];

function moveApp(id, direction) {
  const app = applications.find(a => a.id === id);
  if (!app) return;

  const curIdx = stages.indexOf(app.status);
  if (direction === 'next' && curIdx < stages.length - 1) {
    app.status = stages[curIdx + 1];
  } else if (direction === 'prev' && curIdx > 0) {
    app.status = stages[curIdx - 1];
  }
  renderKanban();
}

function openNewAppModal() {
  document.getElementById('add-modal').style.display = 'flex';
}

function closeNewAppModal() {
  document.getElementById('add-modal').style.display = 'none';
}

function saveNewApplication() {
  const company = document.getElementById('add-company').value.trim();
  const role = document.getElementById('add-role').value.trim();
  const status = document.getElementById('add-status').value;
  const salary = document.getElementById('add-salary').value.trim();

  if (!company || !role) {
    alert('Please provide at least company name and role.');
    return;
  }

  applications.unshift({
    id: 'app-' + Date.now(),
    company,
    role,
    status,
    salary: salary || 'Industry Standard',
    date: 'Just now'
  });

  closeNewAppModal();
  renderKanban();
  alert(`Added ${role} at ${company} to your CareerCue tracker!`);
}

document.addEventListener('DOMContentLoaded', () => {
  renderKanban();
});
