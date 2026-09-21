/* ==========================================================================
   Shivangi Srivastava - Portfolio Interactive Script (Data-Driven)
   ========================================================================== */

let PROJECTS_DATA = [
  {
    "id": "career-rag",
    "title": "AI Career RAG Assistant",
    "subtitle": "Enterprise RAG Architecture & Skill Gap Engine",
    "badge": "Generative AI & RAG Engine",
    "category": "rag",
    "card_class": "card-cyan",
    "github_url": "https://github.com/shivangisrivastava013/AI-Career-RAG-Assistant",
    "results_url": "https://github.com/shivangisrivastava013/AI-Career-RAG-Assistant/tree/main/results",
    "demo_url": null,
    "description": "RAG-based career assistant matching candidate profiles against a synthetic 50-job benchmark. Features two-stage retrieval with Sentence Transformers and FAISS, structured required/preferred skill extraction, and template-based recommendations.",
    "tech": ["Python", "RAG", "Sentence Transformers", "FAISS", "Streamlit", "Docker"],
    "metrics": [
      { "label": "Recall@5", "value": "0.9333", "context": "50-job synthetic benchmark" },
      { "label": "MRR", "value": "0.8367", "context": "Mean Reciprocal Rank" },
      { "label": "Skill F1", "value": "0.9085", "context": "Structured skill extraction" }
    ]
  },
  {
    "id": "gnn-citation",
    "title": "GNN Citation Network Classification",
    "subtitle": "PyTorch Geometric Multi-Model Benchmark",
    "badge": "Graph Machine Learning",
    "category": "graph",
    "card_class": "card-sky",
    "github_url": "https://github.com/shivangisrivastava013/GNN-Citation-Network-Classification",
    "results_url": "https://github.com/shivangisrivastava013/GNN-Citation-Network-Classification/tree/main/results",
    "demo_url": null,
    "description": "PyTorch Geometric framework evaluating MLP, GCN, and GraphSAGE on Cora and Citeseer datasets. Evaluated across 5 random seeds using validation early stopping and single test set evaluation.",
    "tech": ["PyTorch Geometric", "GCN", "GraphSAGE", "PyTorch", "Planetoid", "Docker"],
    "metrics": [
      { "label": "Cora GCN Acc", "value": "80.72% ± 0.93%", "context": "5-seed average" },
      { "label": "Cora GCN F1", "value": "0.8007", "context": "Macro F1" },
      { "label": "Citeseer GraphSAGE Acc", "value": "68.30% ± 0.51%", "context": "5-seed average" }
    ]
  },
  {
    "id": "ros2-nav",
    "title": "ROS 2 Autonomous Robot Navigation",
    "subtitle": "Colcon Package, State Machine & Zenoh Telemetry",
    "badge": "Robotics & Middleware",
    "category": "robotics",
    "card_class": "card-emerald",
    "github_url": "https://github.com/shivangisrivastava013/ROS2-Autonomous-Robot-Navigation",
    "results_url": "https://github.com/shivangisrivastava013/ROS2-Autonomous-Robot-Navigation/tree/main/results",
    "demo_url": null,
    "description": "Functional ROS 2 Humble package featuring rclpy nodes for laser scans (/scan), odometry (/odom), and cmd_vel commands. Includes state-machine obstacle avoidance, YOLO perception node, Gazebo world launch files, and Zenoh/PostgreSQL telemetry.",
    "tech": ["ROS 2 Humble", "rclpy", "YOLOv8", "Gazebo", "Zenoh", "PostgreSQL", "Docker"],
    "metrics": [
      { "label": "Package Build", "value": "colcon build", "context": "ROS 2 Humble package" },
      { "label": "Perception", "value": "YOLO Node", "context": "Obstacle detection" },
      { "label": "Telemetry", "value": "Zenoh / Postgres", "context": "Distributed logging" }
    ]
  },
  {
    "id": "sam2-vision",
    "title": "SAM 2 Vision Pipeline Benchmark",
    "subtitle": "YOLO Detection & Meta SAM 2 Segmentation",
    "badge": "Foundation Vision Models",
    "category": "cv",
    "card_class": "card-blue",
    "github_url": "https://github.com/shivangisrivastava013/SAM2-Image-Segmentation",
    "results_url": "https://github.com/shivangisrivastava013/SAM2-Image-Segmentation/tree/main/results",
    "demo_url": null,
    "description": "Multi-stage visual segmentation pipeline combining YOLO bounding-box detection with Meta SAM 2 promptable mask segmentation. Includes benchmark runner and mock CPU validation mode.",
    "tech": ["SAM 2", "YOLO", "PyTorch", "OpenCV", "PyTest", "Docker"],
    "metrics": [
      { "label": "Test Suite", "value": "100% Pass", "context": "11/11 PyTest cases" },
      { "label": "Pipeline Mode", "value": "Zero-Shot SAM 2", "context": "Promptable segmentation" }
    ]
  },
  {
    "id": "robotic-pouring",
    "title": "Precision Robotic Pouring Motion Control",
    "subtitle": "Gymnasium Simulation & RL Benchmark",
    "badge": "Continuous Control & RL",
    "category": "robotics",
    "card_class": "card-amber",
    "github_url": "https://github.com/shivangisrivastava013/Robotic-Pouring-Motion-Control",
    "results_url": "https://github.com/shivangisrivastava013/Robotic-Pouring-Motion-Control/tree/main/results",
    "demo_url": null,
    "description": "Gymnasium continuous-control environment modeling numerical fluid dynamics. Benchmarks Rule-Based and PID feedback controllers against PPO and SAC continuous reinforcement learning baselines.",
    "tech": ["Gymnasium", "Stable-Baselines3", "PPO", "SAC", "PID", "PyTorch", "Docker"],
    "metrics": [
      { "label": "Rule-Based & PID", "value": "100.0% Success", "context": "MAE 2.9 - 5.5 ml" },
      { "label": "PPO (RL)", "value": "40.0% Success", "context": "After reward shaping" },
      { "label": "SAC (RL)", "value": "0.0% Success", "context": "Continuous RL baseline" }
    ]
  },
  {
    "id": "nlp-summarizer",
    "title": "NLP Transformer Summarizer & Sentiment Workbench",
    "subtitle": "Long-Document Chunking & ROUGE Evaluation",
    "badge": "Natural Language Processing",
    "category": "nlp",
    "card_class": "card-indigo",
    "github_url": "https://github.com/shivangisrivastava013/NLP-Transformer-Summarizer",
    "results_url": "https://github.com/shivangisrivastava013/NLP-Transformer-Summarizer/tree/main/results",
    "demo_url": null,
    "description": "Long-document summarization workbench featuring token-aware sliding window chunking, hierarchical BART/Flan-T5 models, 3-class sentiment analysis, ROUGE/BERTScore evaluation, and interactive Streamlit UI.",
    "tech": ["Hugging Face", "BART", "Flan-T5", "ROUGE", "BERTScore", "Streamlit", "Docker"],
    "metrics": [
      { "label": "Chunking", "value": "Token-Aware", "context": "Sliding window overlap" },
      { "label": "Evaluation", "value": "ROUGE & BERTScore", "context": "Reproducible benchmark" },
      { "label": "Sentiment", "value": "3-Class Calibrated", "context": "Positive/Negative/Neutral" }
    ]
  },
  {
    "id": "shadowtag",
    "title": "ShadowTag - Image Watermarking",
    "subtitle": "Convolutional Autoencoders for Steganography",
    "badge": "Private Academic Research Project",
    "category": "cv",
    "card_class": "card-amber",
    "github_url": null,
    "results_url": null,
    "demo_url": null,
    "description": "Convolutional encoder-decoder architecture embedding invisible watermarks into images and recovering them post distortions (JPEG compression, cropping). Private academic research project.",
    "tech": ["Python", "TensorFlow", "PyTorch", "OpenCV", "Autoencoders"],
    "metrics": [
      { "label": "PSNR", "value": "34.7 dB", "context": "Image fidelity" },
      { "label": "SSIM", "value": "0.96", "context": "Structural similarity" },
      { "label": "Recovery", "value": "94.2%", "context": "Post distortion" }
    ]
  },
  {
    "id": "neuralscene",
    "title": "NeuralScene 3DGS",
    "subtitle": "3D Gaussian Splatting Room Reconstruction",
    "badge": "Private Academic Research Project",
    "category": "3d",
    "card_class": "card-indigo",
    "github_url": null,
    "results_url": null,
    "demo_url": null,
    "description": "Reconstructed interior spaces from 150 Polycam images using COLMAP for camera poses and 3D Gaussian Splatting with gsplat. Private academic research project.",
    "tech": ["COLMAP", "3DGS", "gsplat", "PyTorch", "CUDA"],
    "metrics": [
      { "label": "PSNR", "value": "29.8 dB", "context": "Novel view rendering" },
      { "label": "SSIM", "value": "0.94", "context": "Structural accuracy" },
      { "label": "LPIPS", "value": "0.12", "context": "Perceptual metric" }
    ]
  }
];

