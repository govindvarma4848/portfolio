/*
===================================================
🧠 CORE LOGIC ENGINE: FUTURISTIC AI PORTFOLIO
===================================================
Student: Adapa Govind Varma [CSE - Artificial Intelligence]
Components: Canvas Engines, Typing, Charts, Timeline, Heatmap
===================================================
*/

document.addEventListener('DOMContentLoaded', () => {

  // ====================================================
  // 1️⃣ LOADER SYSTEM
  // ====================================================
  const loaderPct = document.getElementById('loader-pct');
  const loaderStatus = document.getElementById('loader-status');
  const loaderScreen = document.getElementById('loader-screen');

  let percentage = 0;
  const statusTexts = [
    { limit: 20, text: 'Initializing AI Core...' },
    { limit: 50, text: 'Loading Neural Synapses...' },
    { limit: 80, text: 'Synchronizing Cyber Deck...' },
    { limit: 95, text: 'Establishing Secure Protocol...' },
    { limit: 100, text: 'Access Granted!' }
  ];

  const loaderInterval = setInterval(() => {
    percentage += Math.floor(Math.random() * 8) + 2;
    if (percentage >= 100) {
      percentage = 100;
      clearInterval(loaderInterval);

      // Access Granted Animation
      loaderPct.textContent = '100%';
      loaderStatus.textContent = 'Access Granted!';
      loaderStatus.style.color = 'var(--cyan-accent)';

      setTimeout(() => {
        loaderScreen.style.opacity = '0';
        loaderScreen.style.visibility = 'hidden';
        // Initialize GSAP intro reveals once loaded
        playIntroAnimations();
      }, 600);
    } else {
      loaderPct.textContent = `${percentage}%`;
      const currentStatus = statusTexts.find(s => percentage <= s.limit);
      if (currentStatus) {
        loaderStatus.textContent = currentStatus.text;
      }
    }
  }, 80);

  // ====================================================
  // 🌌 ADVANCED LIVE BACKGROUND SYSTEM (HTML5 Canvas)
  // ====================================================

  // LAYER 1: 3D Connected Particles Engine
  const bgCanvas = document.getElementById('bg-canvas');
  const ctx = bgCanvas.getContext('2d');

  // LAYER 2: Matrix Rain Engine
  const matrixCanvas = document.getElementById('matrix-canvas');
  const mCtx = matrixCanvas.getContext('2d');

  let width = bgCanvas.width = matrixCanvas.width = window.innerWidth;
  let height = bgCanvas.height = matrixCanvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = bgCanvas.width = matrixCanvas.width = window.innerWidth;
    height = bgCanvas.height = matrixCanvas.height = window.innerHeight;
    initializeMatrixRain();
  });

  // Mouse Coordinates
  const mouse = { x: null, y: null, radius: 150 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.baseRadius = Math.random() * 2 + 1;
      this.radius = this.baseRadius;
      this.color = Math.random() > 0.5 ? '#00F5FF' : '#7B2EFF';
      this.depth = Math.random(); // Parallax Depth factor
    }

    update() {
      // Basic drift
      this.x += this.vx * (1 + this.depth * 0.5);
      this.y += this.vy * (1 + this.depth * 0.5);

      // Boundary loop
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interactive push/avoidance
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 4;
          this.y += Math.sin(angle) * force * 4;
          this.radius = this.baseRadius * (1 + force * 2);
        } else {
          this.radius = this.baseRadius;
        }
      } else {
        this.radius = this.baseRadius;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.radius * 2;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  // Populate Particle Array
  const particles = Array.from({ length: 90 }, () => new Particle());

  // Connecting line drawing function (Neural Network representation)
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          const alpha = (120 - dist) / 120 * 0.15;
          ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // 🟩 MATRIX RAIN OVERLAY
  const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ🤖💻🧠🧬⚡'.split('');
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let drops = [];

  function initializeMatrixRain() {
    columns = Math.floor(width / fontSize);
    drops = Array.from({ length: columns }, () => 1);
  }
  initializeMatrixRain();

  function drawMatrixRain() {
    // Fade out previous frames without painting a solid background color.
    // This keeps the canvas transparent so the live video background is visible underneath.
    mCtx.globalCompositeOperation = 'destination-out';
    mCtx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    mCtx.fillRect(0, 0, width, height);

    // Reset composite operation to draw the new characters
    mCtx.globalCompositeOperation = 'source-over';
    mCtx.fillStyle = 'rgba(0, 255, 209, 0.35)'; // Cyan-green overlay text
    mCtx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      mCtx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  // Unified Background Render Loop
  function renderBackground() {
    // Layer 1 render
    ctx.clearRect(0, 0, width, height);

    // Draw cursor light trail aura (spotlight glow)
    if (mouse.x !== null && mouse.y !== null) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
      gradient.addColorStop(0, 'rgba(123, 46, 255, 0.06)');
      gradient.addColorStop(0.5, 'rgba(0, 245, 255, 0.02)');
      gradient.addColorStop(1, 'rgba(5, 8, 22, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();

    // Layer 2 matrix render
    drawMatrixRain();

    requestAnimationFrame(renderBackground);
  }
  renderBackground();

  // ====================================================
  // 🗣️ TYPED WRITER EFFECT
  // ====================================================
  const typingTextEl = document.getElementById('typing-text');
  const roles = ['AI Developer', 'Java FullStack Developer', 'Machine Learning Enthusiast', 'CSE(AI) Student'];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingTextEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      typingTextEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of role
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
  }
  setTimeout(typeEffect, 1200);

  // ====================================================
  // ⚡ INTRO & MICRO-ANIMATIONS (GSAP)
  // ====================================================
  function playIntroAnimations() {
    if (typeof gsap !== 'undefined') {
      gsap.from('.hero-pre', { duration: 0.8, opacity: 0, x: -30, ease: 'power2.out' });
      gsap.from('.hero-name', { duration: 1, opacity: 0, y: 30, delay: 0.2, ease: 'power3.out' });
      gsap.from('.hero-typing', { duration: 0.8, opacity: 0, delay: 0.4 });
      gsap.from('.hero-intro', { duration: 1, opacity: 0, y: 20, delay: 0.6 });
      gsap.from('.hero-actions', { duration: 0.8, opacity: 0, y: 15, delay: 0.8 });
      gsap.from('.hero-socials', { duration: 0.8, opacity: 0, delay: 1 });
      gsap.from('.hero-image-container', { duration: 1.2, scale: 0.8, opacity: 0, rotation: 5, delay: 0.4, ease: 'elastic.out(1, 0.75)' });
    }
  }

  // ====================================================
  // 📜 SCROLL REVEAL & SKILLS METERS (IntersectionObserver)
  // ====================================================
  const revealElements = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const circleProgressElements = document.querySelectorAll('.circle-progress');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Trigger specific animations on child nodes
        if (entry.target.id === 'skills') {
          animateSkillBars();
          animateCircleDials();
        }
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => scrollObserver.observe(el));

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percent');
      bar.style.width = percentage;
    });
  }

  function animateCircleDials() {
    circleProgressElements.forEach(dial => {
      const percentage = dial.getAttribute('data-percent');
      const fillCircle = dial.querySelector('.circle-fill');

      if (fillCircle) {
        // Circumference of radius 40 circle is 251.2
        const strokeOffset = 251.2 - (251.2 * percentage) / 100;
        fillCircle.style.strokeDashoffset = strokeOffset;
      }
    });
  }

  // ====================================================
  // 📊 CHART.JS INTEGRATIONS (Neon Styling)
  // ====================================================
  if (typeof Chart !== 'undefined') {

    // Global Config Defaults
    Chart.defaults.color = '#9CA3AF';
    Chart.defaults.font.family = 'Inter';

    // 1. Radar Chart (Skills Parameters)
    const ctxRadar = document.getElementById('skillsRadarChart').getContext('2d');

    // Create neon gradients
    const radarFillGradient = ctxRadar.createRadialGradient(150, 150, 10, 150, 150, 150);
    radarFillGradient.addColorStop(0, 'rgba(123, 46, 255, 0.1)');
    radarFillGradient.addColorStop(1, 'rgba(0, 245, 255, 0.15)');

    new Chart(ctxRadar, {
      type: 'radar',
      data: {
        labels: ['Problem Solving', 'Algorithm Design', 'Web Dev', 'AI/ML Logic', 'Database Ops', 'OOPs Architecture'],
        datasets: [{
          label: 'Capability Vector',
          data: [85, 90, 80, 85, 75, 80],
          backgroundColor: radarFillGradient,
          borderColor: '#00F5FF',
          borderWidth: 2,
          pointBackgroundColor: '#00FFD1',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#7B2EFF',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          r: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
            suggestedMin: 50,
            suggestedMax: 100,
            ticks: { display: false }
          }
        }
      }
    });

    // 2. Line Chart (Coding Progress velocity)
    const ctxLine = document.getElementById('codingProgressChart').getContext('2d');

    const lineStrokeGradient = ctxLine.createLinearGradient(0, 0, 0, 300);
    lineStrokeGradient.addColorStop(0, 'rgba(0, 245, 255, 0.4)');
    lineStrokeGradient.addColorStop(1, 'rgba(123, 46, 255, 0)');

    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Today'],
        datasets: [{
          label: 'Total Solved Log',
          data: [50, 110, 160, 210, 260, 310], // LeetCode + GFG cumulatives
          borderColor: '#00F5FF',
          borderWidth: 3,
          backgroundColor: lineStrokeGradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#7B2EFF',
          pointBorderColor: '#00FFD1',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });

    // 3. Doughnut Chart (System Competence Distribution)
    const ctxDoughnut = document.getElementById('competenceDoughnutChart').getContext('2d');
    new Chart(ctxDoughnut, {
      type: 'doughnut',
      data: {
        labels: ['Python / ML Core', 'Java / OOPs Logic', 'Web Technologies'],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: [
            'rgba(0, 245, 255, 0.75)',
            'rgba(123, 46, 255, 0.75)',
            'rgba(0, 255, 209, 0.75)'
          ],
          borderColor: '#050816',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, padding: 15 }
          }
        },
        cutout: '65%'
      }
    });
  }

  // ====================================================
  // 📈 GENERATE GITHUB ACTIVITY HEATMAP
  // ====================================================
  const heatmapGrid = document.getElementById('heatmap-grid');
  if (heatmapGrid) {
    // 53 columns * 7 rows = 371 cells (approx 1 year contribution grid)
    for (let i = 0; i < 371; i++) {
      const cell = document.createElement('div');
      cell.classList.add('heatmap-cell');

      // Randomize activity levels (realistic clustering)
      const rand = Math.random();
      if (rand > 0.85) {
        cell.classList.add('heatmap-level-4');
      } else if (rand > 0.7) {
        cell.classList.add('heatmap-level-3');
      } else if (rand > 0.5) {
        cell.classList.add('heatmap-level-2');
      } else if (rand > 0.25) {
        cell.classList.add('heatmap-level-1');
      }
      heatmapGrid.appendChild(cell);
    }
  }

  // ====================================================
  // 📱 MOBILE NAVIGATION BAR MENU TOGGLE
  // ====================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });
  }

  // Close Mobile Menu on nav item click
  const navMenuItems = document.querySelectorAll('.nav-link');
  navMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });
  });

  // Track scroll position to update Active Nav Link
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 150;
    document.querySelectorAll('section').forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navMenuItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sec.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ====================================================
  // 📮 CONTACT FORM TRANSMISSION LOGIC
  // ====================================================
  const contactForm = document.getElementById('cyber-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> TRANSMITTING...';
      submitBtn.disabled = true;

      // Simulate network payload delay
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> TRANSMISSION SENT';
        submitBtn.style.background = 'linear-gradient(135deg, var(--cyan-accent), var(--neon-blue))';
        submitBtn.style.boxShadow = '0 0 15px var(--cyan-accent)';

        // Reset Form Fields after smooth window animation
        alert('Transmission Received Securely! Govind Varma will get in touch with you ASAP.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = origText;
          submitBtn.style.background = '';
          submitBtn.style.boxShadow = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

});