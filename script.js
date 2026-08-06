/* ==========================================================================
   Shivangi Srivastava - Portfolio Interactive Script
   ========================================================================== */

function runInit() {
  initParticleCanvas();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initProjectFilters();
  initProjectModals();
  initResumeModal();
  initCopyButtons();
  initChatAssistant();
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}

/* --- 1. Neural Particle Canvas Background --- */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const numParticles = Math.min(Math.floor(width / 18), 75);
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw particles & links
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.6)';
      ctx.fill();

      // Connect nearby nodes (neural graph representation)
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(127, 0, 255, ${0.25 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --- 2. Hero Typing Effect --- */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'AI & Machine Learning Engineer',
    'MS Candidate in AI @ NJIT',
    'RAG & LLM Pipeline Developer',
    'GNN & Deep Vision Specialist',
    'Workflow Automation Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* --- 3. Navbar Scroll Effect & Active Link Spy --- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --- 4. Mobile Menu Toggle --- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* --- 5. Project Filters --- */
function initProjectFilters() {
  // Filter buttons removed as requested
}

/* --- 6. Project Modal Controller --- */
const projectData = {
  project1: {
    title: "AI Career RAG Assistant — Resume-Job Matching & Skill Gap Engine",
    subtitle: "Generative AI, NLP & Information Retrieval",
    tech: ["Python", "LangChain", "Sentence Transformers", "FAISS", "Hugging Face", "LLMs", "Pandas", "Scikit-learn"],
    overview: "Built a Retrieval-Augmented Generation (RAG) system that parses resume content and job descriptions to perform semantic resume matching, skill gap analysis, and personalized career recommendations.",
    highlights: [
      "Designed semantic resume matching using vector embeddings beyond keyword overlap to recognize related domain skills and terminology.",
      "Implemented FAISS vector database indexing and similarity scoring for fast context retrieval.",
      "Applied LLM prompt engineering to generate grounded, explainable match categories and role-specific resume improvement guidance.",
      "Integrated candidate recommendation engine logic with structured scoring and failure-case analysis."
    ]
  },
  project2: {
    title: "Graph Neural Networks for Citation Network Classification",
    subtitle: "Graph Machine Learning & Node Classification",
    tech: ["PyTorch", "PyTorch Geometric", "GCN", "GraphSAGE", "NetworkX", "Scikit-learn"],
    overview: "Implemented Graph Convolutional Networks (GCN) and GraphSAGE for semi-supervised node classification on structured citation graph datasets.",
    highlights: [
      "Engineered message-passing graph neural network architectures to capture relational topology in citation networks.",
      "Evaluated model performance using validation-selected test accuracy, macro-F1 metrics, and ablation studies.",
      "Conducted extensive hyperparameter sweeps and comparative performance analysis against non-graph baselines."
    ]
  },
  project3: {
    title: "Representation Learning for Robotic Pouring Actions",
    subtitle: "Deep Learning & Action Representation",
    tech: ["TensorFlow", "TFRecords", "Python", "Representation Learning", "Embeddings", "Google Colab"],
    overview: "Processed large-scale TFRecord video datasets to train deep embedding models capable of learning visual representations of robotic pouring action sequences.",
    highlights: [
      "Built input data pipelines to efficiently decode and batch TFRecord sequential video data.",
      "Trained embedding models using metric learning loss functions to map pouring dynamics into low-dimensional latent spaces.",
      "Executed hyperparameter sweeps to optimize feature extraction for downstream robotic control evaluation."
    ]
  },
  project4: {
    title: "Natural Language Processing with Transformer Models",
    subtitle: "Contextual Embeddings & Sequence Modeling",
    tech: ["PyTorch", "Hugging Face Transformers", "BERT", "GPT", "Attention Mechanisms", "Python"],
    overview: "Implemented core transformer-based NLP architectures to study self-attention mechanisms, contextual embeddings, and sequence modeling for language comprehension.",
    highlights: [
      "Implemented multi-head self-attention, positional encoding, and feed-forward transformer layers.",
      "Fine-tuned pre-trained BERT and GPT model checkpoints for classification and text generation tasks.",
      "Evaluated language representations across sequence length scaling and attention head visualizations."
    ]
  },
  project5: {
    title: "ShadowTag: Deep Learning-Based Digital Image Watermarking",
    subtitle: "Computer Vision & AI Security",
    tech: ["Python", "PyTorch", "OpenCV", "Convolutional Autoencoders", "Robustness Evaluation"],
    overview: "Developed an invisible digital image watermarking system using convolutional autoencoders to protect digital visual assets against unauthorized copying.",
    highlights: [
      "Designed encoder-decoder neural network architectures to embed and extract watermarks while preserving imperceptible image visual quality.",
      "Evaluated robustness against Gaussian noise, JPEG compression, cropping, and geometric transformations.",
      "Conducted experimental analysis demonstrating superior resilience compared to classical frequency-domain watermarking."
    ]
  },
  project6: {
    title: "Image Segmentation using Segment Anything Model 2 (SAM2)",
    subtitle: "Computer Vision & Foundation Models",
    tech: ["PyTorch", "Meta SAM2", "Roboflow", "Python", "Google Colab"],
    overview: "Built an automated zero-shot image segmentation pipeline integrating custom Roboflow datasets with Meta's SAM2 foundation model.",
    highlights: [
      "Integrated Roboflow data preparation pipelines for customized prompt-guided mask generation.",
      "Leveraged Meta's SAM2 zero-shot segmentation capabilities for precise object boundary extraction.",
      "Optimized data preprocessing and inference pipelines for multi-class visual segmentation tasks."
    ]
  },
  project7: {
    title: "Autonomous Robot Navigation and Object Detection System",
    subtitle: "Robotics, Distributed Systems & Edge AI",
    tech: ["ROS2", "Gazebo", "RViz2", "YOLO", "Zenoh", "PostgreSQL", "Docker", "Python"],
    overview: "Engineered an end-to-end autonomous robot navigation system combining ROS2 middleware, Gazebo simulation, real-time YOLO object detection, and Zenoh distributed messaging.",
    highlights: [
      "Developed ROS2 nodes for autonomous path planning, sensor processing, and velocity command control.",
      "Integrated YOLO real-time object detection for obstacle avoidance and target recognition.",
      "Configured Zenoh low-latency distributed messaging for edge robot telemetry and PostgreSQL data logging.",
      "Containerized complete simulation and navigation environment using Docker for reproducible deployment."
    ]
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];

      if (data) {
        modalBody.innerHTML = `
          <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--text-main); margin-bottom: 6px;">${data.title}</h2>
          <p style="color: var(--accent-cyan); font-weight: 500; margin-bottom: 20px; font-size: 0.95rem;">${data.subtitle}</p>
          
          <div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.tech.map(t => `<span style="background: rgba(0,242,254,0.1); color: var(--accent-cyan); padding: 4px 12px; border-radius: 99px; font-size: 0.8rem; font-family: var(--font-code);">${t}</span>`).join('')}
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 18px; border-radius: 12px; border: 1px solid var(--border-glass); margin-bottom: 24px;">
            <h4 style="color: var(--text-main); margin-bottom: 8px;"><i class="fa-solid fa-bullseye"></i> Project Overview</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${data.overview}</p>
          </div>

          <h4 style="color: var(--text-main); margin-bottom: 12px;"><i class="fa-solid fa-list-check"></i> Key Engineering Highlights</h4>
          <ul style="padding-left: 20px; color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
            ${data.highlights.map(h => `<li style="margin-bottom: 10px;">${h}</li>`).join('')}
          </ul>
        `;
        modal.classList.add('active');
      }
    });
  });

  const closeModal = () => modal.classList.remove('active');
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
}

