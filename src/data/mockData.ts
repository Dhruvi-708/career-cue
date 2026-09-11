import { Job, Mentor, InterviewQuestion, ApplicationItem } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Associate Software Engineer',
    company: 'Google',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    salary: '₹18 - ₹24 LPA',
    experience: '0-2 years',
    tags: ['Java', 'Go', 'Distributed Systems', 'GCP'],
    description: 'Join the Core Infrastructure team to develop scalable backend microservices, automate distributed workflows, and build resilient cloud systems serving millions.',
    requirements: [
      'Bachelor’s or Master’s in Computer Science or related STEM field',
      'Strong grasp of Data Structures, Algorithms, and System Design basics',
      'Proficiency in Java, C++, Python, or Go'
    ],
    postedAt: '2 days ago',
    cueMatch: 95,
    featured: true
  },
  {
    id: 'job-2',
    title: 'Frontend React Developer',
    company: 'Razorpay',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹14 - ₹19 LPA',
    experience: '1-3 years',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    description: 'Craft high-performance, accessible checkout interfaces and merchant dashboards that handle millions of seamless real-time transactions daily.',
    requirements: [
      'Proven experience building production-grade web applications in React & TypeScript',
      'Deep understanding of browser performance optimization, Web Vitals, and responsive UI',
      'Eye for design and pixel-perfect design system translation'
    ],
    postedAt: '1 day ago',
    cueMatch: 92,
    featured: true
  },
  {
    id: 'job-3',
    title: 'Machine Learning Research Intern',
    company: 'Microsoft Research',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    location: 'Hyderabad, India (Hybrid)',
    type: 'Internship',
    salary: '₹60,000 / month',
    experience: 'Fresher / Final Year',
    tags: ['Python', 'PyTorch', 'NLP', 'LLMs'],
    description: 'Work alongside principal scientists on multimodal AI reasoning, fine-tuning large language models, and developing novel evaluation benchmarks.',
    requirements: [
      'Strong foundation in linear algebra, statistics, and deep learning architectures',
      'Hands-on experience with PyTorch, Hugging Face Transformers, or JAX',
      'Prior academic papers or open-source ML contributions are a major plus'
    ],
    postedAt: '3 days ago',
    cueMatch: 88,
    featured: false
  },
  {
    id: 'job-4',
    title: 'Cloud DevOps & Platform Engineer',
    company: 'Atlassian',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    location: 'Remote',
    type: 'Full-time',
    salary: '₹16 - ₹22 LPA',
    experience: '1-3 years',
    tags: ['Kubernetes', 'Docker', 'Terraform', 'AWS'],
    description: 'Architect automated CI/CD deployment pipelines, manage container clusters on Kubernetes, and ensure 99.99% availability for enterprise tooling.',
    requirements: [
      'Experience in Linux containerization and infrastructure as code (Terraform/Ansible)',
      'Familiarity with AWS/GCP cloud networking and monitoring (Prometheus, Datadog)',
      'Passionate about site reliability engineering and developer velocity'
    ],
    postedAt: '4 days ago',
    cueMatch: 86,
    featured: false
  },
  {
    id: 'job-5',
    title: 'Product Management Fellow',
    company: 'Swiggy',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore, India',
    type: 'Internship',
    salary: '₹45,000 / month',
    experience: 'Fresher',
    tags: ['Product Strategy', 'SQL', 'User Research', 'A/B Testing'],
    description: 'Partner with engineering and UX teams to define product specifications, analyze cohort retention funnels, and test growth experiments in hyper-local delivery.',
    requirements: [
      'Exceptional analytical mindset with working knowledge of SQL and product analytics',
      'Strong empathy for consumer problems and clear written communication',
      'Ability to translate ambiguous user pain points into crisp PRDs'
    ],
    postedAt: '5 days ago',
    cueMatch: 79,
    featured: false
  },
  {
    id: 'job-6',
    title: 'Junior UI/UX Designer',
    company: 'CRED',
    logo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100&auto=format&fit=crop&q=80',
    location: 'Bangalore (Onsite)',
    type: 'Full-time',
    salary: '₹12 - ₹16 LPA',
    experience: '0-2 years',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Micro-interactions'],
    description: 'Design distinctive, high-craft mobile and web experiences that reward top financial behaviors with premium aesthetics and delight.',
    requirements: [
      'Strong portfolio showcasing mobile app design, visual hierarchy, and wireframing',
      'High mastery of Figma component libraries and motion prototyping',
      'Obsession with micro-interactions and typographic finesse'
    ],
    postedAt: 'Just now',
    cueMatch: 91,
    featured: true
  }
];

