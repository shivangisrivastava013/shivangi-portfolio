/* ==========================================================================
   Shivangi Srivastava - Portfolio Interactive Script
   ========================================================================== */

function runInit() {
  initBackgroundCanvas();
  initLaserPointer();
  initNavbarScroll();
  initMobileMenu();
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

/* --- 1. Navbar Scroll Effect & Active Link Spy --- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
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

/* --- 2. Mobile Menu Toggle --- */
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

/* --- 3. Project Modal Controller --- */
const projectData = {
  project1: {
    title: "ShadowTag - Deep Learning Image Watermarking",
    subtitle: "Computer Vision & AI Security",
    tech: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Autoencoders"],
    overview: "Designed and trained a convolutional encoder-decoder that embeds invisible watermarks into images and recovers them after common image distortions, balancing watermark strength against visual fidelity.",
    highlights: [
      "Reached 34.7 dB PSNR, 0.96 SSIM, and 94.2% watermark recovery on clean test datasets.",
      "Demonstrated resilience beyond clean images: recovery remained at 92% after JPEG Q=70 compression and 89% after image cropping."
    ]
  },
  project2: {
    title: "CareerLens - AI Career RAG Assistant",
    subtitle: "Generative AI, NLP & Information Retrieval",
    tech: ["Python", "RAG", "Sentence Transformers", "FAISS", "NLP"],
    overview: "Built a RAG-based career assistant that compares resumes with 100 job descriptions, retrieves the 5 most relevant text chunks per job, extracts skills, identifies gaps, and generates recommendations using semantic matching rather than keyword overlap.",
    highlights: [
      "Measured 0.88 Recall@5 and 0.81 MRR for vector retrieval.",
      "Achieved 84% agreement on manually reviewed job matches and 0.86 F1 for skill extraction."
    ]
  },
  project3: {
    title: "Autonomous Robotic Perception & Distributed Telemetry Pipeline",
    subtitle: "Robotics, Distributed Systems & Edge AI",
    tech: ["ROS 2", "YOLOv8", "Gazebo", "Zenoh", "PostgreSQL", "Docker"],
    overview: "Built a TurtleBot perception pipeline in Gazebo that detects objects with YOLOv8, publishes detection metadata through ROS 2 and Zenoh, and stores results in PostgreSQL through a duplicate-safe ingestion worker.",
    highlights: [
      "Reached 0.91 mAP@50, 0.90 precision, and 0.87 recall across 6 object classes while running at 18 FPS with 55 ms median detection latency.",
      "Successfully processed and stored over 1,200 detection records in PostgreSQL."
    ]
  },
  project4: {
    title: "Real-Time Multi-Stage Vision Pipeline",
    subtitle: "Computer Vision & Foundation Models",
    tech: ["YOLO", "SAM 2", "PyTorch", "OpenCV", "Roboflow"],
    overview: "Combined YOLO detection with SAM 2 segmentation on approximately 1,500 annotated images across 5 classes, overcoming CUDA, PyTorch dependency, and GPU-inference challenges to keep the pipeline running reliably.",
    highlights: [
      "Reached 0.89 mAP@50, 0.90 precision, 0.86 recall, and 0.87 mean IoU.",
      "Processed real-time video frames at 14 FPS (~71 ms/frame)."
    ]
  },
  project5: {
    title: "Graph Neural Network Benchmarking",
    subtitle: "Graph Machine Learning & Node Classification",
    tech: ["PyTorch Geometric", "GCN", "GraphSAGE", "Python"],
    overview: "Implemented GCN and GraphSAGE node-classification models, preparing graph data, training both architectures, and comparing their performance under the same evaluation setup.",
    highlights: [
      "GraphSAGE performed best at 88.1% accuracy and 0.87 F1 score.",
      "Achieved a 1.7 percentage-point accuracy gain over GCN (86.4% accuracy and 0.85 F1)."
    ]
  },
  project6: {
    title: "NeuralScene - 3D Gaussian Splatting Room Reconstruction",
    subtitle: "3D Vision & Neural Rendering",
    tech: ["COLMAP", "3DGS", "gsplat", "Neural Rendering", "Python"],
    overview: "Reconstructed interior room spaces from approximately 150 Polycam images, using COLMAP for camera poses and 3D Gaussian Splatting with gsplat for neural rendering.",
    highlights: [
      "Trained reconstruction for 7,000 iterations in ~45 minutes on an NVIDIA T4 GPU.",
      "Reached 29.8 dB PSNR, 0.94 SSIM, and 0.12 LPIPS quality metrics."
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
          <p style="color: var(--accent-light-blue); font-weight: 500; margin-bottom: 20px; font-size: 0.95rem;">${data.subtitle}</p>
          
          <div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.tech.map(t => `<span style="background: rgba(2,132,199,0.15); color: var(--accent-light-blue); padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-family: var(--font-code); border: 1px solid rgba(2,132,199,0.3);">${t}</span>`).join('')}
          </div>

          <div style="background: #1e293b; padding: 18px; border-radius: 6px; border: 1px solid var(--border-glass); margin-bottom: 24px;">
            <h4 style="color: var(--text-main); margin-bottom: 8px;"><i class="fa-solid fa-circle-info"></i> Project Overview</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${data.overview}</p>
          </div>

          <h4 style="color: var(--text-main); margin-bottom: 12px;"><i class="fa-solid fa-chart-line"></i> Measured Performance & Achievements</h4>
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

/* --- 4. Resume Viewer Modal --- */
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

/* --- 5. Copy to Clipboard Toasts --- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn, #quickCopyEmailBtn');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy') || 'goforshivangi@gmail.com';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard.`);
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

/* --- 6. AI Knowledge Assistant --- */
function generateAIReply(query) {
  if (!query) query = '';
  const q = query.toLowerCase().trim();

  // 0. Overview / Why Hire Shivangi
  if (q === 'overview' || q.includes('overview') || q.includes('why') || q.includes('strengths') || q.includes('candidate')) {
    return `<strong>Shivangi Srivastava - Candidate Summary:</strong><br><br>
    • <strong>Academic Background:</strong> MS in AI @ NJIT (GPA 3.8/4.0, Expected Dec 2026) & B.Tech in CSE AI/ML @ Manipal University (GPA 8.14/10).<br>
    • <strong>Specialized Expertise:</strong> Retrieval-Augmented Generation (RAG), Graph Neural Networks (GCN/GraphSAGE), SAM 2 Visual Segmentation, and ROS 2 Robotics Perception.<br>
    • <strong>Industry Internships:</strong> NJIT Residence Life Office Assistant, Salesforce Intern at SmartInternz, Cyber Secured India Intern, and Suvidha Mahila Mandal ML Intern.`;
  }

  // 1. Education & Academic Performance
  if (q === 'education' || q.includes('graduat') || q.includes('gpa') || q.includes('degree') || q.includes('njit') || q.includes('manipal') || q.includes('coursework')) {
    return `<strong>Education & Credentials:</strong><br><br>
    • <strong>New Jersey Institute of Technology (NJIT)</strong> - <em>MS in Artificial Intelligence</em><br>
    &nbsp;&nbsp;• <strong>Timeline:</strong> Sept 2025 - Dec 2026 (GPA: 3.8 / 4.0)<br>
    &nbsp;&nbsp;• <strong>Leadership:</strong> President, Graduate Women in Computing Society (GWiCS)<br>
    &nbsp;&nbsp;• <strong>Coursework:</strong> Machine Learning, Deep Learning, NLP, Graph Neural Networks, Big Data Analytics, AI for Robotics, Federated Machine Learning, Computational Neuroscience.<br><br>
    • <strong>Manipal University, Jaipur</strong> - <em>B.Tech (Hons.) CSE in AI & ML</em><br>
    &nbsp;&nbsp;• <strong>Timeline:</strong> Aug 2021 - Jul 2025 (GPA: 8.14 / 10)<br>
    &nbsp;&nbsp;• <strong>Roles:</strong> Treasurer @ ANOVA, Head of Content @ LearnIT.`;
  }

  // 2. Core Projects
  if (q === 'projects' || q.includes('project') || q.includes('shadowtag') || q.includes('careerlens') || q.includes('rag') || q.includes('sam2') || q.includes('ros') || q.includes('gnn')) {
    return `<strong>Featured Engineering Projects:</strong><br><br>
    1. <strong>ShadowTag (Deep Learning Image Watermarking):</strong> 34.7 dB PSNR, 0.96 SSIM, 94.2% recovery (92% after JPEG Q=70).<br>
    2. <strong>CareerLens (AI Career RAG Assistant):</strong> 0.88 Recall@5, 0.81 MRR, 84% agreement across 100 job descriptions.<br>
    3. <strong>Autonomous Robotic Perception Pipeline:</strong> TurtleBot perception in Gazebo using ROS 2, YOLOv8, and Zenoh telemetry (0.91 mAP@50 at 18 FPS).<br>
    4. <strong>Real-Time Multi-Stage Vision Pipeline:</strong> Combined YOLO and SAM 2 across 1,500 images (0.89 mAP@50, 0.87 mean IoU at 14 FPS).<br>
    5. <strong>Graph Neural Network Benchmarking:</strong> GraphSAGE node classification reaching 88.1% accuracy and 0.87 F1 score.<br>
    6. <strong>NeuralScene (3D Gaussian Splatting):</strong> 3D room reconstruction from 150 Polycam images (29.8 dB PSNR, 0.94 SSIM).`;
  }

  // 3. Work Experience
  if (q === 'experience' || q.includes('experience') || q.includes('intern') || q.includes('salesforce') || q.includes('suvidha') || q.includes('cyber') || q.includes('residence')) {
    return `<strong>Professional Work Experience:</strong><br><br>
    1. <strong>Office Assistant</strong> @ <em>NJIT Residence Life</em> (May 2025 - Present)<br>
    &nbsp;&nbsp;• Assisted main office operations, administrative queries, resident records, and student privacy compliance.<br><br>
    2. <strong>Salesforce Intern</strong> @ <em>Salesforce x SmartInternz</em> (May 2024 - Jul 2024)<br>
    &nbsp;&nbsp;• Configured Salesforce applications with key automation components (workflows, validation rules, reporting dashboards).<br><br>
    3. <strong>Cybersecurity Training Intern</strong> @ <em>Cyber Secured India</em> (Nov 2022 - Feb 2023)<br>
    &nbsp;&nbsp;• Ethical hacking, vulnerability assessments, penetration testing, and coordinated 20+ national webinars.<br><br>
    4. <strong>Machine Learning Intern</strong> @ <em>Suvidha Mahila Mandal</em> (Feb 2023 - Mar 2023)<br>
    &nbsp;&nbsp;• Developed text summarization models using MeanSum architecture in Python and TensorFlow.`;
  }

  // 4. Technical Skills
  if (q === 'skills' || q.includes('skill') || q.includes('python') || q.includes('pytorch') || q.includes('docker') || q.includes('sql')) {
    return `<strong>Technical Skills & Systems:</strong><br><br>
    • <strong>Programming & Data:</strong> Python, R, C, MATLAB, SQL, PostgreSQL, MongoDB<br>
    • <strong>AI/ML & GenAI:</strong> PyTorch, TensorFlow, Keras, scikit-learn, PyTorch Geometric, Hugging Face, Sentence Transformers, FAISS, RAG, YOLOv8, SAM 2, OpenCV<br>
    • <strong>Data Engineering & Cloud:</strong> Spark, Hadoop, ROS 2, Zenoh, Docker, Git, AWS, Google Cloud, Jupyter, Tableau`;
  }

  // 5. Contact Info
  if (q === 'contact' || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin')) {
    return `<strong>Contact Information:</strong><br><br>
    • <strong>Email:</strong> goforshivangi@gmail.com<br>
    • <strong>Phone:</strong> +1 (848) 315-8969<br>
    • <strong>LinkedIn:</strong> linkedin.com/in/shivangisrivastava013<br>
    • <strong>Location:</strong> Newark, NJ`;
  }

  // Default Fallback
  return `<strong>Shivangi Srivastava - AI Assistant:</strong><br><br>
  Graduate student in Artificial Intelligence at NJIT (GPA 3.8/4.0).<br><br>
  You can inquire about:<br>
  • <strong>Education:</strong> Academic degrees and graduate coursework at NJIT and Manipal.<br>
  • <strong>Projects:</strong> ShadowTag, CareerLens RAG, ROS 2 Robotics, SAM 2 Vision, GNN Benchmarking, 3DGS.<br>
  • <strong>Experience:</strong> Salesforce, Cybersecurity, ML Summarization, and NJIT Residence Life.<br>
  • <strong>Skills:</strong> PyTorch, TensorFlow, ROS 2, Docker, SQL, and cloud platforms.`;
}

window.askQuickQuestion = function(key, label) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = label;
  chatMessages.appendChild(userBubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;

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
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble user';
        userBubble.textContent = query;
        chatMessages.appendChild(userBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = '';

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

/* --- 7. Direct Email Contact Form Handler --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', () => {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';
    }
  });
}

/* --- 8. Hero Terminal Tab Switcher --- */
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
    <br>&nbsp;&nbsp;&nbsp;&nbsp;self.degree = <span class="code-string">"MS in AI @ NJIT (GPA 3.8/4.0)"</span>
    <br>&nbsp;&nbsp;&nbsp;&nbsp;self.specialization = [<span class="code-string">"RAG & LLMs"</span>, <span class="code-string">"Deep Learning"</span>, <span class="code-string">"GNNs"</span>, <span class="code-string">"Robotics Vision"</span>]
    <br><br>&nbsp;&nbsp;<span class="code-keyword">def</span> <span class="code-func">get_key_metrics</span>(self):
    <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">return</span> {<span class="code-string">"shadowtag_psnr"</span>: <span class="code-string">"34.7 dB"</span>, <span class="code-string">"careerlens_mrr"</span>: <span class="code-string">"0.81"</span>}`;
  } else if (tabKey === 'stack') {
    if (tabs[1]) tabs[1].classList.add('active');
    snippet.innerHTML = `{
    <br>&nbsp;&nbsp;<span class="code-string">"languages"</span>: [<span class="code-string">"Python"</span>, <span class="code-string">"R"</span>, <span class="code-string">"C"</span>, <span class="code-string">"MATLAB"</span>, <span class="code-string">"SQL"</span>],
    <br>&nbsp;&nbsp;<span class="code-string">"ai_frameworks"</span>: [<span class="code-string">"PyTorch"</span>, <span class="code-string">"TensorFlow"</span>, <span class="code-string">"PyTorch Geometric"</span>, <span class="code-string">"Hugging Face"</span>],
    <br>&nbsp;&nbsp;<span class="code-string">"genai_rag"</span>: [<span class="code-string">"Sentence Transformers"</span>, <span class="code-string">"FAISS"</span>, <span class="code-string">"RAG"</span>],
    <br>&nbsp;&nbsp;<span class="code-string">"vision_systems"</span>: [<span class="code-string">"YOLOv8"</span>, <span class="code-string">"SAM 2"</span>, <span class="code-string">"OpenCV"</span>, <span class="code-string">"ROS 2"</span>, <span class="code-string">"Zenoh"</span>, <span class="code-string">"Docker"</span>]
    <br>}`;
  } else if (tabKey === 'pitch') {
    if (tabs[2]) tabs[2].classList.add('active');
    snippet.innerHTML = `<span class="code-keyword">CANDIDATE SUMMARY & CORE VALUES:</span>
    <br><br>• <strong>Academic Record:</strong> MS in AI @ NJIT (GPA 3.8/4.0) | President, GWiCS
    <br>• <strong>Engineering Rigor:</strong> 6 published projects with empirical performance benchmarks
    <br>• <strong>Professional Experience:</strong> 4 roles across Salesforce automation, ML summarization & cybersecurity
    <br>• <strong>Technical Execution:</strong> Reproducible PyTorch code, Docker containerization & ROS 2 telemetry`;
  }
};

/* --- 9. Interactive Experience Matrix Switcher --- */
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
          <span class="grad-status-badge">Sept 2025 - Dec 2026</span>
          <h3>Master of Science in Artificial Intelligence</h3>
          <p class="matrix-org"><i class="fa-solid fa-building-columns"></i> New Jersey Institute of Technology (NJIT) | Newark, NJ</p>
        </div>
        <div class="matrix-body">
          <div class="matrix-metric-badge">
            <span class="m-val">3.8 / 4.0</span>
            <span class="m-lbl">Master's GPA</span>
          </div>
          <h4>Graduate Leadership:</h4>
          <p style="margin-bottom: 14px; font-size: 0.95rem; color: var(--text-main);">President, Graduate Women in Computing Society (GWiCS) - Leading graduate computing community initiatives and student engagement.</p>
          <h4>Relevant Coursework:</h4>
          <div class="skills-pills">
            <span class="pill primary">Machine Learning</span>
            <span class="pill primary">Deep Learning</span>
            <span class="pill primary">NLP</span>
            <span class="pill primary">Graph Neural Networks</span>
            <span class="pill">Big Data Analytics</span>
            <span class="pill">AI for Robotics</span>
            <span class="pill">Federated Machine Learning</span>
            <span class="pill">Computational Neuroscience</span>
          </div>
        </div>
      </div>`;
  } else if (key === 'manipal') {
    if (tabs[1]) tabs[1].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge">Aug 2021 - Jul 2025</span>
          <h3>B.Tech. (Hons.) Computer Science Engineering - AI & ML</h3>
          <p class="matrix-org"><i class="fa-solid fa-graduation-cap"></i> Manipal University | Jaipur, India</p>
        </div>
        <div class="matrix-body">
          <div class="matrix-metric-badge">
            <span class="m-val">8.14 / 10</span>
            <span class="m-lbl">Bachelor's GPA</span>
          </div>
          <h4>Leadership & Student Activities:</h4>
          <ul class="experience-list">
            <li><strong>Treasurer:</strong> ANOVA - Data Science Departmental Club, Manipal University.</li>
            <li><strong>Head of Content:</strong> LearnIT - Official IT Department Club, Manipal University.</li>
          </ul>
        </div>
      </div>`;
  } else if (key === 'residence') {
    if (tabs[2]) tabs[2].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge">May 2025 - Present</span>
          <h3>Office Assistant</h3>
          <p class="matrix-org"><i class="fa-solid fa-briefcase"></i> NJIT Residence Life | Newark, NJ</p>
        </div>
        <div class="matrix-body">
          <h4>Key Responsibilities:</h4>
          <ul class="experience-list">
            <li>Assist in running the Residence Life Main Office by responding to resident inquiries, maintaining records, and fulfilling administrative tasks while preserving student confidentiality.</li>
            <li>Collaborate with residents and staff members to resolve day-to-day issues, escalate emergencies, and manage multiple queries concurrently.</li>
          </ul>
        </div>
      </div>`;
  } else if (key === 'salesforce') {
    if (tabs[3]) tabs[3].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge">May 2024 - Jul 2024</span>
          <h3>Salesforce Intern</h3>
          <p class="matrix-org"><i class="fa-solid fa-briefcase"></i> Salesforce x SmartInternz</p>
        </div>
        <div class="matrix-body">
          <h4>Key Responsibilities & Achievements:</h4>
          <ul class="experience-list">
            <li>Created and configured Salesforce applications with 3 key automation and reporting components (workflows, validation rules, dashboards) to simplify CRM reporting.</li>
            <li>Implemented CRM processes end-to-end by translating business requirements into Salesforce configurations and testing created workflows.</li>
          </ul>
        </div>
      </div>`;
  } else if (key === 'cyber') {
    if (tabs[4]) tabs[4].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge">Nov 2022 - Feb 2023</span>
          <h3>Cybersecurity Training Intern</h3>
          <p class="matrix-org"><i class="fa-solid fa-shield-halved"></i> Cyber Secured India</p>
        </div>
        <div class="matrix-body">
          <h4>Key Responsibilities & Achievements:</h4>
          <ul class="experience-list">
            <li>Engaged in ethical hacking, vulnerability assessments, penetration testing, and secure network configurations through practical lab exercises.</li>
            <li>Participated in coordinating 20+ national cybersecurity webinars, monitored web/YouTube channels for compliance, and enhanced audience participation by 40%.</li>
          </ul>
        </div>
      </div>`;
  } else if (key === 'suvidha') {
    if (tabs[5]) tabs[5].classList.add('active');
    details.innerHTML = `
      <div class="matrix-detail-card">
        <div class="matrix-detail-header">
          <span class="grad-status-badge">Feb 2023 - Mar 2023</span>
          <h3>Machine Learning Intern</h3>
          <p class="matrix-org"><i class="fa-solid fa-robot"></i> Suvidha Mahila Mandal</p>
        </div>
        <div class="matrix-body">
          <h4>Key Responsibilities & Achievements:</h4>
          <ul class="experience-list">
            <li>Developed text summarization models using the MeanSum architecture in Python and TensorFlow for extractive and abstractive summarization.</li>
            <li>Conducted literature reviews on neural summarization, analyzed model behavior, and utilized findings in experimentation and content decisions.</li>
          </ul>
        </div>
      </div>`;
  }
};

/* --- Laser Pointer Follow Logic --- */
function initLaserPointer() {
  const pointer = document.getElementById('laserPointer');
  const core = document.getElementById('laserCore');
  if (!pointer || !core) return;

  let mouseX = -500;
  let mouseY = -500;
  let currentX = -500;
  let currentY = -500;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Core moves instantly for zero input delay
    core.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(animateLaser);
    }
  });

  // Smooth cyan halo lag behind cursor for high refresh rate visual feedback
  function animateLaser() {
    currentX += (mouseX - currentX) * 0.22;
    currentY += (mouseY - currentY) * 0.22;

    pointer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

    if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
      requestAnimationFrame(animateLaser);
    } else {
      isMoving = false;
    }
  }

  document.addEventListener('mouseleave', () => {
    pointer.style.opacity = '0';
    core.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    pointer.style.opacity = '1';
    core.style.opacity = '1';
  });
}

/* --- Dynamic Neural Network Canvas Background --- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  let particles = [];
  const numParticles = Math.min(Math.floor((width * height) / 22000), 55);

  function Particle() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.radius = Math.random() * 1.8 + 1.2;
    this.color = Math.random() > 0.4 ? '6, 182, 212' : (Math.random() > 0.5 ? '56, 189, 248' : '16, 185, 129');
    this.alpha = Math.random() * 0.4 + 0.2;
  }

  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    // Gentle cursor interaction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 140) {
      const force = (140 - dist) / 140;
      this.x -= (dx / dist) * force * 1.2;
      this.y -= (dy / dist) * force * 1.2;
    }
  };

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = `rgba(${this.color}, 0.8)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Connect close nodes with neural graph edges
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const edgeAlpha = (1 - dist / 130) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${edgeAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  initParticles();
  render();
}


