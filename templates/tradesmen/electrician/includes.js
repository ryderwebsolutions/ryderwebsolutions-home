// simple client-side include loader for static templates
// determine base path from script src
const scriptEl = document.currentScript || document.querySelector('script[src$="includes.js"]');
const basePath = scriptEl ? scriptEl.src.replace(/includes\.js$/, '') : './';

const includes = [
  { sel: '#include-topbar', path: basePath + 'partials/topbar.html' },
  { sel: '#include-header', path: basePath + 'partials/header.html' },
  { sel: '#include-mobilecta', path: basePath + 'partials/mobilecta.html' },
  { sel: '#include-footer', path: basePath + 'partials/footer.html' }
];

let siteConfig = null;

// fetch site configuration (phone, company name, etc.)
function loadConfig() {
  return fetch(basePath + 'config.json')
    .then(r => r.ok ? r.json() : {})
    .then(cfg => {
      siteConfig = cfg;
      applyConfig();
    })
    .catch(() => {});
}

function applyConfig() {
  if (!siteConfig) return;
  const phone = siteConfig.phone;
  const ws = siteConfig.whatsapp;
  const company = siteConfig.companyName;
  // header call button
  const callBtn = document.getElementById('call-now');
  if (callBtn && phone) {
    callBtn.href = 'tel:' + phone;
  }
  // mobile cta
  const mobCall = document.getElementById('mobile-call');
  if (mobCall && phone) {
    mobCall.href = 'tel:' + phone;
  }
  const mobWs = document.getElementById('mobile-ws');
  if (mobWs && ws) {
    mobWs.href = 'https://wa.me/' + ws + '?text=' + encodeURIComponent('Hi, I need an electrician in Dublin.');
  }
  const topbarPhone = document.getElementById('topbar-phone');
  if (topbarPhone && phone) {
    topbarPhone.href = 'tel:' + phone;
    topbarPhone.textContent = 'Call: ' + phone;
  }
  const topbarWs = document.getElementById('topbar-ws');
  if (topbarWs && ws) {
    topbarWs.href = 'https://wa.me/' + ws + '?text=' + encodeURIComponent('Hi, I need an electrician in Dublin.');
  }
}

// menu toggle setup
function setupNavToggle() {
  const toggle = document.querySelector('#nav-toggle');
  const nav = document.querySelector('#main-nav');
  if (toggle && nav && !toggle.dataset.bound) {
    toggle.dataset.bound = 'true';
    const updateState = () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    };
    toggle.addEventListener('click', updateState);
    // keyboard support (enter/space)
    toggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        updateState();
      }
    });
  }
}

includes.forEach(({ sel, path }) => {
  fetch(path)
    .then(r => r.ok ? r.text() : '')
    .then(html => {
      const el = document.querySelector(sel);
      if (el) {
        el.innerHTML = html;
        // setup nav toggle after header is loaded
        if (sel === '#include-header') setupNavToggle();
        // reapply config in case anchors were added
        applyConfig();
      }
    })
    .catch(() => {});
});

function rewriteLinksAndImages() {
  // convert data-link anchors to real hrefs
  document.querySelectorAll('a[data-link]').forEach(a => {
    const target = a.getAttribute('data-link');
    if (target) {
      a.href = basePath + target;
    }
  });
  // convert data-src images (lazy load)
  document.querySelectorAll('img[data-src]').forEach(img => {
    const src = img.getAttribute('data-src');
    if (src) {
      img.src = basePath + src;
      img.removeAttribute('data-src');
      img.setAttribute('loading', 'lazy');
    }
  });
  // convert data-href links (e.g. stylesheet references)
  document.querySelectorAll('link[data-href]').forEach(link => {
    const href = link.getAttribute('data-href');
    if (href) {
      link.href = basePath + href;
    }
  });
  // nav toggle is now set up when header loads
}

// update copyright year if element exists
window.addEventListener('DOMContentLoaded', () => {
  loadConfig();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle is set up when header loads

  // insert trust strip after hero if not present
  if (!document.querySelector('.trust-strip')) {
    const hero = document.querySelector('.hero');
    if (hero) {
      const strip = document.createElement('section');
      strip.className = 'trust-strip';
      strip.innerHTML = '<div class="container"><div class="flex"><div><span aria-hidden="true">✅</span> 30-day guarantee</div><div><span aria-hidden="true">⚡</span> Fast callouts</div><div><span aria-hidden="true">💬</span> 4.9★ Google rating</div></div></div>';
      hero.after(strip);
    }
  }

  // transform proof cards into horizontal slider for mobile
  const proof = document.querySelector('section .kicker + .h2 + .grid.three');
  if (proof) {
    proof.classList.add('testimonial-slider');
  }

  // automatically add canonical and basic Open Graph tags
  const url = window.location.href;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  function setMeta(property, content) {
    let m = document.querySelector(`meta[property="${property}"]`);
    if (!m) {
      m = document.createElement('meta');
      m.setAttribute('property', property);
      document.head.appendChild(m);
    }
    m.content = content;
  }
  setMeta('og:url', url);
  setMeta('og:title', document.title);
  const desc = document.querySelector('meta[name="description"]');
  if (desc) setMeta('og:description', desc.content);
  setMeta('og:type', 'website');

  // rewrite any links/images that may exist already
  rewriteLinksAndImages();
});

// also rewrite after each include loads (might load later)
includes.forEach(({ sel }) => {
  // observe the content area for changes
  const container = document.querySelector(sel);
  if (container) {
    const obs = new MutationObserver(() => rewriteLinksAndImages());
    obs.observe(container, { childList: true, subtree: true });
  }
});