export const MENTORS_LIST: Mentor[] = [
  {
    id: 'm-1',
    name: 'Ananya Sharma',
    title: 'Staff Software Engineer',
    company: 'Google',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 4.96,
    reviewsCount: 142,
    specialties: ['System Design', 'FAANG DSA Prep', 'Resume Polish'],
    hourlyRate: 'Free Community Session',
    availableDays: ['Mon', 'Wed', 'Sat'],
    bio: 'Ex-Amazon, currently building distributed query engines at Google. Helped 80+ candidates crack SDE-1 and SDE-2 interviews.'
  },
  {
    id: 'm-2',
    name: 'Rohan Mehra',
    title: 'Engineering Manager',
    company: 'Microsoft',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 4.92,
    reviewsCount: 98,
    specialties: ['Full Stack Careers', 'Behavioral Leadership', 'Offer Negotiation'],
    hourlyRate: 'Free Community Session',
    availableDays: ['Tue', 'Thu', 'Sun'],
    bio: '10+ years in tech leadership. Passionate about guiding first-generation college graduates into high-impact software careers.'
  },
  {
    id: 'm-3',
    name: 'Pooja Iyer',
    title: 'Senior Product Designer',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    rating: 4.98,
    reviewsCount: 115,
    specialties: ['Portfolio Reviews', 'UI/UX Craft', 'Case Study Strategy'],
    hourlyRate: 'Free Community Session',
    availableDays: ['Fri', 'Sat'],
    bio: 'Crafting global payment experiences. I will review your Figma case studies line by line and sharpen your storytelling.'
  },
  {
    id: 'm-4',
    name: 'Karthik Subramanian',
    title: 'Lead AI & ML Scientist',
    company: 'Uber',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 4.89,
    reviewsCount: 84,
    specialties: ['ML Systems', 'Python & Math', 'Research to Industry'],
    hourlyRate: 'Free Community Session',
    availableDays: ['Mon', 'Wed', 'Fri'],
    bio: 'Specialized in real-time dispatch algorithms and LLM fine-tuning. Mentored 40+ master’s and bachelor’s students into AI research labs.'
  }
];

export const INITIAL_MENTORS: Mentor[] = MENTORS_LIST;

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq-1',
    role: 'Frontend Developer',
    difficulty: 'Intermediate',
    question: 'Can you explain the Virtual DOM in React, and how React reconciles state updates into browser DOM changes?',
    cueHint: 'Focus on reconciliation, diffing algorithm (O(n) heuristics), Fiber architecture, and batching.',
    sampleAnswer: 'React maintains a lightweight in-memory representation of the UI called the Virtual DOM. When state changes, React builds a new Virtual DOM tree, calculates the minimal set of differences (diffing heuristic), and batches the efficient mutation to the real browser DOM to avoid expensive layout thrashing.'
  },
  {
    id: 'iq-2',
    role: 'Backend Developer',
    difficulty: 'Intermediate',
    question: 'How do you design a high-throughput URL shortener like bit.ly? How do you prevent hash collisions and ensure fast lookups?',
    cueHint: 'Mention Base62 encoding, distributed counter/Snowflake IDs, Redis caching layer, and database sharding.',
    sampleAnswer: 'Instead of hashing URLs which risks collisions, generate unique 64-bit integer IDs (e.g. using Twitter Snowflake) and encode them into Base62 characters ([a-zA-Z0-9]). Use Redis as an in-memory LRU cache for 80% read traffic and persist URL pairs in a partitioned key-value or NoSQL store.'
  },
  {
    id: 'iq-3',
    role: 'Full Stack Engineer',
    difficulty: 'Beginner',
    question: 'What is the difference between SQL and NoSQL databases, and how do you choose between them for an e-commerce checkout vs a social feed?',
    cueHint: 'Compare ACID compliance vs eventual consistency, relational schema constraints vs flexible document structures.',
    sampleAnswer: 'SQL provides strict schemas and ACID transactional guarantees essential for financial balance changes in e-commerce checkout. NoSQL databases (like MongoDB or Cassandra) offer horizontal scale and flexible schemas, ideal for high-volume unstructured social media feeds.'
  },
  {
    id: 'iq-4',
    role: 'Product Manager',
    difficulty: 'Advanced',
    question: 'If you were leading CareerCue and user retention dropped by 15% after their first resume analysis, how would you diagnose and fix it?',
    cueHint: 'Break problem into funnel analysis, user segmentation, qualitative user interviews, and targeted onboarding cues.',
    sampleAnswer: 'First segment data by user source and device to isolate anomalies. Examine drop-off points: did they receive their score and leave, or did they find the recommendations unclear? Run 10 rapid user interviews. If actionable next steps are lacking, introduce an immediate 1-click "Fix This Bullet with AI" cue right beside each low score.'
  }
];

export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'app-1',
    jobTitle: 'Associate Software Engineer',
    company: 'Google',
    appliedDate: 'Sep 02, 2026',
    status: 'Technical',
    stageNote: 'Round 2 DSA & Problem Solving scheduled for Friday 3:00 PM',
    salary: '₹22 LPA'
  },
  {
    id: 'app-2',
    jobTitle: 'Frontend React Developer',
    company: 'Razorpay',
    appliedDate: 'Sep 05, 2026',
    status: 'Screening',
    stageNote: 'Recruiter reviewed profile; awaiting machine coding round invite',
    salary: '₹16 LPA'
  },
  {
    id: 'app-3',
    jobTitle: 'Junior UI/UX Designer',
    company: 'CRED',
    appliedDate: 'Aug 28, 2026',
    status: 'Offer',
    stageNote: 'Official Offer Letter received! Reviewing compensation package.',
    salary: '₹15 LPA'
  },
  {
    id: 'app-4',
    jobTitle: 'Machine Learning Intern',
    company: 'Microsoft Research',
    appliedDate: 'Sep 08, 2026',
    status: 'Applied',
    stageNote: 'Application submitted via CareerCue 1-Click FastTrack',
    salary: '₹60k/mo'
  }
];
