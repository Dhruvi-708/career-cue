// mentors.js
const mentorsList = [
  {
    id: 'm-1',
    name: 'Ananya Sharma',
    title: 'Staff Software Engineer',
    company: 'Google',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 4.96,
    reviews: 142,
    specialties: ['System Design', 'FAANG DSA Prep', 'Resume Polish'],
    rate: 'Free Community Session',
    bio: 'Ex-Amazon, currently building distributed query engines at Google. Helped 80+ candidates crack SDE-1 and SDE-2 interviews.'
  },
  {
    id: 'm-2',
    name: 'Rohan Mehra',
    title: 'Engineering Manager',
    company: 'Microsoft',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 4.92,
    reviews: 98,
    specialties: ['Full Stack Careers', 'Behavioral Leadership', 'Offer Negotiation'],
    rate: 'Free Community Session',
    bio: '10+ years in tech leadership. Passionate about guiding first-generation college graduates into high-impact software careers.'
  },
  {
    id: 'm-3',
    name: 'Pooja Iyer',
    title: 'Senior Product Designer',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    rating: 4.98,
    reviews: 115,
    specialties: ['Portfolio Reviews', 'UI/UX Craft', 'Case Study Strategy'],
    rate: 'Free Community Session',
    bio: 'Crafting global payment experiences. I will review your Figma case studies line by line and sharpen your storytelling.'
  },
  {
    id: 'm-4',
    name: 'Karthik Subramanian',
    title: 'Lead AI Scientist',
    company: 'Uber',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 4.89,
    reviews: 84,
    specialties: ['ML Systems', 'Python & Math', 'Research to Industry'],
    rate: 'Free Community Session',
    bio: 'Specialized in real-time dispatch algorithms and LLM fine-tuning. Mentored 40+ master’s and bachelor’s students into AI research labs.'
  }
];

function renderMentors() {
  const container = document.getElementById('mentors-list');
  if (!container) return;

  container.innerHTML = mentorsList.map(m => `
    <div class="mentor-card">
      <img src="${m.avatar}" alt="${m.name}" class="mentor-avatar">
      <h3>${m.name}</h3>
      <div class="mentor-role">${m.title}</div>
      <div class="mentor-company">${m.company}</div>
      <div class="mentor-rating">★ ${m.rating} (${m.reviews} reviews)</div>
      <p class="mentor-bio">${m.bio}</p>
      
      <div class="specialty-tags">
        ${m.specialties.map(s => `<span class="spec-tag">${s}</span>`).join('')}
      </div>

      <div class="mentor-footer">
        <span class="mentor-rate">${m.rate}</span>
        <button class="btn btn-primary btn-sm" onclick="openBookingModal('${m.id}')">Book 1-on-1 &rarr;</button>
      </div>
    </div>
  `).join('');
}

function openBookingModal(mentorId) {
  const m = mentorsList.find(item => item.id === mentorId);
  if (!m) return;

  const modal = document.getElementById('booking-modal');
  const content = document.getElementById('booking-content');

  content.innerHTML = `
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
      <img src="${m.avatar}" alt="${m.name}" style="width: 54px; height: 54px; border-radius: 50%; object-fit: cover;">
      <div>
        <h2 style="font-size: 1.35rem; margin-bottom: 0.2rem;">Book Session with ${m.name}</h2>
        <p style="color: #64748B; font-size: 0.85rem;">${m.title} at ${m.company}</p>
      </div>
    </div>

    <div class="form-group" style="margin-bottom: 1rem;">
      <label style="display: block; font-weight: 600; margin-bottom: 0.35rem;">Select Topic</label>
      <select id="book-topic" class="form-control">
        <option>Mock Coding & Algorithm Interview (45 min)</option>
        <option>System Design Architecture Review (45 min)</option>
        <option>Resume & Portfolio Deep-Dive (30 min)</option>
        <option>General Career Transition & FAANG Strategy (30 min)</option>
      </select>
    </div>

    <div class="form-group" style="margin-bottom: 1.5rem;">
      <label style="display: block; font-weight: 600; margin-bottom: 0.35rem;">Preferred Slot</label>
      <select id="book-slot" class="form-control">
        <option>Tomorrow, 6:00 PM - 6:45 PM IST</option>
        <option>Saturday, 11:00 AM - 11:45 AM IST</option>
        <option>Sunday, 4:00 PM - 4:45 PM IST</option>
      </select>
    </div>

    <div style="border-top: 1px solid #E2E8F0; padding-top: 1.25rem; display: flex; justify-content: flex-end; gap: 1rem;">
      <button class="btn btn-outline" onclick="closeBookingModal()">Cancel</button>
      <button class="btn btn-primary" onclick="confirmBooking('${m.name}')">Confirm Free Booking &rarr;</button>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeBookingModal() {
  document.getElementById('booking-modal').style.display = 'none';
}

function confirmBooking(mentorName) {
  alert(`📅 Success! Your 1-on-1 session with ${mentorName} has been booked! Calendar invite sent to your email.`);
  closeBookingModal();
}

document.addEventListener('DOMContentLoaded', () => {
  renderMentors();
});
