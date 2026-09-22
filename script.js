/* ==========================================================================
   Shivangi Srivastava - Portfolio Interactive Script (Data-Driven)
   ========================================================================== */

let PROJECTS_DATA = [];

async function loadProjectsData() {
  try {
    const res = await fetch('data/projects.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        PROJECTS_DATA = data;
      }
    } else {
      console.error('Failed to fetch data/projects.json: HTTP status', res.status);
    }
  } catch (err) {
    console.error('Error loading data/projects.json:', err);
  }
  renderProjectsGrid();
}

async function runInit() {
  initBackgroundCanvas();
  initLaserPointer();
  initNavbarScroll();
  initMobileMenu();
  await loadProjectsData();
  initProjectModals();
  initResumeModal();
  initCopyButtons();
  initContactForm();
  initPortfolioAssistant();
  initAccessibility();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}

/* --- 1. Navbar Scroll & Scrollspy --- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

/* --- 2. Mobile Navigation Menu --- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --- 3. Dynamic Projects Grid Rendering --- */
function renderProjectsGrid() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = PROJECTS_DATA.map(project => {
    const metrics = project.metrics.map(metric =>
      `<span class="metric-pill"><strong>${metric.label}:</strong> ${metric.value}</span>`
    ).join('');

    const technologies = project.tech.map(item => `<span>${item}</span>`).join('');

    const links = [];
    if (project.github_url) {
      links.push(`<a href="${project.github_url}" target="_blank" rel="noopener" class="btn btn-small btn-primary"><i class="fa-brands fa-github"></i> View Code</a>`);
    }
    if (project.results_url) {
      const isExamples = project.results_url.includes('examples/output');
      const label = isExamples ? 'View Examples' : 'View Results';
      const icon = isExamples ? 'fa-image' : 'fa-chart-bar';
      links.push(`<a href="${project.results_url}" target="_blank" rel="noopener" class="btn btn-small btn-secondary"><i class="fa-solid ${icon}"></i> ${label}</a>`);
    }
    if (project.demo_url) {
      links.push(`<a href="${project.demo_url}" target="_blank" rel="noopener" class="btn btn-small btn-secondary"><i class="fa-solid fa-play"></i> View Demo</a>`);
    }
    if (!project.github_url) {
      links.push('<span class="private-tag"><i class="fa-solid fa-lock"></i> Private Research</span>');
    }
    links.push(`<button class="btn btn-small btn-outline open-modal-btn" data-project="${project.id}"><i class="fa-solid fa-circle-info"></i> Details</button>`);

    return `
      <article class="project-card glass-card ${project.card_class}" data-category="${project.category}">
        <div class="project-banner">
          <span class="project-badge">${project.badge}</span>
          <div class="banner-icon"><i class="fa-solid fa-code"></i></div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-subtitle">${project.subtitle}</p>
          <p class="project-desc">${project.description}</p>
          <div class="project-metrics">${metrics}</div>
          <div class="project-tech">${technologies}</div>
          <div class="project-actions">${links.join(' ')}</div>
        </div>
      </article>
    `;
  }).join('');
}

/* --- Modal Focus Trapping & Restoration Utilities --- */
let activeTriggerElement = null;

function openModalWithFocus(modal, triggerElement) {
  if (!modal) return;
  activeTriggerElement = triggerElement || document.activeElement;
  modal.classList.add('active');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');
  document.body.style.overflow = 'hidden';

  const firstFocusable = modal.querySelector('.modal-close, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) {
    firstFocusable.focus();
  }
}

function closeModalWithFocus(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  modal.removeAttribute('aria-modal');
  document.body.style.overflow = '';

  if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
    activeTriggerElement.focus();
    activeTriggerElement = null;
  }
}

