'use strict';

/* ================================================================
   SARIDIS SHK - INGOLSTADT
   Engine (app.js) v8.0
   Lenis + GSAP ScrollTrigger + Live-Alarm Demo-Tracker + Simulator
   ================================================================ */

// === LENIS SMOOTH SCROLL ===
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    smoothTouch: false, /* Wichtig: natives Touchverhalten auf Mobilgeräten */
    autoResize: true,
  });

  if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Sanfte Anchor-Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id && id !== '#') {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -70 });
        }
      }
    });
  });
}

// === PRIMITIV 1: KINETIC TYPOGRAPHY ===
function initKineticTypography() {
  if (typeof SplitType === 'undefined' || typeof gsap === 'undefined') return;
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const split = new SplitType(heroTitle, { types: 'words,chars' });
    gsap.from(split.chars, {
      opacity: 0,
      y: 50,
      rotateX: -25,
      stagger: 0.018,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.15
    });
  }
}

// === PRIMITIV 2: SCROLL ANIMATIONS ===
function initScrollAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.utils.toArray('[data-animate="fade-up"]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// === PRIMITIV 4: DYNAMIC COUNTERS ===
function initCounters() {
  if (typeof gsap === 'undefined') return;
  document.querySelectorAll('.stat-counter').forEach(el => {
    const target = parseFloat(el.dataset.target || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isDecimal = String(el.dataset.target || '').includes('.');
    const duration = parseFloat(el.dataset.duration || '2.0');

    gsap.fromTo({ val: 0 }, { val: target }, {
      duration: duration,
      ease: 'power2.out',
      onUpdate: function() {
        const current = this.targets()[0].val;
        const formatted = isDecimal ? current.toFixed(1).replace('.', ',') : Math.round(current).toLocaleString('de-DE');
        el.textContent = prefix + formatted + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// === PRIMITIV 6: NATIVE CSS-3D PERSPECTIVE TILT ===
function init3DTilt() {
  const isTouch = window.matchMedia('(hover: none)').matches;
  document.querySelectorAll('.card-3d').forEach(card => {
    if (!isTouch) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / (rect.height / 2)) * 6;
        const rotateY = (x / (rect.width / 2)) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    }
  });
}

// === PRIMITIV 9: INTERACTIVE VORWAND-SLIDER (Before/After) ===
function initVorwandSlider() {
  const container = document.querySelector('[data-vorwand-slider]');
  if (!container) return;
  const handle = container.querySelector('.vorwand-handle');
  const rawLayer = container.querySelector('.vorwand-layer.raw');
  if (!handle || !rawLayer) return;

  let isDown = false;
  const updatePos = (clientX) => {
    const rect = container.getBoundingClientRect();
    const pos = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = (pos / rect.width) * 100;
    handle.style.left = `${pct}%`;
    rawLayer.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
  };

  handle.addEventListener('mousedown', () => isDown = true);
  window.addEventListener('mouseup', () => isDown = false);
  window.addEventListener('mousemove', (e) => { if (isDown) updatePos(e.clientX); });

  container.addEventListener('touchstart', () => isDown = true, { passive: true });
  window.addEventListener('touchend', () => isDown = false);
  container.addEventListener('touchmove', (e) => {
    if (isDown && e.touches.length) updatePos(e.touches[0].clientX);
  }, { passive: true });

  // Initiale 50% Position
  updatePos(container.getBoundingClientRect().left + container.offsetWidth * 0.52);
}

// === PRIMITIV 10: DYNAMIC SVG PATH DRAWING ===
function initSvgPathDraw() {
  document.querySelectorAll('[data-svg-draw]').forEach(svg => {
    const paths = svg.querySelectorAll('path, line, polyline');
    paths.forEach(p => {
      const len = p.getTotalLength ? p.getTotalLength() : 600;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      if (typeof gsap !== 'undefined') {
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: svg,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }
    });
  });
}

// === TAGESZEIT-PERSONALISIERUNG ===
function initTimeGreeting() {
  const el = document.querySelector('[data-time-greeting]');
  if (!el) return;
  const h = new Date().getHours();
  let greeting;
  if (h >= 6 && h < 12) {
    greeting = 'Guten Morgen in Ingolstadt';
  } else if (h >= 12 && h < 19) {
    greeting = 'Guten Tag in Ingolstadt';
  } else {
    greeting = 'Guten Abend';
  }
  const isOffHours = h < 7 || h >= 19;
  el.textContent = `${greeting} — ${isOffHours ? 'Dringendes Anliegen? Wir sind für Sie erreichbar.' : 'Meisterhafte Bad- & Heiztechnik.'}`;
}

// === MOBILE NAVIGATION ===
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  const open = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menu.removeAttribute('hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const close = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('hidden', '');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  hamburger.addEventListener('click', () => {
    hamburger.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      close();
      if (targetId && targetId.startsWith('#') && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          setTimeout(() => {
            if (lenis) lenis.scrollTo(target, { offset: -70 });
            else target.scrollIntoView({ behavior: 'smooth' });
          }, 60);
        }
      }
    });
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// === MODALS (Impressum & Datenschutz) ===
function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById(trigger.dataset.modalOpen);
      if (!modal) return;
      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();
      const focusable = modal.querySelector('button, [href], input, select, textarea');
      if (focusable) focusable.focus();
    });
  });

  const closeAll = () => {
    document.querySelectorAll('.modal:not([hidden])').forEach(m => {
      m.setAttribute('hidden', '');
      m.setAttribute('aria-hidden', 'true');
    });
    if (lenis) lenis.start();
  };

  document.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', closeAll);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
}

