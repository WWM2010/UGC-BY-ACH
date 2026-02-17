const defaultConfig = {
  hero_headline: 'Authentic. Aesthetic. Faceless.',
  hero_subheadline: 'High-converting UGC content for brands who let the product be the star.',
  about_title: 'Meet ACH',
  about_description: 'A Muslim creator with an eye for detail and a passion for clean, organized living. I believe that beautiful content doesn\'t require showing your face—it requires intention, aesthetics, and understanding what makes products shine.',
  cta_button_text: 'Request Custom Quote',
  background_color: '#F5F0EB',
  surface_color: '#E8DFD4',
  text_color: '#2C2C2C',
  accent_color: '#8B7355',
  button_color: '#2C2C2C'
};

let config = { ...defaultConfig };

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Apply button animation class to button-like elements
function enhanceButtons() {
  const selectors = [
    'a[href^="#"]',
    'a[href^="mailto:"]',
    'a[href^="http"]',
    'button'
  ];

  const elements = document.querySelectorAll(selectors.join(','));

  elements.forEach(el => {
    const isChip = el.className && (el.className.includes('rounded-full') || el.className.includes('px-') || el.className.includes('py-'));
    if (isChip) {
      el.classList.add('btn-animated');
    }
  });
}

window.addEventListener('DOMContentLoaded', enhanceButtons);

// Scroll-triggered reveal animations
function setupScrollReveal() {
  const toReveal = document.querySelectorAll('.reveal-on-scroll');
  if (!toReveal.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  toReveal.forEach(el => io.observe(el));
}

// Subtle tilt on hover for elements with .tilt-on-hover
function setupTiltHover() {
  const items = document.querySelectorAll('.tilt-on-hover');
  items.forEach(item => {
    let bounds = null;
    function updateBounds() { bounds = item.getBoundingClientRect(); }
    updateBounds();
    window.addEventListener('resize', updateBounds);

    item.addEventListener('mousemove', (e) => {
      if (!bounds) return;
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const xc = x / bounds.width - 0.5;  // -0.5..0.5
      const yc = y / bounds.height - 0.5; // -0.5..0.5
      const rotateX = (+yc * -6).toFixed(2);
      const rotateY = (+xc * 6).toFixed(2);
      item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal();
  setupTiltHover();
});

// Video list -> in-page player binding
window.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('videoPlayer');
  const source = document.getElementById('videoSource');
  const links = document.querySelectorAll('a.video-link');

  if (!player || !source || !links.length) return;

  function loadVideo(url) {
    source.src = url;
    // Reset the player to load the new source
    player.pause();
    player.load();
    player.play().catch(() => {/* autoplay may be blocked, ignore */});
  }

  // Initialize with first link if available
  const first = links[0];
  if (first) loadVideo(first.getAttribute('data-src') || first.href);

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('data-src') || link.href;
      // Load into player while still allowing the link to open in a new tab
      loadVideo(url);
      // Do not prevent default so it can open new tab if target=_blank
    });
  });
});

// Element SDK integration
async function onConfigChange(newConfig) {
  document.getElementById('heroHeadline').textContent = newConfig.hero_headline || defaultConfig.hero_headline;
  document.getElementById('heroSubheadline').textContent = newConfig.hero_subheadline || defaultConfig.hero_subheadline;
  document.getElementById('aboutTitle').textContent = newConfig.about_title || defaultConfig.about_title;
  document.getElementById('aboutDescription').textContent = newConfig.about_description || defaultConfig.about_description;
  const ctaBtn = document.getElementById('ctaButton');
  if (ctaBtn) {
    ctaBtn.textContent = newConfig.cta_button_text || defaultConfig.cta_button_text;
  }
}

function mapToCapabilities(cfg) {
  return {
    recolorables: [
      {
        get: () => cfg.background_color || defaultConfig.background_color,
        set: (value) => {
          cfg.background_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ background_color: value });
        }
      },
      {
        get: () => cfg.surface_color || defaultConfig.surface_color,
        set: (value) => {
          cfg.surface_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ surface_color: value });
        }
      },
      {
        get: () => cfg.text_color || defaultConfig.text_color,
        set: (value) => {
          cfg.text_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ text_color: value });
        }
      },
      {
        get: () => cfg.accent_color || defaultConfig.accent_color,
        set: (value) => {
          cfg.accent_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ accent_color: value });
        }
      },
      {
        get: () => cfg.button_color || defaultConfig.button_color,
        set: (value) => {
          cfg.button_color = value;
          if (window.elementSdk) window.elementSdk.setConfig({ button_color: value });
        }
      }
    ],
    borderables: [],
    fontEditable: undefined,
    fontSizeable: undefined
  };
}

function mapToEditPanelValues(cfg) {
  return new Map([
    ['hero_headline', cfg.hero_headline || defaultConfig.hero_headline],
    ['hero_subheadline', cfg.hero_subheadline || defaultConfig.hero_subheadline],
    ['about_title', cfg.about_title || defaultConfig.about_title],
    ['about_description', cfg.about_description || defaultConfig.about_description],
    ['cta_button_text', cfg.cta_button_text || defaultConfig.cta_button_text]
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}

// About section entrance animations (fallback if IntersectionObserver not supported)
(function fallbackEntranceAnimations(){
  if ('IntersectionObserver' in window) return; // handled by reveal on scroll
  const els = document.querySelectorAll('#about .reveal-on-scroll');
  els.forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), 150 + i * 120);
  });
})();