async function loadProjectsData() {
  try {
    const res = await fetch('data/projects.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        PROJECTS_DATA = data;
      }
    }
  } catch (err) {
    console.info('Loaded fallback PROJECTS_DATA array for local file:// protocol');
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
  initPortfolioAssistant();
  initAccessibility();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
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
        actionButtons += `<a href="${data.results_url}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fa-solid fa-chart-line"></i> View Artifacts</a>`;
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

        <h4 style="color: var(--text-main); margin-bottom: 8px;">Committed Empirical Metrics:</h4>
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
          toast.innerText = `Copied "${text}" to clipboard!`;
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 3000);
        }
      });
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

    // Append user message
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
      reply = "NLP Transformer Summarizer: Long-document summarization with token-aware chunking, hierarchical BART/Flan-T5 models, 3-class sentiment, and ROUGE evaluation.";
    } else if (lower.includes('github') || lower.includes('code') || lower.includes('repo')) {
      reply = "All code repositories are available at https://github.com/shivangisrivastava013 with direct links on each project card.";
    } else {
      reply = "Shivangi's portfolio features 7 projects across RAG, Graph ML, ROS 2 Robotics, Vision Foundation Models, and Continuous Control RL. Click any project card for direct code links!";
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

/* --- 9. Laser Pointer Effect --- */
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
}

/* --- 10. Dynamic Neural Background Canvas --- */
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

  let particles = [];
  const numParticles = Math.min(Math.floor((width * height) / 16000), 75);

  function Particle(id) {
    this.id = id;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.baseRadius = Math.random() * 2 + 1.2;
    this.radius = this.baseRadius;
    this.color = Math.random() > 0.5 ? '6, 182, 212' : '56, 189, 248';
    this.alpha = Math.random() * 0.45 + 0.3;
  }

  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  };

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
  };

  function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(i));
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    const maxDist = 145;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.25 * (1 - dist / maxDist)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }

  initParticles();
  requestAnimationFrame(render);
}