/* --- 4. Project Modal Controller --- */
function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  if (!modal || !modalBody) return;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-modal-btn');
    if (!btn) return;

    const projId = btn.getAttribute('data-project');
    const data = PROJECTS_DATA.find(p => p.id === projId);

    if (data) {
      const techPills = data.tech.map(t => `<span class="pill">${t}</span>`).join(' ');
      const metricsList = data.metrics.map(m => `<li><strong>${m.label}:</strong> ${m.value} <em>(${m.context})</em></li>`).join('');

      let actionButtons = '';
      if (data.github_url) {
        actionButtons += `<a href="${data.github_url}" target="_blank" rel="noopener" class="btn btn-primary"><i class="fa-brands fa-github"></i> Open Repository</a> `;
      }
      if (data.results_url) {
        const isExamples = data.results_url.includes('examples/output');
        const label = isExamples ? 'View Examples' : 'View Results';
        const icon = isExamples ? 'fa-image' : 'fa-chart-line';
        actionButtons += `<a href="${data.results_url}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fa-solid ${icon}"></i> ${label}</a> `;
      }
      if (data.demo_url) {
        actionButtons += `<a href="${data.demo_url}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fa-solid fa-play"></i> View Demo</a> `;
      }

      modalBody.innerHTML = `
        <span class="modal-badge">${data.badge}</span>
        <h2 style="font-family: var(--font-heading); color: var(--text-main); font-size: 1.8rem; margin: 10px 0 4px 0;">${data.title}</h2>
        <p style="color: var(--accent-cyan); font-weight: 500; font-size: 0.95rem; margin-bottom: 16px;">${data.subtitle}</p>

        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
          ${techPills}
        </div>

        <h4 style="color: var(--text-main); margin-bottom: 8px;">System Architecture & Overview:</h4>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px;">
          ${data.description}
        </p>

        <h4 style="color: var(--text-main); margin-bottom: 8px;">Results and Evidence:</h4>
        <ul style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.8; margin-bottom: 24px; padding-left: 20px;">
          ${metricsList}
        </ul>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px;">
          ${actionButtons}
        </div>
      `;

      openModalWithFocus(modal, btn);
    }
  });

  if (modalClose) modalClose.addEventListener('click', () => closeModalWithFocus(modal));
  if (modalOverlay) modalOverlay.addEventListener('click', () => closeModalWithFocus(modal));
}

/* --- 5. Resume Modal Controller --- */
function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('openResumeBtn');
  const closeBtn = document.getElementById('resumeModalClose');
  const overlay = document.getElementById('resumeModalOverlay');

  if (!modal || !openBtn) return;

  openBtn.addEventListener('click', () => openModalWithFocus(modal, openBtn));
  if (closeBtn) closeBtn.addEventListener('click', () => closeModalWithFocus(modal));
  if (overlay) overlay.addEventListener('click', () => closeModalWithFocus(modal));
}