/* --- 7. Resume Viewer Modal --- */
function initResumeModal() {
  const openBtn = document.getElementById('openResumeBtn');
  const modal = document.getElementById('resumeModal');
  const modalOverlay = document.getElementById('resumeModalOverlay');
  const modalClose = document.getElementById('resumeModalClose');

  if (!modal || !openBtn) return;

  openBtn.addEventListener('click', () => modal.classList.add('active'));
  const closeModal = () => modal.classList.remove('active');

  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
}

/* --- 8. Copy to Clipboard Toasts --- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn, #quickCopyEmailBtn');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy') || 'goforshivangi@gmail.com';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      });
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

window.triggerEmojiConfetti = function(e) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.innerHTML = "🥹🙏 <strong>Please consider hiring Shivangi!</strong> Holding back tears of joy & praying for an offer! ✨🍒";
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  const emojiList = ['🥹', '😂', '😭', '🙏', '🍒', '✨', '💖', '🥹', '😂', '😭', '🙏'];
  const startX = e && e.clientX ? e.clientX : window.innerWidth / 2;
  const startY = e && e.clientY ? e.clientY : window.innerHeight / 2;

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('span');
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    particle.textContent = randomEmoji;
    particle.style.position = 'fixed';
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    particle.style.fontSize = (Math.random() * 1.6 + 1.8) + 'rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '999999';
    particle.style.transition = 'transform 2.2s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 2.2s ease-out';
    particle.style.opacity = '1';

    document.body.appendChild(particle);

    const scatterX = (Math.random() - 0.5) * 700;
    const scatterY = (Math.random() - 0.8) * 600;
    const rotation = (Math.random() - 0.5) * 720;

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${scatterX}px, ${scatterY}px) rotate(${rotation}deg) scale(${Math.random() * 0.6 + 0.8})`;
      particle.style.opacity = '0';
    });

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 2300);
  }
};

window.triggerCherryToast = function() {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.innerHTML = "🍒 <strong>Here is your virtual cherry!</strong> Shivangi is officially ready to join your team! ✨";
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
};

/* --- 9. "Ask Shivangi AI" Copilot Assistant --- */
function generateAIReply(query) {
  if (!query) query = '';
  const q = query.toLowerCase().trim();

  // 0. Recruiter Pitch / Why Hire Shivangi
  if (q === 'whyhire' || q.includes('why') || q.includes('cherry') || q.includes('hire') || q.includes('recruiter') || q.includes('pitch')) {
    return `🍒 <strong>Why You Should Hire Shivangi:</strong><br><br>
    • <strong>Top-Tier AI Toolkit:</strong> Hands-on expertise with RAG, GNNs, SAM2 Vision, ROS2 Autonomous Robots, PyTorch, and Docker.<br>
    • <strong>Proven Track Record:</strong> MS in AI @ NJIT (GPA 3.8/4.0), B.Tech in CSE (GPA 8.14/10), and 3 successful internships.<br>
    • <strong>Zero Hallucinations, Clean Code:</strong> She writes modular code, cleans up Docker containers, and brings positive energy to team syncs.<br><br>
    👉 <strong>Bottom Line:</strong> <em>"She brings rigorous ML engineering, clean reproducible code, and 100% dedication to your team! ✨"</em>`;
  }

  // 1. Education & Graduation
  if (q === 'education' || q.includes('graduat') || q.includes('grad') || q.includes('gpa') || q.includes('degree') || q.includes('njit') || q.includes('manipal') || q.includes('university') || q.includes('coursework')) {
    return `🎓 <strong>Education & Graduation Details:</strong><br><br>
    • <strong>New Jersey Institute of Technology (NJIT)</strong> — <em>MS in Artificial Intelligence</em><br>
    &nbsp;&nbsp;• <strong>Expected Graduation Date:</strong> <strong>December 2026</strong> (Currently Enrolled / In Progress)<br>
    &nbsp;&nbsp;• <strong>GPA:</strong> 3.8 / 4.0<br>
    &nbsp;&nbsp;• <strong>Coursework:</strong> Machine Learning, Computational Neuroscience, Big Data Analytics, Deep Learning, Graph Neural Networks, AI for Robotics, NLP, Advanced Federated ML.<br><br>
    • <strong>Manipal University</strong> — <em>B.Tech (Hons.) Computer Science Engineering in AI & ML</em><br>
    &nbsp;&nbsp;• <strong>Graduation Date:</strong> <strong>July 2025</strong> (Graduated)<br>
    &nbsp;&nbsp;• <strong>GPA:</strong> 8.14 / 10<br>
    &nbsp;&nbsp;• <strong>Leadership:</strong> Treasurer at ANOVA (Data Science Dept Club), Head of Content at LearnIT (IT Dept Club).`;
  }

  // 2. RAG Assistant Project
  if (q === 'rag' || q.includes('rag') || q.includes('langchain') || q.includes('faiss') || q.includes('career') || q.includes('matching') || q.includes('resume')) {
    return `🧠 <strong>AI Career RAG Assistant — Resume-Job Matching:</strong><br><br>
    • <strong>Tech Stack:</strong> Python, LangChain, Sentence Transformers, FAISS, Hugging Face, LLMs.<br>
    • <strong>System Architecture:</strong> Built a RAG-powered system parsing resumes and job descriptions using vector embeddings for semantic matching.<br>
    • <strong>Key Features:</strong> Semantic skill gap analysis, similarity scoring, and LLM prompt engineering for grounded career recommendations.`;
  }

  // 3. Graph Neural Networks Project
  if (q === 'gnn' || q.includes('gnn') || q.includes('graph') || q.includes('citation') || q.includes('gcn') || q.includes('graphsage')) {
    return `🕸️ <strong>Graph Neural Networks for Citation Network Classification:</strong><br><br>
    • <strong>Tech Stack:</strong> PyTorch, PyTorch Geometric, GCN, GraphSAGE, NetworkX.<br>
    • <strong>Node Classification:</strong> Implemented message-passing GCN and GraphSAGE models for semi-supervised node classification on citation graphs.<br>
    • <strong>Evaluation:</strong> Conducted validation accuracy, macro-F1 benchmarking, hyperparameter sweeps, and ablation studies.`;
  }

  // 4. Work Experience & Internships
  if (q === 'experience' || q.includes('experience') || q.includes('intern') || q.includes('salesforce') || q.includes('suvidha') || q.includes('cyber')) {
    return `💼 <strong>Professional Work Experience:</strong><br><br>
    1. <strong>Salesforce Intern</strong> @ <em>Salesforce x SmartInternz</em> (May 2024 – July 2024)<br>
    &nbsp;&nbsp;• Customized Salesforce workflows, validation rules, dashboards, and CRM configs to automate business reporting.<br><br>
    2. <strong>Machine Learning Intern</strong> @ <em>Suvidha Mahila Mandal</em> (Feb 2023 – Mar 2023)<br>
    &nbsp;&nbsp;• Developed NLP text summarization models using MeanSum architecture (Python/TensorFlow) and evaluated extractive/abstractive output quality.<br><br>
    3. <strong>Training Intern</strong> @ <em>Cyber Secured India</em> (Nov 2022 – Feb 2023)<br>
    &nbsp;&nbsp;• Ethical hacking, network security, threat analysis, and coordinated 20+ national webinars with 200+ attendees.`;
  }

  // 5. Technical Skills & Engineering Toolkit
  if (q === 'skills' || q.includes('skill') || q.includes('stack') || q.includes('python') || q.includes('pytorch') || q.includes('docker') || q.includes('wsl') || q.includes('cuda') || q.includes('gpu') || q.includes('postgres') || q.includes('zenoh')) {
    return `🛠️ <strong>Technical Skills & Engineering Toolkit:</strong><br><br>
    • <strong>AI/ML & Deep Learning:</strong> PyTorch, TensorFlow, Keras, Scikit-learn, CNNs, RNNs, Transformers, GNNs, Model Evaluation.<br>
    • <strong>GenAI, RAG & NLP:</strong> LangChain, Sentence Transformers, FAISS, Hugging Face, BERT, GPT, Prompt Engineering.<br>
    • <strong>Robotics & Vision:</strong> ROS2, Gazebo, RViz2, YOLO, Meta SAM2, OpenCV, Roboflow.<br>
    • <strong>Engineering & Infrastructure:</strong> Docker & WSL2 setup, CUDA & PyTorch GPU config, Zenoh distributed messaging, PostgreSQL integration, Git, Reproducible Pipelines.<br>
    • <strong>Cloud & Data:</strong> AWS, Google Cloud, MongoDB, SQL Server, Oracle, REST APIs.`;
  }

  // 6. Contact & Email
  if (q === 'contact' || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('location')) {
    return `📬 <strong>Contact & Connectivity Details:</strong><br><br>
    • <strong>Email:</strong> <a href='mailto:goforshivangi@gmail.com' style='color: var(--accent-cyan); font-weight: 600;'>goforshivangi@gmail.com</a><br>
    • <strong>Phone:</strong> <a href='tel:+18483158969' style='color: var(--accent-cyan); font-weight: 600;'>+1 (848) 315-8969</a><br>
    • <strong>LinkedIn:</strong> <a href='https://www.linkedin.com/in/shivangisrivastava013/' target='_blank' style='color: var(--accent-cyan); font-weight: 600;'>linkedin.com/in/shivangisrivastava013</a><br>
    • <strong>Location:</strong> Newark, NJ / Open to Relocation`;
  }

  // 7. Robotics & Autonomous Navigation
  if (q.includes('robot') || q.includes('ros2') || q.includes('gazebo') || q.includes('zenoh') || q.includes('navigation') || q.includes('pouring')) {
    return `🤖 <strong>Robotics & Autonomous Systems Projects:</strong><br><br>
    1. <strong>Autonomous Robot Navigation & Object Detection:</strong><br>
    &nbsp;&nbsp;• <strong>Tech:</strong> ROS2, Gazebo, RViz2, YOLO, Zenoh, PostgreSQL, Docker, Python.<br>
    &nbsp;&nbsp;• ROS2 autonomous navigation, Gazebo simulation, real-time YOLO object detection, Zenoh distributed telemetry, PostgreSQL logging.<br><br>
    2. <strong>Representation Learning for Robotic Pouring:</strong><br>
    &nbsp;&nbsp;• <strong>Tech:</strong> TensorFlow, TFRecords, Python, Metric Embeddings.<br>
    &nbsp;&nbsp;• Processed TFRecord video datasets & trained deep visual embeddings to learn representations of robotic pouring dynamics.`;
  }

  // Default Fallback
  return `🤖 <strong>Shivangi AI Assistant:</strong><br><br>
  Shivangi Srivastava is an AI Engineer pursuing her MS in AI at NJIT (GPA 3.8/4).<br><br>
  You can ask me specifically about:<br>
  • 🎓 <strong>Education & Graduation Dates</strong> (B.Tech July 2025 / MS Dec 2026)<br>
  • 🚀 <strong>7 Core Projects</strong> (RAG Assistant, GNNs, SAM2 Segmentation, ROS2 Autonomous Robotics, Steganography, Pouring Representation Learning, Transformers)<br>
  • 💼 <strong>Internships</strong> (Salesforce, Suvidha Mahila Mandal, Cyber Secured India)<br>
  • 🛠️ <strong>Engineering Toolkit</strong> (PyTorch, TensorFlow, ROS2, Docker/WSL2, CUDA GPU, Zenoh, PostgreSQL)<br>
  • 📬 <strong>Contact Info</strong> (Email, Phone, LinkedIn)`;
}