// === DSGVO CONSENT (Two-Click Maps) ===
function initConsent() {
  const KEY = 'saridis_consent_v1';
  const banner = document.getElementById('consentBanner');
  const stored = localStorage.getItem(KEY);

  function applyConsent(accepted) {
    if (accepted) {
      document.querySelectorAll('iframe[data-src]').forEach(f => {
        f.src = f.dataset.src;
      });
    }
    if (banner) banner.hidden = true;
  }

  if (stored === 'accepted') applyConsent(true);
  else if (stored === 'rejected') applyConsent(false);
  else if (banner) banner.hidden = false;

  document.getElementById('consentAccept')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'accepted');
    applyConsent(true);
  });
  document.getElementById('consentReject')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'rejected');
    applyConsent(false);
  });
  document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(KEY);
    if (banner) banner.hidden = false;
  });
}

// === HEADER SCROLL STATE ===
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// === ERLEBNIS-KONTAKTPUNKT ===
function initExperienceContact() {
  const container = document.querySelector('[data-experience-contact]');
  const form = document.getElementById('contactForm');
  if (!container || !form) return;

  const fallback = document.getElementById('formFallback');
  const status = document.getElementById('formStatus');
  const badges = container.querySelectorAll('.step-badge');
  const panels = container.querySelectorAll('.step-panel');

  function goToStep(stepNum) {
    panels.forEach(p => {
      const isTarget = p.id === `stepPanel${stepNum}`;
      p.hidden = !isTarget;
      p.classList.toggle('active', isTarget);
    });
    badges.forEach(b => {
      const isActive = parseInt(b.dataset.step) === stepNum;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const activePanel = container.querySelector(`.step-panel#stepPanel${stepNum}`);
    if (activePanel) {
      const firstInput = activePanel.querySelector('input:not([type="hidden"]), select, textarea, button');
      if (firstInput) firstInput.focus();
    }
  }

  container.querySelectorAll('[data-goto-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.dataset.gotoStep);
      goToStep(targetStep);
    });
  });

  badges.forEach(b => {
    b.addEventListener('click', () => {
      const step = parseInt(b.dataset.step);
      goToStep(step);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btnSubmitContact');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Meister-Anfrage wird übermittelt…';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        if (status) {
          status.textContent = 'Vielen Dank! Ihre Anfrage ist direkt bei Meister Saridis eingegangen. Wir melden uns verlässlich innerhalb von 24 Stunden.';
          status.style.color = 'var(--sc-accent)';
        }
        form.reset();
        goToStep(1);
      } else {
        if (fallback) fallback.style.display = 'block';
        form.style.display = 'none';
      }
    } catch {
      if (fallback) fallback.style.display = 'block';
      form.style.display = 'none';
    }
  });
}