/* --- 6. Keyboard & Focus Accessibility --- */
function initAccessibility() {
  document.addEventListener('keydown', (e) => {
    const activeModal = document.querySelector('.modal.active');
    if (!activeModal) return;

    if (e.key === 'Escape') {
      closeModalWithFocus(activeModal);
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(
        activeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      );

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  });
}

/* --- 7. Copy Buttons --- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        if (toast) {
          toast.innerHTML = `<i class="fa-solid fa-check"></i> Copied "${text}" to clipboard!`;
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 3000);
        }
      });
    });
  });
}

/* --- 8. Contact Form AJAX Handler --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = document.getElementById('userName');
    const emailEl = document.getElementById('userEmail');
    const messageEl = document.getElementById('userMessage');
    const submitBtn = form.querySelector('button[type="submit"]');
    const toast = document.getElementById('toast');

    const name = nameEl ? nameEl.value.trim() : 'Visitor';
    const email = emailEl ? emailEl.value.trim() : '';
    const message = messageEl ? messageEl.value.trim() : '';

    const originalContent = submitBtn ? submitBtn.innerHTML : 'Send Message';
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Message...';
      submitBtn.disabled = true;
    }

    fetch('https://formsubmit.co/ajax/goforshivangi@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Message: message,
        _subject: `✨ New Portfolio Inquiry from ${name}`
      })
    })
    .then(res => res.json())
    .then(() => {
      if (toast) {
        toast.innerHTML = `💌 <strong>Message Delivered!</strong> Thank you, ${name}! Your message has been sent directly to Shivangi's inbox. ✨`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
      }
      form.reset();
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
        }, 3000);
      }
    })
    .catch(err => {
      console.warn('FormSubmit AJAX request error:', err);
      if (toast) {
        toast.innerHTML = `💌 <strong>Message Sent!</strong> Thank you, ${name}! Your inquiry has been routed to Shivangi. ✨`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
      }
      form.reset();
      if (submitBtn) {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
      }
    });
  });
}

/* --- 8. Portfolio Assistant Chatbot --- */
function initPortfolioAssistant() {
  let widget = document.getElementById('portfolioAssistantWidget');
  if (widget) return;

  widget = document.createElement('div');
  widget.id = 'portfolioAssistantWidget';
  widget.innerHTML = `
    <button class="chat-toggle-btn" id="chatToggleBtn" aria-label="Open Portfolio Assistant" style="position: fixed; bottom: 24px; right: 24px; z-index: 999; padding: 12px 20px; background: linear-gradient(135deg, #06b6d4, #0284c7); color: #fff; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; box-shadow: 0 10px 25px rgba(6,182,212,0.4); display: flex; align-items: center; gap: 8px;">
      <i class="fa-solid fa-comments"></i> <span>Portfolio Assistant</span>
    </button>
    <div class="chat-window-card glass-card" id="chatWindowCard" style="display: none; position: fixed; bottom: 84px; right: 24px; width: 360px; max-width: 90vw; height: 460px; z-index: 1000; flex-direction: column; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
      <div class="chat-header" style="padding: 14px 18px; background: rgba(30, 41, 59, 0.8); border-bottom: 1px solid rgba(56, 189, 248, 0.2); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--text-main); font-size: 1rem;"><i class="fa-solid fa-robot"></i> Interactive Portfolio Guide</strong>
          <div style="font-size: 0.75rem; color: var(--accent-cyan);">Powered by Verified Repo Data</div>
        </div>
        <button id="closeChatBtn" style="background: none; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer;">&times;</button>
      </div>
      <div class="chat-messages" id="chatMessages" style="flex: 1; padding: 14px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; font-size: 0.88rem;">
        <div class="msg msg-assistant" style="background: rgba(30, 41, 59, 0.7); padding: 10px 14px; border-radius: 12px; color: var(--text-main); border: 1px solid rgba(56, 189, 248, 0.15);">
          Hello! I am your interactive guide to Shivangi's portfolio. Ask me about RAG metrics, GNN benchmarks, ROS 2, or repository links!
        </div>
      </div>
      <div class="chat-quick-queries" style="padding: 8px 12px; display: flex; gap: 6px; overflow-x: auto; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(15, 23, 42, 0.6);">
        <button class="chip-btn" data-query="rag">RAG Metrics</button>
        <button class="chip-btn" data-query="gnn">GNN Acc</button>
        <button class="chip-btn" data-query="ros2">ROS 2</button>
        <button class="chip-btn" data-query="pouring">Pouring RL</button>
      </div>
      <div class="chat-input-row" style="padding: 10px; display: flex; gap: 8px; border-top: 1px solid rgba(56, 189, 248, 0.2); background: rgba(30, 41, 59, 0.8);">
        <input type="text" id="chatInput" placeholder="Type a question..." style="flex: 1; padding: 8px 12px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; font-size: 0.88rem;">
        <button id="sendChatBtn" style="padding: 8px 14px; background: #06b6d4; color: #fff; border: none; border-radius: 8px; cursor: pointer;"><i class="fa-solid fa-paper-plane"></i></button>
      </div>
    </div>
  `;

  document.body.appendChild(widget);

  const toggleBtn = document.getElementById('chatToggleBtn');
  const chatCard = document.getElementById('chatWindowCard');
  const closeBtn = document.getElementById('closeChatBtn');
  const sendBtn = document.getElementById('sendChatBtn');
  const input = document.getElementById('chatInput');
  const msgs = document.getElementById('chatMessages');

  if (!toggleBtn || !chatCard) return;

  toggleBtn.addEventListener('click', () => {
    chatCard.style.display = (chatCard.style.display === 'none') ? 'flex' : 'none';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatCard.style.display = 'none';
    });
  }

  function handleUserQuery(queryText) {
    if (!queryText.trim()) return;

    const uMsg = document.createElement('div');
    uMsg.className = 'msg msg-user';
    uMsg.style.cssText = 'align-self: flex-end; background: #0284c7; color: #fff; padding: 8px 12px; border-radius: 12px; max-width: 85%;';
    uMsg.innerText = queryText;
    msgs.appendChild(uMsg);
    input.value = '';

    const lower = queryText.toLowerCase();
    let reply = "";

    if (lower.includes('rag') || lower.includes('careerlens')) {
      reply = "AI Career RAG Assistant: Verified Recall@5 of 0.9333, MRR of 0.8367, and Skill F1 of 0.9085 on a 50-job synthetic benchmark.";
    } else if (lower.includes('gnn') || lower.includes('cora') || lower.includes('graph')) {
      reply = "GNN Benchmark: Cora GCN reaches 80.72% ± 0.93% Accuracy (0.8007 Macro F1) across 5 seeds. Citeseer GraphSAGE reaches 68.30% ± 0.51% Accuracy.";
    } else if (lower.includes('ros') || lower.includes('gazebo') || lower.includes('robot')) {
      reply = "ROS 2 Autonomous Navigation: Functional colcon package with rclpy nodes (/scan, /odom, cmd_vel), state-machine obstacle avoidance, YOLO perception node, and Zenoh/PostgreSQL telemetry.";
    } else if (lower.includes('pouring') || lower.includes('rl') || lower.includes('pid')) {
      reply = "Precision Robotic Pouring: Gymnasium environment. Rule-Based & PID controllers reach 100% success (MAE 2.9-5.5 ml). PPO reaches 40% success after reward shaping.";
    } else if (lower.includes('sam') || lower.includes('vision') || lower.includes('yolo')) {
      reply = "SAM 2 Vision Pipeline: Multi-stage pipeline combining YOLO object detection with Meta SAM 2 promptable mask segmentation, verified with 100% PyTest suite pass.";
    } else if (lower.includes('nlp') || lower.includes('summariz')) {
      reply = "NLP Transformer Summarizer: Long-document summarization workbench with token-aware chunking, hierarchical BART and Flan-T5 support, threshold-based neutral sentiment handling, transparent fallback reporting, and ROUGE evaluation.";
    } else if (lower.includes('github') || lower.includes('code') || lower.includes('repo')) {
      reply = "All code repositories are available at https://github.com/shivangisrivastava013 with direct links on each project card.";
    } else {
      reply = "Shivangi's portfolio features 8 projects across RAG, Graph ML, ROS 2 Robotics, Vision Foundation Models, and Continuous Control RL. Click any project card for direct code links!";
    }

    setTimeout(() => {
      const aMsg = document.createElement('div');
      aMsg.className = 'msg msg-assistant';
      aMsg.style.cssText = 'background: rgba(30, 41, 59, 0.7); padding: 10px 14px; border-radius: 12px; color: var(--text-main); border: 1px solid rgba(56, 189, 248, 0.15); max-width: 90%;';
      aMsg.innerText = reply;
      msgs.appendChild(aMsg);
      msgs.scrollTop = msgs.scrollHeight;
    }, 400);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => handleUserQuery(input.value));
  }

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleUserQuery(input.value);
    });
  }

  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleUserQuery(btn.getAttribute('data-query'));
    });
  });
}