window.askQuickQuestion = function(key, label) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  // Append user bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.innerHTML = label;
  chatMessages.appendChild(userBubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Generate AI reply
  setTimeout(() => {
    const botReply = generateAIReply(key);
    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bot';
    botBubble.innerHTML = botReply;
    chatMessages.appendChild(botBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 200);
};

function initChatAssistant() {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatInput.value.trim();
      if (query) {
        // User bubble
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble user';
        userBubble.innerHTML = query;
        chatMessages.appendChild(userBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = '';

        // Bot reply
        setTimeout(() => {
          const reply = generateAIReply(query);
          const botBubble = document.createElement('div');
          botBubble.className = 'chat-bubble bot';
          botBubble.innerHTML = reply;
          chatMessages.appendChild(botBubble);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 250);
      }
    });
  }
}

/* --- 10. Direct Email Contact Form Handler --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', () => {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Delivering to Inbox...';
    }
  });
}

/* --- 11. Interactive Hero Terminal Tabs --- */
window.switchTerminalTab = function(tabKey) {
  const snippet = document.getElementById('termSnippet');
  const tabs = document.querySelectorAll('.term-tab');
  if (!snippet) return;

  tabs.forEach(t => t.classList.remove('active'));

  if (tabKey === 'core') {
    if (tabs[0]) tabs[0].classList.add('active');
    snippet.innerHTML = `<span class="code-keyword">class</span> <span class="code-class">AIEngineer</span>:
    <br>&nbsp;&nbsp;<span class="code-keyword">def</span> <span class="code-func">__init__</span>(self):
    <br>&nbsp;&nbsp;&nbsp;&nbsp;self.name = <span class="code-string">"Shivangi Srivastava"</span>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;self.degree = <span class="code-string">"MS in AI @ NJIT (GPA 3.8)"</span>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;self.focus = [<span class="code-string">"LLMs & RAG"</span>, <span class="code-string">"GNNs"</span>, <span class="code-string">"Robotics"</span>]
    <br>&nbsp;&nbsp;&nbsp;&nbsp;self.superpower = <span class="code-string">"Turning coffee into clean code ☕"</span>
    <br><br>&nbsp;&nbsp;<span class="code-keyword">def</span> <span class="code-func">recruiter_pitch</span>(self):
    <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">return</span> <span class="code-string">"High-performance ML engineering & 100% team dedication ✨"</span>`;
  } else if (tabKey === 'stack') {
    if (tabs[1]) tabs[1].classList.add('active');
    snippet.innerHTML = `{
    <br>&nbsp;&nbsp;<span class="code-string">"core_frameworks"</span>: [<span class="code-string">"PyTorch"</span>, <span class="code-string">"TensorFlow"</span>, <span class="code-string">"LangChain"</span>],
    <br>&nbsp;&nbsp;<span class="code-string">"vector_dbs"</span>: [<span class="code-string">"FAISS"</span>, <span class="code-string">"Sentence-Transformers"</span>],
    <br>&nbsp;&nbsp;<span class="code-string">"robotics_vision"</span>: [<span class="code-string">"ROS2"</span>, <span class="code-string">"YOLO"</span>, <span class="code-string">"Meta SAM2"</span>, <span class="code-string">"Gazebo"</span>],
    <br>&nbsp;&nbsp;<span class="code-string">"infrastructure"</span>: [<span class="code-string">"Docker"</span>, <span class="code-string">"WSL2"</span>, <span class="code-string">"CUDA GPU"</span>, <span class="code-string">"Zenoh"</span>, <span class="code-string">"PostgreSQL"</span>]
    <br>}`;
  } else if (tabKey === 'pitch') {
    if (tabs[2]) tabs[2].classList.add('active');
    snippet.innerHTML = `<span class="code-keyword">RECRUITER SUMMARY & CORE VALUE:</span>
    <br><br>• <strong>Academic Excellence:</strong> 3.8 / 4.0 GPA (MS in AI @ NJIT)
    <br>• <strong>Core Systems:</strong> 7 deployed AI, RAG, GNN & Robotics systems
    <br>• <strong>Industry Track Record:</strong> 3 internships (Salesforce, Suvidha, Cyber Secured)
    <br>• <strong>Engineering Culture:</strong> Modular code, zero hallucinations, fast learner!
    <br><br>👉 <em>"Ready to build scalable AI models & drive immediate impact! ✨"</em>`;
  }
};

/* --- 12. Interactive Experience Matrix Switcher --- */
window.switchMatrix = function(key) {
  const details = document.getElementById('matrixDetails');
  const tabs = document.querySelectorAll('.matrix-tab');
  if (!details) return;

  tabs.forEach(t => t.classList.remove('active'));

  if (key === 'njit') {
    if (tabs[0]) tabs[0].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge in-progress"><i class="fa-solid fa-spinner fa-spin"></i> Enrolled • Expected Dec 2026</span>
          <h3>Master of Science in Artificial Intelligence</h3>
          <p class="matrix-org"><i class="fa-solid fa-building-columns"></i> New Jersey Institute of Technology (NJIT) • Newark, NJ</p>
        </div>
        <div class="matrix-body">
          <div class="matrix-metric-badge">
            <span class="m-val">3.8 / 4.0</span>
            <span class="m-lbl">Master's GPA</span>
          </div>
          <h4>Key Graduate Coursework:</h4>
          <div class="skills-pills">
            <span class="pill primary">Machine Learning</span>
            <span class="pill primary">Deep Learning</span>
            <span class="pill primary">Graph Neural Networks</span>
            <span class="pill">Computational Neuroscience</span>
            <span class="pill">Big Data Analytics</span>
            <span class="pill">AI for Robotics</span>
            <span class="pill">NLP</span>
            <span class="pill">Federated ML</span>
          </div>
          <h4 style="margin-top: 18px;">Research & Focus:</h4>
          <p>Developing robust RAG vector retrieval pipelines, GNN node classification models, and ROS2 autonomous navigation telemetry systems.</p>
        </div>
      </div>`;
  } else if (key === 'manipal') {
    if (tabs[1]) tabs[1].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge completed"><i class="fa-solid fa-award"></i> Graduated July 2025</span>
          <h3>B.Tech (Hons.) Computer Science Engineering in AI & ML</h3>
          <p class="matrix-org"><i class="fa-solid fa-graduation-cap"></i> Manipal University • India</p>
        </div>
        <div class="matrix-body">
          <div class="matrix-metric-badge">
            <span class="m-val">8.14 / 10</span>
            <span class="m-lbl">Bachelor's GPA</span>
          </div>
          <h4>Campus Leadership Roles:</h4>
          <p>• <strong>Treasurer – ANOVA:</strong> Data Science Departmental Club<br>• <strong>Head of Content – LearnIT:</strong> Official IT Department Club</p>
          <h4 style="margin-top: 14px;">Specialization Focus:</h4>
          <p>Supervised ML algorithms, Computer Vision, Neural Network Foundations, and Automated Text Summarization.</p>
        </div>
      </div>`;
  } else if (key === 'salesforce') {
    if (tabs[2]) tabs[2].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge completed">May 2024 – July 2024</span>
          <h3>Salesforce Intern</h3>
          <p class="matrix-org"><i class="fa-solid fa-briefcase"></i> Salesforce x SmartInternz</p>
        </div>
        <div class="matrix-body">
          <h4>Key Responsibilities & Impact:</h4>
          <ul class="experience-list">
            <li>Customized Salesforce workflows, validation rules, dashboards, and CRM configs to automate business reporting.</li>
            <li>Supported enterprise application configuration by translating process requirements into structured workflows.</li>
            <li>Collaborated on CRM optimization tasks involving data quality, reporting logic, and automation of operational processes.</li>
          </ul>
        </div>
      </div>`;
  } else if (key === 'suvidha') {
    if (tabs[3]) tabs[3].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge completed">Feb 2023 – March 2023</span>
          <h3>Machine Learning Intern</h3>
          <p class="matrix-org"><i class="fa-solid fa-briefcase"></i> Suvidha Mahila Mandal</p>
        </div>
        <div class="matrix-body">
          <h4>Key Responsibilities & Impact:</h4>
          <ul class="experience-list">
            <li>Developed NLP text summarization models using MeanSum architecture in Python and TensorFlow for automated content understanding.</li>
            <li>Researched extractive and abstractive summarization techniques and evaluated output quality for readability and information coverage.</li>
            <li>Supported data analysis and insight generation for organizational content strategy.</li>
          </ul>
        </div>
      </div>`;
  } else if (key === 'cyber') {
    if (tabs[4]) tabs[4].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge completed">Nov 2022 – Feb 2023</span>
          <h3>Training Intern</h3>
          <p class="matrix-org"><i class="fa-solid fa-shield-halved"></i> Cyber Secured India</p>
        </div>
        <div class="matrix-body">
          <h4>Key Responsibilities & Impact:</h4>
          <ul class="experience-list">
            <li>Acquired foundational knowledge in ethical hacking, network security, and vulnerability assessment through applied simulations.</li>
            <li>Coordinated 20+ national-level webinars and threat-awareness sessions attended by over 200 participants.</li>
            <li>Applied cybersecurity principles to improve digital asset protection and security compliance.</li>
          </ul>
        </div>
      </div>`;
  }
};