// === SIGNATURE FEATURE: BAD- & HEIZUNGS-SIMULATOR ===
function initSimulator() {
  const sim = document.getElementById('shkSimulator');
  if (!sim) return;

  let currentScope = 'bad'; // 'bad' | 'heizung' | 'kombi'
  const scopeTabs = sim.querySelectorAll('[data-scope-tab]');
  const sizeSlider = document.getElementById('simSizeSlider');
  const sizeDisplay = document.getElementById('simSizeDisplay');
  const badControls = document.getElementById('simBadControls');
  const heizControls = document.getElementById('simHeizControls');
  const resDuration = document.getElementById('simResDuration');
  const resPriceSpan = document.getElementById('simResPrice');
  const resKfw = document.getElementById('simResKfw');
  const waBtn = document.getElementById('simWaBtn');

  function calculate() {
    const size = parseInt(sizeSlider ? sizeSlider.value : '10');
    if (sizeDisplay) sizeDisplay.textContent = `${size} m² Fläche`;

    let durationDays = '12–14';
    let priceText = 'ca. 11.500 – 16.000 €';
    let kfwText = 'KfW-Förderung nicht anwendbar (Sanitär)';
    let summaryText = `Badsanierung ${size} m²`;

    if (currentScope === 'bad') {
      if (size <= 6) {
        durationDays = '9–11 Werktage';
        priceText = 'ca. 8.500 – 12.500 €';
      } else if (size <= 14) {
        durationDays = '12–15 Werktage';
        priceText = 'ca. 13.000 – 19.500 €';
      } else {
        durationDays = '15–18 Werktage';
        priceText = 'ca. 20.000 – 28.000 €+';
      }
      kfwText = 'KfW Barrierereduzierung (Zuschuss 455-B bis zu 2.500 €)';
      summaryText = `Komplettbadsanierung (${size} m² in Ingolstadt)`;
    } else if (currentScope === 'heizung') {
      durationDays = '3–5 Werktage';
      priceText = 'ca. 14.000 – 24.000 € (Brutto vor Abzug)';
      kfwText = 'Bis zu 70 % KfW-Zuschuss (max. 21.000 € Förderung)';
      summaryText = `Heizungstausch / Wärmepumpe (Gebäude ca. ${size * 10} m² Wohnfläche)`;
    } else if (currentScope === 'kombi') {
      durationDays = '15–19 Werktage';
      priceText = 'ca. 24.000 – 38.000 € (Paketpreis)';
      kfwText = 'Maximale Kombination: KfW Heizung (bis 70%) + Bad';
      summaryText = `Kombi-Modernisierung (Bad ${size} m² + Wärmepumpe)`;
    }

    if (resDuration) resDuration.textContent = durationDays;
    if (resPriceSpan) resPriceSpan.textContent = priceText;
    if (resKfw) resKfw.textContent = kfwText;

    if (waBtn) {
      const waText = encodeURIComponent(
        `Hallo Herr Saridis, ich habe auf Ihrer Website das Vorhaben berechnet:\n` +
        `• Bereich: ${summaryText}\n` +
        `• Geschätzte Dauer: ${durationDays}\n` +
        `• Förder-Status: ${kfwText}\n\n` +
        `Wann hätten Sie Zeit für eine unverbindliche Vor-Ort-Besichtigung bei mir in Ingolstadt?`
      );
      waBtn.href = `https://wa.me/4915237384702?text=${waText}`;
    }
  }

  scopeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      scopeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentScope = tab.dataset.scopeTab;

      if (badControls) badControls.hidden = currentScope === 'heizung';
      if (heizControls) heizControls.hidden = currentScope === 'bad';

      calculate();
    });
  });

  if (sizeSlider) {
    sizeSlider.addEventListener('input', calculate);
  }

  calculate();
}

// === DEMO LIVE-ALARM TRACKER ===
function initDemoTracker() {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return;

  const startTime = Date.now();
  const company = 'Saridis SHK Ingolstadt';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const deviceType = isMobile ? 'Smartphone (Mobil)' : 'Desktop-PC';
  const referrer = document.referrer || 'Direktaufruf';

  let pingSent = false;
  let exitSent = false;
  const clickedActions = new Set();

  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => {
      clickedActions.add(el.getAttribute('data-track'));
    });
  });

  async function sendAlert(stage) {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const durationText = elapsedSeconds < 60 ? `${elapsedSeconds}s` : `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s`;

    let statusText = '⚡ Reingeschaut';
    let empfehlung = 'Follow-Up am Donnerstag via WhatsApp vorbereiten.';

    if (elapsedSeconds >= 40 || clickedActions.size > 0) {
      statusText = '🔥 HEISS! Hohes Interesse & Klicks!';
      empfehlung = 'In den nächsten 15–20 Minuten per WhatsApp melden: „Servus Herr Saridis, haben Sie den Entwurf prüfen können?...“';
    } else if (elapsedSeconds >= 18) {
      statusText = '👍 WARM! Hat aufmerksam gescrollt.';
      empfehlung = 'Follow-Up vorbereiten.';
    }

    const clickedList = clickedActions.size > 0 ? Array.from(clickedActions).join(', ') : 'Nur gescrollt';
    const message = `🔔 [NEXBOT LIVE-ALARM] Meister schaut Demo an!\n\n` +
      `🏢 Firma: ${company}\n` +
      `📱 Gerät: ${deviceType}\n` +
      `🔗 Quelle: ${referrer}\n` +
      `⏱️ Verweildauer: ${durationText}\n` +
      `🎯 Klicks: ${clickedList}\n` +
      `📊 Status: ${statusText}\n\n` +
      `💡 Empfehlung für Raphael:\n${empfehlung}`;

    // 1. Telegram Push
    try {
      /* Legacy Telegram Alert disabled in favor of nexbot-radar.js */
    } catch (_) {}

    // 2. Formspree Backup
    try {
      fetch('https://formspree.io/f/xbjnqkyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ subject: `🔥 [LIVE-ALARM] ${company} (${durationText})`, message: message }),
        keepalive: true
      }).catch(() => {});
    } catch (_) {}
  }

  setTimeout(() => {
    if (!pingSent) {
      pingSent = true;
      sendAlert('initial');
    }
  }, 5000);

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && !exitSent) {
      exitSent = true;
      sendAlert('exit');
    }
  });
}

// === DOM READY ===
document.addEventListener('DOMContentLoaded', () => {
  initDemoTracker();
  initTimeGreeting();
  initConsent();
  initMobileNav();
  initModals();
  initHeader();
  initExperienceContact();
  initSimulator();
  initVorwandSlider();

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    initKineticTypography();
    initScrollAnimations();
    initCounters();
    init3DTilt();
    initSvgPathDraw();
  }
});