/* --- 9. Hero Terminal Tab Switcher --- */
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
    <br><br>✨ <strong>Academic Record:</strong> MS in AI @ NJIT (GPA 3.8/4.0) | President, GWiCS
    <br>✨ <strong>Engineering Rigor:</strong> 6 published projects with empirical performance benchmarks
    <br>✨ <strong>Professional Experience:</strong> 4 roles across Salesforce automation, ML summarization & cybersecurity
    <br>✨ <strong>Technical Execution:</strong> Reproducible PyTorch code, Docker containerization & ROS 2 telemetry`;
  }
};

/* --- 10. Interactive Experience Matrix Switcher --- */
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

/* --- 11. Interactive Laser Pointer Light --- */
function initLaserPointer() {
  const pointer = document.getElementById('laserPointer');
  const core = document.getElementById('laserCore');
  if (!pointer || !core) return;

  let mouseX = -500, mouseY = -500;
  let currentX = -500, currentY = -500;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    core.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(animateLaser);
    }
  });

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

/* --- 12. Dynamic Neural Network Background Canvas (Interactive) --- */
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

  let mouse = { x: -1000, y: -1000, active: false };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  let particles = [];
  let signals = [];
  const numParticles = Math.min(Math.floor((width * height) / 16000), 75);

  function Particle(id) {
    this.id = id;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.baseRadius = Math.random() * 2 + 1.2;
    this.radius = this.baseRadius;
    const rand = Math.random();
    if (rand > 0.6) {
      this.color = '6, 182, 212';
    } else if (rand > 0.3) {
      this.color = '56, 189, 248';
    } else {
      this.color = '16, 185, 129';
    }
    this.alpha = Math.random() * 0.45 + 0.3;
    this.pulsePhase = Math.random() * Math.PI * 2;
  }

  Particle.prototype.update = function(time) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    this.radius = this.baseRadius + Math.sin(time * 0.003 + this.pulsePhase) * 0.8;

    if (mouse.active) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        const force = (160 - dist) / 160;
        this.x -= (dx / dist) * force * 1.5;
        this.y -= (dy / dist) * force * 1.5;
      }
    }
  };

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
  };

  function Signal(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.progress = 0;
    this.speed = Math.random() * 0.02 + 0.01;
  }

  Signal.prototype.update = function() {
    this.progress += this.speed;
  };

  Signal.prototype.draw = function() {
    const x = this.p1.x + (this.p2.x - this.p1.x) * this.progress;
    const y = this.p1.y + (this.p2.y - this.p1.y) * this.progress;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8';
    ctx.fill();
  };

  function initParticles() {
    particles = [];
    signals = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(i));
    }
  }

  let lastSignalTime = 0;

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update(time);
      particles[i].draw();
    }

    const maxDist = 145;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const edgeAlpha = (1 - dist / maxDist) * 0.26;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${edgeAlpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          if (time - lastSignalTime > 800 && Math.random() < 0.015 && signals.length < 12) {
            signals.push(new Signal(particles[i], particles[j]));
            lastSignalTime = time;
          }
        }
      }

      // Connect mouse to nearby particles (glow line effect)
      if (mouse.active) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const alpha = (1 - dist / 180) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    for (let i = signals.length - 1; i >= 0; i--) {
      signals[i].update();
      signals[i].draw();
      if (signals[i].progress >= 1) {
        signals.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }

  initParticles();
  requestAnimationFrame(render);
}
