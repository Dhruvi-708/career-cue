// Initial seed data aligned with PostgreSQL schema for CareerCue

export const INITIAL_CANDIDATE_ID = "c0a80101-0000-4000-8000-000000000001";
export const INITIAL_COMPANY_GOOGLE_ID = "b0a80101-0000-4000-8000-000000000001";
export const INITIAL_COMPANY_RAZORPAY_ID = "b0a80101-0000-4000-8000-000000000002";
export const INITIAL_COMPANY_CRED_ID = "b0a80101-0000-4000-8000-000000000003";
export const INITIAL_COMPANY_MICROSOFT_ID = "b0a80101-0000-4000-8000-000000000004";
export const INITIAL_INSTITUTION_IITB_ID = "d0a80101-0000-4000-8000-000000000001";
export const INITIAL_INSTITUTION_BITS_ID = "d0a80101-0000-4000-8000-000000000002";

export const INITIAL_DATABASE_STATE = {
  companies: [
    {
      company_id: INITIAL_COMPANY_GOOGLE_ID,
      legal_name: "Google India Private Limited",
      display_name: "Google",
      registration_number: "U72900KA2003PTC033028",
      industry: "Technology & Cloud Computing",
      company_size: "1000+",
      headquarters_location: "Bengaluru, Karnataka, India",
      website: "https://careers.google.com",
      founded_year: 1998,
      verification_status: "Verified",
      recruiter_tier: "Enterprise",
      about: "Google's mission is to organize the world's information and make it universally accessible and useful.",
      created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
      updated_at: new Date("2024-01-01T00:00:00Z").toISOString()
    },
    {
      company_id: INITIAL_COMPANY_RAZORPAY_ID,
      legal_name: "Razorpay Software Private Limited",
      display_name: "Razorpay",
      registration_number: "U72200KA2013PTC097320",
      industry: "Fintech & Payments",
      company_size: "501-1000",
      headquarters_location: "Bengaluru, Karnataka, India",
      website: "https://razorpay.com/jobs",
      founded_year: 2014,
      verification_status: "Verified",
      recruiter_tier: "Enterprise",
      about: "Razorpay powers modern payment gateway and banking infrastructure for thousands of businesses across India.",
      created_at: new Date("2024-01-05T00:00:00Z").toISOString(),
      updated_at: new Date("2024-01-05T00:00:00Z").toISOString()
    },
    {
      company_id: INITIAL_COMPANY_CRED_ID,
      legal_name: "Dreamplug Technologies Private Limited",
      display_name: "CRED",
      registration_number: "U74999KA2018PTC112345",
      industry: "Consumer Tech & Fintech",
      company_size: "501-1000",
      headquarters_location: "Bengaluru, Karnataka, India",
      website: "https://cred.club/careers",
      founded_year: 2018,
      verification_status: "Verified",
      recruiter_tier: "Premium",
      about: "CRED rewards creditworthy individuals with exclusive experiences and financial services.",
      created_at: new Date("2024-01-10T00:00:00Z").toISOString(),
      updated_at: new Date("2024-01-10T00:00:00Z").toISOString()
    },
    {
      company_id: INITIAL_COMPANY_MICROSOFT_ID,
      legal_name: "Microsoft India R&D Private Limited",
      display_name: "Microsoft",
      registration_number: "U72200TG1998PTC029471",
      industry: "Enterprise Software & Cloud",
      company_size: "1000+",
      headquarters_location: "Hyderabad, Telangana, India",
      website: "https://careers.microsoft.com",
      founded_year: 1975,
      verification_status: "Verified",
      recruiter_tier: "Enterprise",
      about: "Empowering every person and organization on the planet to achieve more.",
      created_at: new Date("2024-01-12T00:00:00Z").toISOString(),
      updated_at: new Date("2024-01-12T00:00:00Z").toISOString()
    }
  ],

  candidate_profiles: [
    {
      candidate_id: INITIAL_CANDIDATE_ID,
      external_student_ref: "a0a80101-0000-4000-8000-000000000001",
      full_name: "Jainil Shah",
      email: "jainil26.shah@gmail.com",
      phone: "+91 98765 43210",
      current_title_or_program: "B.Tech Computer Science (Final Year)",
      resume_url: "https://careercue.app/resumes/jainil-shah.pdf",
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Next.js", "Docker", "Tailwind CSS"],
      cgpa: 8.92,
      source: "Platform Sync",
      created_at: new Date("2024-01-01T00:00:00Z").toISOString()
    },
    {
      candidate_id: "c0a80101-0000-4000-8000-000000000002",
      external_student_ref: "a0a80101-0000-4000-8000-000000000002",
      full_name: "Ananya Deshmukh",
      email: "ananya.d@iitb.ac.in",
      phone: "+91 98123 45678",
      current_title_or_program: "M.Tech Distributed Systems (Year 2)",
      resume_url: "https://careercue.app/resumes/ananya-deshmukh.pdf",
      skills: ["Go", "Kafka", "Kubernetes", "Distributed Systems", "C++"],
      cgpa: 9.45,
      source: "Campus Placement Portal",
      created_at: new Date("2024-01-10T00:00:00Z").toISOString()
    },
    {
      candidate_id: "c0a80101-0000-4000-8000-000000000003",
      external_student_ref: "a0a80101-0000-4000-8000-000000000003",
      full_name: "Rohan Varma",
      email: "rohan.varma@bits-pilani.ac.in",
      phone: "+91 97234 56789",
      current_title_or_program: "B.E. Computer Science (3rd Year)",
      resume_url: "https://careercue.app/resumes/rohan-varma.pdf",
      skills: ["Python", "PyTorch", "Data Science", "SQL", "FastAPI"],
      cgpa: 8.60,
      source: "Direct Referral",
      created_at: new Date("2024-01-18T00:00:00Z").toISOString()
    },
    {
      candidate_id: "c0a80101-0000-4000-8000-000000000004",
      external_student_ref: "a0a80101-0000-4000-8000-000000000004",
      full_name: "Meera Krishnan",
      email: "meera.k@iiitd.ac.in",
      phone: "+91 99345 67890",
      current_title_or_program: "B.Tech Information Technology (Final Year)",
      resume_url: "https://careercue.app/resumes/meera-krishnan.pdf",
      skills: ["React Native", "Swift", "Mobile Architecture", "GraphQL"],
      cgpa: 9.10,
      source: "Hackathon Winner",
      created_at: new Date("2024-01-25T00:00:00Z").toISOString()
    }
  ],

  student_resume_details: [
    {
      resume_detail_id: "r0a80101-0000-4000-8000-000000000001",
      candidate_id: INITIAL_CANDIDATE_ID,
      phone_number: "+91 98765 43210",
      location_city: "Bengaluru",
      location_country: "India",
      headline: "Full-Stack Software Engineer & Distributed Systems Enthusiast",
      summary_bio: "Motivated engineer with strong fundamentals in TypeScript, React, distributed services, and Postgres databases. Built high-traffic web tools handling 20k+ daily queries.",
      website_url: "https://jainil.dev",
      linkedin_url: "https://linkedin.com/in/jainil-shah",
      github_url: "https://github.com/jainilshah",
      education: [
        {
          degree: "B.Tech in Computer Science and Engineering",
          institution: "Indian Institute of Technology",
          startYear: "2021",
          endYear: "2025",
          gpa: "8.92/10.0"
        }
      ],
      work_experience: [
        {
          role: "Software Engineering Intern",
          company: "Nexus Labs",
          startDate: "May 2024",
          endDate: "Aug 2024",
          highlights: [
            "Architected low-latency microservice with Node.js and Redis, reducing P99 latency by 38%",
            "Spearheaded React 19 migration, reducing bundle size by 24% across 12 modules",
            "Authored 85+ automated integration test suites achieving 94% code coverage"
          ]
        }
      ],
      certifications: [
        { name: "AWS Certified Solutions Architect - Associate", date: "2024" },
        { name: "Meta Professional Frontend Developer", date: "2023" }
      ],
      extracurriculars: [
        { activity: "Core Lead, Developer Student Club (350+ members organized hackathons)" }
      ],
      languages_spoken: ["English", "Hindi", "Gujarati"],
      resume_file_url: "https://careercue.app/resumes/jainil-shah.pdf",
      parsed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],

  student_skills: [
    {
      skill_id: "s0a80101-0000-4000-8000-000000000001",
      candidate_id: INITIAL_CANDIDATE_ID,
      skill_name: "React & Next.js",
      category: "Framework",
      proficiency_level: "Advanced",
      verification_status: "Verified_By_Project",
      confidence_score: 95.0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      skill_id: "s0a80101-0000-4000-8000-000000000002",
      candidate_id: INITIAL_CANDIDATE_ID,
      skill_name: "TypeScript",
      category: "Technical",
      proficiency_level: "Advanced",
      verification_status: "Verified_By_Project",
      confidence_score: 92.0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      skill_id: "s0a80101-0000-4000-8000-000000000003",
      candidate_id: INITIAL_CANDIDATE_ID,
      skill_name: "PostgreSQL & SQL Schema",
      category: "Technical",
      proficiency_level: "Intermediate",
      verification_status: "Assessed",
      confidence_score: 88.0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      skill_id: "s0a80101-0000-4000-8000-000000000004",
      candidate_id: INITIAL_CANDIDATE_ID,
      skill_name: "System Design & REST APIs",
      category: "Domain_Knowledge",
      proficiency_level: "Intermediate",
      verification_status: "Assessed",
      confidence_score: 86.0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      skill_id: "s0a80101-0000-4000-8000-000000000005",
      candidate_id: INITIAL_CANDIDATE_ID,
      skill_name: "Docker & Containerization",
      category: "Tool",
      proficiency_level: "Intermediate",
      verification_status: "Self_Reported",
      confidence_score: 80.0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],

  student_portfolio_projects: [
    {
      project_id: "p0a80101-0000-4000-8000-000000000001",
      candidate_id: INITIAL_CANDIDATE_ID,
      title: "CareerCue Career Operating System",
      summary: "Full-stack career navigation platform built with React, TypeScript, Express, and PostgreSQL relational data layer with ATS scanner and mock interview engine.",
      repository_url: "https://github.com/jainilshah/careercue-platform",
      live_demo_url: "https://careercue.app",
      tech_stack: ["React", "TypeScript", "PostgreSQL", "Express", "Tailwind CSS"],
      verification_type: "GitHub_Synced",
      is_featured: true,
      created_at: new Date("2024-02-01T00:00:00Z").toISOString(),
      updated_at: new Date("2024-02-01T00:00:00Z").toISOString()
    },
    {
      project_id: "p0a80101-0000-4000-8000-000000000002",
      candidate_id: INITIAL_CANDIDATE_ID,
      title: "Distributed Task Scheduler & Queue",
      summary: "Resilient asynchronous job queue engine built in Node.js and Redis featuring exponential backoff retries and real-time WebSocket telemetry.",
      repository_url: "https://github.com/jainilshah/distributed-queue-engine",
      live_demo_url: "https://queue.jainil.dev",
      tech_stack: ["Node.js", "Redis", "TypeScript", "Docker"],
      verification_type: "GitHub_Synced",
      is_featured: true,
      created_at: new Date("2024-01-15T00:00:00Z").toISOString(),
      updated_at: new Date("2024-01-15T00:00:00Z").toISOString()
    }
  ],

  student_external_analyses: [
    {
      analysis_id: "e0a80101-0000-4000-8000-000000000001",
      candidate_id: INITIAL_CANDIDATE_ID,
      platform: "GitHub",
      profile_url: "https://github.com/jainilshah",
      parsed_metrics: {
        public_repos: 28,
        total_stars: 184,
        contributions_last_year: 540,
        longest_streak_days: 42
      },
      top_languages: ["TypeScript", "JavaScript", "Python", "SQL"],
      authenticity_score: 94.5,
      last_synced_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    },
    {
      analysis_id: "e0a80101-0000-4000-8000-000000000002",
      candidate_id: INITIAL_CANDIDATE_ID,
      platform: "LeetCode",
      profile_url: "https://leetcode.com/u/jainilshah",
      parsed_metrics: {
        solved_total: 412,
        easy: 150,
        medium: 220,
        hard: 42,
        contest_rating: 1880
      },
      top_languages: ["TypeScript", "C++"],
      authenticity_score: 98.0,
      last_synced_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    }
  ],

  student_learning_roadmaps: [
    {
      roadmap_id: "m0a80101-0000-4000-8000-000000000001",
      candidate_id: INITIAL_CANDIDATE_ID,
      target_role: "Senior Full-Stack & Systems Engineer",
      skill_gaps: [
        { skill: "Kafka & Event Streaming", status: "In Progress", priority: "High" },
        { skill: "Kubernetes Cluster Orchestration", status: "Not Started", priority: "Medium" }
      ],
      recommended_actions: [
        { week: 1, title: "Deep Dive into Event-Driven Architecture", duration: "10 hrs", status: "Completed" },
        { week: 2, title: "Apache Kafka Partitioning & Producer-Consumer Semantics", duration: "12 hrs", status: "In Progress" },
        { week: 3, title: "Deploying Distributed Clusters on Kubernetes", duration: "14 hrs", status: "Pending" }
      ],
      status: "In_Progress",
      progress_percentage: 68.0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],

  opportunities: [
    {
      opportunity_id: "o0a80101-0000-4000-8000-000000000001",
      company_id: INITIAL_COMPANY_GOOGLE_ID,
      posted_by: null,
      opportunity_type: "Full-time Job",
      title: "Frontend Software Engineer III",
      description: "Join Google's Core Web Platform team building high-scale developer infrastructure, Chromium rendering optimizations, and responsive enterprise workspaces.",
      compensation_min: 2400000,
      compensation_max: 3600000,
      compensation_currency: "INR",
      compensation_unit: "Per Annum",
      location: "Bengaluru, Karnataka / Hybrid",
      is_remote: false,
      lifecycle_state: "Published",
      lifecycle_status: "Published",
      openings_count: 3,
      skill_requirements: ["React", "TypeScript", "Web Performance", "Design Systems"],
      eligibility_criteria: { min_cgpa: 7.5, experience_years: "0-2" },
      application_deadline: "2026-12-31",
      published_at: new Date("2024-02-01T00:00:00Z").toISOString(),
      created_at: new Date("2024-02-01T00:00:00Z").toISOString(),
      updated_at: new Date("2024-02-01T00:00:00Z").toISOString()
    },
    {
      opportunity_id: "o0a80101-0000-4000-8000-000000000002",
      company_id: INITIAL_COMPANY_RAZORPAY_ID,
      posted_by: null,
      opportunity_type: "Full-time Job",
      title: "Backend Engineer - Payments Core",
      description: "Build ultra-reliable payment transaction pipelines processing millions of transactions per day with sub-200ms round trips and bank API gateways.",
      compensation_min: 2000000,
      compensation_max: 3000000,
      compensation_currency: "INR",
      compensation_unit: "Per Annum",
      location: "Bengaluru, Karnataka",
      is_remote: true,
      lifecycle_state: "Published",
      lifecycle_status: "Published",
      openings_count: 5,
      skill_requirements: ["Node.js", "Go", "PostgreSQL", "Kafka", "Redis"],
      eligibility_criteria: { min_cgpa: 7.0, experience_years: "0-2" },
      application_deadline: "2026-11-30",
      published_at: new Date("2024-02-05T00:00:00Z").toISOString(),
      created_at: new Date("2024-02-05T00:00:00Z").toISOString(),
      updated_at: new Date("2024-02-05T00:00:00Z").toISOString()
    },
    {
      opportunity_id: "o0a80101-0000-4000-8000-000000000003",
      company_id: INITIAL_COMPANY_CRED_ID,
      posted_by: null,
      opportunity_type: "Internship",
      title: "Product Engineering Fellow (Summer 2026)",
      description: "Direct hands-on rotation with CRED's design and engineering teams crafting pixel-perfect interactions, animations, and financial telemetry screens.",
      compensation_min: 75000,
      compensation_max: 100000,
      compensation_currency: "INR",
      compensation_unit: "Stipend",
      location: "Bengaluru / In-Office",
      is_remote: false,
      lifecycle_state: "Published",
      lifecycle_status: "Published",
      openings_count: 8,
      skill_requirements: ["React Native", "TypeScript", "Tailwind CSS", "Motion UI"],
      eligibility_criteria: { min_cgpa: 7.0, target_grad_year: 2025 },
      application_deadline: "2026-10-31",
      published_at: new Date("2024-02-10T00:00:00Z").toISOString(),
      created_at: new Date("2024-02-10T00:00:00Z").toISOString(),
      updated_at: new Date("2024-02-10T00:00:00Z").toISOString()
    },
    {
      opportunity_id: "o0a80101-0000-4000-8000-000000000004",
      company_id: INITIAL_COMPANY_MICROSOFT_ID,
      posted_by: null,
      opportunity_type: "Full-time Job",
      title: "Cloud & Infrastructure Engineer (Azure)",
      description: "Engineer resilient enterprise cloud primitives, infrastructure-as-code automation, and container clusters for Azure core services.",
      compensation_min: 2200000,
      compensation_max: 3200000,
      compensation_currency: "INR",
      compensation_unit: "Per Annum",
      location: "Hyderabad, Telangana",
      is_remote: true,
      lifecycle_state: "Published",
      lifecycle_status: "Published",
      openings_count: 4,
      skill_requirements: ["Distributed Systems", "Kubernetes", "C# / Go", "Azure"],
      eligibility_criteria: { min_cgpa: 7.8 },
      application_deadline: "2026-12-15",
      published_at: new Date("2024-02-15T00:00:00Z").toISOString(),
      created_at: new Date("2024-02-15T00:00:00Z").toISOString(),
      updated_at: new Date("2024-02-15T00:00:00Z").toISOString()
    }
  ],

  applications: [
    {
      application_id: "app-1001",
      opportunity_id: "o0a80101-0000-4000-8000-000000000001",
      candidate_id: INITIAL_CANDIDATE_ID,
      current_stage: "Technical",
      application_source: "Direct",
      resume_snapshot_url: "https://careercue.app/resumes/jainil-shah.pdf",
      cover_letter: "Excited about web rendering and high performance design systems at Google.",
      applied_at: new Date("2024-02-18T00:00:00Z").toISOString(),
      updated_at: new Date("2024-02-20T00:00:00Z").toISOString()
    },
    {
      application_id: "app-1002",
      opportunity_id: "o0a80101-0000-4000-8000-000000000002",
      candidate_id: INITIAL_CANDIDATE_ID,
      current_stage: "Screening",
      application_source: "Direct",
      resume_snapshot_url: "https://careercue.app/resumes/jainil-shah.pdf",
      cover_letter: "Strong background in node and high-throughput SQL databases.",
      applied_at: new Date("2024-02-22T00:00:00Z").toISOString(),
      updated_at: new Date("2024-02-24T00:00:00Z").toISOString()
    },
    {
      application_id: "app-1003",
      opportunity_id: "o0a80101-0000-4000-8000-000000000003",
      candidate_id: INITIAL_CANDIDATE_ID,
      current_stage: "Offer Extended",
      application_source: "Direct",
      resume_snapshot_url: "https://careercue.app/resumes/jainil-shah.pdf",
      cover_letter: "Passionate about aesthetic consumer interfaces and motion design.",
      applied_at: new Date("2024-01-20T00:00:00Z").toISOString(),
      updated_at: new Date("2024-02-28T00:00:00Z").toISOString()
    }
  ],

  interview_schedules: [
    {
      interview_id: "i0a80101-0000-4000-8000-000000000001",
      application_id: "app-1001",
      round_number: 2,
      interview_type: "Technical",
      scheduled_at: new Date(Date.now() + 86400000 * 2).toISOString(),
      duration_minutes: 60,
      mode: "Online",
      interviewer_name: "Priya Sharma (Staff Eng, Google)",
      meeting_link: "https://meet.google.com/cue-tech-prep",
      status: "Scheduled",
      created_at: new Date().toISOString()
    }
  ],

  institutions: [
    {
      institution_id: INITIAL_INSTITUTION_IITB_ID,
      legal_name: "Indian Institute of Technology Bombay",
      display_name: "IIT Bombay",
      institution_type: "institute",
      accreditation_status: "accredited",
      registration_number: "INS-MH-IITB-01",
      accreditation_body: "NAAC / NIRF #1",
      website: "https://www.iitb.ac.in",
      official_email: "placements@iitb.ac.in",
      phone: "+91 22 2572 2545",
      address_line: "Powai",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postal_code: "400076",
      established_year: 1958,
      description: "Premier engineering and research institute recognized globally for innovation and academic excellence.",
      verification_status: "verified",
      is_active: true,
      created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
      updated_at: new Date("2024-01-01T00:00:00Z").toISOString()
    },
    {
      institution_id: INITIAL_INSTITUTION_BITS_ID,
      legal_name: "Birla Institute of Technology and Science, Pilani",
      display_name: "BITS Pilani",
      institution_type: "university",
      accreditation_status: "accredited",
      registration_number: "INS-RJ-BITS-02",
      accreditation_body: "NAAC A++",
      website: "https://www.bits-pilani.ac.in",
      official_email: "placement@pilani.bits-pilani.ac.in",
      phone: "+91 1596 242 210",
      address_line: "Vidya Vihar",
      city: "Pilani",
      state: "Rajasthan",
      country: "India",
      postal_code: "333031",
      established_year: 1964,
      description: "Leading private deemed university known for merit-driven technical education.",
      verification_status: "verified",
      is_active: true,
      created_at: new Date("2024-01-01T00:00:00Z").toISOString(),
      updated_at: new Date("2024-01-01T00:00:00Z").toISOString()
    }
  ],

  institution_students: [
    {
      institution_student_id: "is-1001",
      institution_id: INITIAL_INSTITUTION_IITB_ID,
      candidate_id: INITIAL_CANDIDATE_ID,
      student_reference: "21BCE0482",
      full_name: "Jainil Shah",
      official_email: "jainil.shah@iitb.ac.in",
      program_id: null,
      department_id: null,
      enrollment_year: 2021,
      expected_graduation_year: 2025,
      current_semester: 8,
      enrollment_status: "active",
      academic_data: { cgpa: 8.92, credits_completed: 154 },
      visibility_settings: { recruiter_visible: true },
      verification_status: "verified",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],

  academia_researchers: [
    {
      researcher_id: "res-2001",
      user_id: null,
      institution_id: INITIAL_INSTITUTION_IITB_ID,
      full_name: "Dr. Arvind Rangarajan",
      official_email: "arvind.r@iitb.ac.in",
      designation: "Professor & Chair of Distributed Computing Lab",
      department_name: "Department of Computer Science & Engineering",
      lab_name: "Intelligent Systems and Scalable Data Lab",
      research_interests: ["Distributed Systems", "Database Query Optimization", "Federated Learning"],
      orcid_id: "0000-0002-1825-0097",
      verification_status: "verified",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],

  academia_opportunities: [
    {
      research_opportunity_id: "ro-3001",
      researcher_id: "res-2001",
      title: "Research Assistant - High-Throughput Relational Storage Engines",
      research_area: "Distributed Database Systems & NVMe Acceleration",
      description: "Conduct novel benchmarks and prototype MVCC storage improvements on multi-core architectures.",
      objectives: "Publish high-impact systems paper at VLDB/SIGMOD 2026.",
      required_skills: ["C++", "Database Internals", "Linux Kernel Tracing", "PostgreSQL"],
      funding_status: "stipend_provided",
      duration_months: 6,
      location_type: "Hybrid",
      status: "Published",
      application_deadline: new Date("2026-12-31T00:00:00Z").toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],

  academia_applications: [],

  support_tickets: [
    {
      ticket_id: "st-5001",
      requester_user_id: INITIAL_CANDIDATE_ID,
      requester_role: "Student",
      subject: "Verification of GitHub external portfolio analysis",
      category: "Verification",
      priority: "Medium",
      status: "Resolved",
      ai_suggested_response: "Your GitHub repositories have been successfully analyzed and verified with an authenticity score of 94.5%.",
      assigned_agent_id: null,
      created_at: new Date("2024-02-15T00:00:00Z").toISOString(),
      updated_at: new Date("2024-02-15T00:00:00Z").toISOString()
    }
  ],

  support_ticket_messages: [
    {
      message_id: "stm-6001",
      ticket_id: "st-5001",
      sender_user_id: INITIAL_CANDIDATE_ID,
      sender_role: "User",
      message_body: "Hi team, my recent commits to the CareerCue repository were pushed last night. Can the ATS score sync up?",
      attachment_refs: [],
      created_at: new Date("2024-02-15T10:00:00Z").toISOString()
    },
    {
      message_id: "stm-6002",
      ticket_id: "st-5001",
      sender_user_id: null,
      sender_role: "Support_Agent",
      message_body: "Hello Jainil! The automated sync completed with 94.5% authenticity score. All updated skills are now reflected in your profile.",
      attachment_refs: [],
      created_at: new Date("2024-02-15T10:05:00Z").toISOString()
    }
  ],

  student_certificates: [
    {
      certificate_id: "cert-001",
      candidate_id: INITIAL_CANDIDATE_ID,
      title: "Meta Certified Front-End Developer Professional",
      issuing_organization: "Meta / Coursera",
      issue_date: "2024-01-15",
      credential_id: "META-FED-982341",
      credential_url: "https://coursera.org/verify/professional-cert/META982341",
      verified_skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript"],
      verification_status: "Verified",
      grade: "Top 5% (98%)",
      created_at: new Date("2024-01-15T00:00:00Z").toISOString()
    },
    {
      certificate_id: "cert-002",
      candidate_id: INITIAL_CANDIDATE_ID,
      title: "AWS Certified Cloud Practitioner (CLF-C02)",
      issuing_organization: "Amazon Web Services (AWS)",
      issue_date: "2024-02-10",
      credential_id: "AWS-CCP-773910",
      credential_url: "https://aws.amazon.com/verification/AWS-CCP-773910",
      verified_skills: ["Cloud Architecture", "Docker", "REST APIs"],
      verification_status: "Verified",
      grade: "Pass (890/1000)",
      created_at: new Date("2024-02-10T00:00:00Z").toISOString()
    }
  ],

  courses: [
    {
      course_id: "crs-101",
      title: "Apache Kafka & Event-Driven Microservices Masterclass",
      provider: "CareerCue Systems Lab",
      category: "Distributed Systems",
      target_skills: ["Kafka", "Event Streaming", "Distributed Systems"],
      duration: "4 Weeks (18 Hours)",
      level: "Intermediate",
      rating: 4.9,
      enrolled_count: 2450,
      description: "Master event-driven architectures with Apache Kafka. Learn partition strategies, consumer lag mitigation, schema registry, and failover recovery.",
      modules: [
        "1. Core Kafka Broker Architecture & Commit Log Internals",
        "2. Producer & Consumer Groups: Rebalance & At-Least-Once Delivery",
        "3. Schema Registry with Avro & Protobuf Serializers",
        "4. Building Resilient Fault-Tolerant Payment Pipelines"
      ],
      instructor: {
        name: "Arunav Saxena",
        title: "Principal Distributed Systems Architect @ Razorpay",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
      },
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
      certificate_included: true
    },
    {
      course_id: "crs-102",
      title: "Kubernetes Orchestration & Production Container Deployment",
      provider: "Cloud Native Foundation",
      category: "Cloud & DevOps",
      target_skills: ["Kubernetes", "Docker", "Cluster Orchestration"],
      duration: "5 Weeks (22 Hours)",
      level: "Advanced",
      rating: 4.8,
      enrolled_count: 3820,
      description: "From Docker containers to production Kubernetes clusters. Learn Ingress controllers, StatefulSets, persistent volumes, and zero-downtime rolling updates.",
      modules: [
        "1. Container Internals: Namespaces, Cgroups, and Image Optimization",
        "2. Kubernetes Control Plane, Pod Lifecycles, and Kubelet Protocols",
        "3. Services, Ingress Controllers, and Service Mesh (Istio)",
        "4. Auto-Scaling (HPA/KEDA) and Canary Deployments in CI/CD"
      ],
      instructor: {
        name: "Devon Chen",
        title: "Staff SRE @ Google Cloud",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
      },
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80",
      certificate_included: true
    },
    {
      course_id: "crs-103",
      title: "Go (Golang) High-Performance Backend Engineering",
      provider: "CareerCue Backend Guild",
      category: "Backend Systems",
      target_skills: ["Go", "Concurrency", "gRPC", "REST APIs"],
      duration: "3 Weeks (15 Hours)",
      level: "Intermediate",
      rating: 4.95,
      enrolled_count: 1890,
      description: "Build blazing-fast concurrent network servers in Go. Deep dive into goroutines, channels, memory management, garbage collection tuning, and gRPC.",
      modules: [
        "1. Go Type System, Interfaces, and Memory Allocation",
        "2. Concurrency Deep Dive: Channels, Mutexes, and Race Detection",
        "3. High-Throughput REST & gRPC API Services with Protobuf",
        "4. Profiling CPU & Memory with pprof Under Heavy Load"
      ],
      instructor: {
        name: "Nikhil Kulkarni",
        title: "Lead Platform Engineer @ CRED",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
      },
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
      certificate_included: true
    },
    {
      course_id: "crs-104",
      title: "PostgreSQL Internals, Indexing & Query Optimization",
      provider: "Database Systems Academy",
      category: "Database Engineering",
      target_skills: ["PostgreSQL", "Query Optimization", "Database Internals", "SQL Schema"],
      duration: "4 Weeks (16 Hours)",
      level: "Advanced",
      rating: 4.88,
      enrolled_count: 2110,
      description: "Understand how Postgres works under the hood. Learn B-Tree and GIN indexes, MVCC concurrency, buffer pool management, and query plan tuning.",
      modules: [
        "1. The Postgres Storage Engine: Pages, Tuples, and Heap Files",
        "2. Index Architectures: B-Tree, BRIN, Hash, and Partial Indexes",
        "3. Deep Dive into EXPLAIN ANALYZE and Cost-Based Optimizers",
        "4. Transaction Isolation Levels, Deadlocks, and MVCC Vacuuming"
      ],
      instructor: {
        name: "Dr. Arvind Rangarajan",
        title: "Professor & Lab Chair @ IIT Bombay",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80"
      },
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
      certificate_included: true
    },
    {
      course_id: "crs-105",
      title: "React 19, Server Components & Modern Web Architecture",
      provider: "Frontend Engineering Collective",
      category: "Frontend Architecture",
      target_skills: ["React", "TypeScript", "Next.js", "Web Performance", "Design Systems"],
      duration: "4 Weeks (20 Hours)",
      level: "Intermediate",
      rating: 4.92,
      enrolled_count: 5400,
      description: "Build ultra-smooth interactive web applications with React 19, React Server Components (RSC), Actions, Suspense streaming, and Tailwind CSS.",
      modules: [
        "1. React 19 Paradigms: Actions, useOptimistic, and Server Functions",
        "2. Streaming SSR and Component Boundaries",
        "3. Micro-Interactions, Layout Transitions with Motion",
        "4. Performance Profiling and Zero-CLS Core Web Vitals"
      ],
      instructor: {
        name: "Sarah Lin",
        title: "Staff Frontend Architect @ Vercel",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80"
      },
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
      certificate_included: true
    },
    {
      course_id: "crs-106",
      title: "Systems Programming in C++ & Linux Kernel Fundamentals",
      provider: "Systems & Low-Level Lab",
      category: "Systems Engineering",
      target_skills: ["C++", "Linux Kernel Tracing", "Database Internals", "Systems Programming"],
      duration: "6 Weeks (28 Hours)",
      level: "Advanced",
      rating: 4.9,
      enrolled_count: 1650,
      description: "Low-level systems programming using modern C++20. Master Linux system calls, POSIX threads, epoll event loops, eBPF tracing, and memory allocators.",
      modules: [
        "1. Modern C++20 Memory Management and RAII",
        "2. POSIX Threads, Atomic Operations, and Lock-Free Queues",
        "3. Asynchronous I/O with epoll and io_uring",
        "4. Profiling Systems with eBPF, Perf, and Valgrind"
      ],
      instructor: {
        name: "Vikram Sengupta",
        title: "Principal Kernel Engineer @ Microsoft Research",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80"
      },
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
      certificate_included: true
    }
  ]
};
