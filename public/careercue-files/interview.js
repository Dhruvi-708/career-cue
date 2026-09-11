// interview.js
const questionsBank = {
  frontend: {
    badge: 'Frontend Engineer',
    text: 'Explain the Virtual DOM in React, and how React reconciles state updates into browser DOM changes?',
    hint: 'Focus on reconciliation, diffing heuristic O(n), Fiber architecture, and render batching.',
    sample: 'React keeps an in-memory representation of UI known as the Virtual DOM. When state or props change, React runs a heuristic diffing algorithm to calculate minimal updates and batches real DOM operations to prevent layout thrashing.'
  },
  backend: {
    badge: 'Backend Distributed Systems',
    text: 'How would you architect a distributed rate-limiter for a payment API handling 50,000 requests per second across multiple data centers?',
    hint: 'Discuss Token Bucket or Sliding Window Log algorithms, Redis cluster with Lua scripts, and local rate-limit approximations.',
    sample: 'I would implement a Sliding Window Counter algorithm using Redis and Lua scripting for atomic decrements. To avoid cross-region latency, regional Redis instances can synchronize tokens asynchronously.'
  },
  fullstack: {
    badge: 'Full-Stack Developer',
    text: 'How do you safeguard user authentication across client SPAs and REST APIs against XSS and CSRF attacks?',
    hint: 'Contrast localStorage vs httpOnly SameSite cookies, CSRF tokens, Content Security Policy (CSP), and JWT rotation.',
    sample: 'Store authentication refresh tokens in httpOnly, SameSite=Strict, Secure cookies to prevent JavaScript XSS access. Use short-lived memory access tokens and enforce a strict CSP.'
  },
  product: {
    badge: 'Product & Behavioral',
    text: 'Tell me about a time you had a technical disagreement with a team member. How did you resolve it objectively?',
    hint: 'Use the STAR format (Situation, Task, Action, Result). Emphasize data-driven benchmarks over ego.',
    sample: 'During a database migration debate between MongoDB and PostgreSQL, our team was divided. I initiated a 2-day benchmark testing our top 3 query workloads with realistic volumes. The data showed Postgres delivered 40% lower p99 latency, building unanimous consensus.'
  }
};

let activeRole = 'frontend';
let isRecording = false;

function switchRole(role, btnElement) {
  activeRole = role;
  document.querySelectorAll('.role-pill').forEach(el => el.classList.remove('active'));
  btnElement.classList.add('active');

  const data = questionsBank[role];
  document.getElementById('q-role-badge').textContent = data.badge;
  document.getElementById('q-text').textContent = data.text;
  document.getElementById('q-hint-text').textContent = data.hint;
  document.getElementById('answer-input').value = '';
  document.getElementById('feedback-panel').style.display = 'none';
}

function toggleVoiceSim() {
  const status = document.getElementById('rec-status');
  const btn = document.getElementById('btn-voice');
  const input = document.getElementById('answer-input');

  if (!isRecording) {
    isRecording = true;
    status.style.display = 'flex';
    btn.textContent = '⏹️ Stop Recording';
    btn.style.borderColor = '#EF4444';
    btn.style.color = '#EF4444';

    // Simulated speech transcription streaming
    const sampleText = questionsBank[activeRole].sample;
    let idx = 0;
    input.value = '';
    const interval = setInterval(() => {
      if (!isRecording || idx >= sampleText.length) {
        clearInterval(interval);
        if (isRecording) toggleVoiceSim();
      } else {
        input.value += sampleText.slice(idx, idx + 8);
        idx += 8;
      }
    }, 90);
  } else {
    isRecording = false;
    status.style.display = 'none';
    btn.textContent = '🎙️ Simulate Voice Input';
    btn.style.borderColor = '';
    btn.style.color = '';
  }
}

function evaluateAnswer() {
  const input = document.getElementById('answer-input').value.trim();
  if (!input) {
    alert('Please enter or record an answer first to evaluate.');
    return;
  }

  const panel = document.getElementById('feedback-panel');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth' });
}

function loadNextQuestion() {
  const roles = Object.keys(questionsBank);
  const next = roles[(roles.indexOf(activeRole) + 1) % roles.length];
  const btn = Array.from(document.querySelectorAll('.role-pill')).find(b => b.textContent.toLowerCase().includes(next.slice(0, 4)));
  if (btn) {
    switchRole(next, btn);
  }
}
