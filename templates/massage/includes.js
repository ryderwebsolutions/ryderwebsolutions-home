// includes.js — White Lotus Thai Massage
// Client-side partial loader + config injection

const scriptEl = document.currentScript || document.querySelector('script[src$="includes.js"]');
const basePath = scriptEl ? scriptEl.src.replace(/includes\.js$/, '') : './';

const includes = [
  { sel: '#include-topbar',   path: basePath + 'partials/topbar.html' },
  { sel: '#include-header',   path: basePath + 'partials/header.html' },
  { sel: '#include-mobilecta',path: basePath + 'partials/mobilecta.html' },
  { sel: '#include-footer',   path: basePath + 'partials/footer.html' }
];

let siteConfig = null;

function loadConfig() {
  return fetch(basePath + 'config.json')
    .then(function(r) { return r.ok ? r.json() : {}; })
    .then(function(cfg) { siteConfig = cfg; applyConfig(); })
    .catch(function() {});
}

function applyConfig() {
  if (!siteConfig) return;
  var phone = siteConfig.phone;
  var ws = siteConfig.whatsapp;
  var wsMsg = siteConfig.whatsappMessage || 'Hi, I\'d like to book a massage at White Lotus Thai Massage.';
  var waUrl = ws ? 'https://wa.me/' + ws + '?text=' + encodeURIComponent(wsMsg) : '#';

  // Call buttons
  ['call-now', 'mobile-call', 'footer-phone'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el && phone) el.href = 'tel:' + phone;
  });

  // WhatsApp buttons
  ['topbar-ws', 'mobile-ws', 'footer-ws'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.href = waUrl;
  });

  // Topbar phone
  var topbarPhone = document.getElementById('topbar-phone');
  if (topbarPhone && phone) {
    topbarPhone.href = 'tel:' + phone;
    if (siteConfig.phoneDisplay) topbarPhone.textContent = '📞 ' + siteConfig.phoneDisplay;
  }
}

function setupNavToggle() {
  var toggle = document.querySelector('#nav-toggle');
  var nav = document.querySelector('#main-nav');
  if (toggle && nav && !toggle.dataset.bound) {
    toggle.dataset.bound = 'true';
    function updateState() {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
    toggle.addEventListener('click', updateState);
    toggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault(); updateState();
      }
    });
    // Close nav on outside click
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

function rewriteLinksAndImages() {
  document.querySelectorAll('a[data-link]').forEach(function(a) {
    var target = a.getAttribute('data-link');
    if (target) a.href = basePath + target;
  });
  document.querySelectorAll('img[data-src]').forEach(function(img) {
    var src = img.getAttribute('data-src');
    if (src) { img.src = basePath + src; img.removeAttribute('data-src'); img.setAttribute('loading', 'lazy'); }
  });
  document.querySelectorAll('link[data-href]').forEach(function(link) {
    var href = link.getAttribute('data-href');
    if (href) link.href = basePath + href;
  });
}

includes.forEach(function(inc) {
  fetch(inc.path)
    .then(function(r) { return r.ok ? r.text() : ''; })
    .then(function(html) {
      var el = document.querySelector(inc.sel);
      if (el) {
        el.innerHTML = html;
        if (inc.sel === '#include-header') setupNavToggle();
        applyConfig();
        rewriteLinksAndImages();
      }
    })
    .catch(function() {});
});

window.addEventListener('DOMContentLoaded', function() {
  loadConfig();

  // Update copyright year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Set canonical and OG tags
  var url = window.location.href;
  var canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  function setMeta(prop, content) {
    var m = document.querySelector('meta[property="' + prop + '"]');
    if (!m) {
      m = document.createElement('meta');
      m.setAttribute('property', prop);
      document.head.appendChild(m);
    }
    m.content = content;
  }
  setMeta('og:url', url);
  setMeta('og:title', document.title);
  var desc = document.querySelector('meta[name="description"]');
  if (desc) setMeta('og:description', desc.content);
  setMeta('og:type', 'website');

  rewriteLinksAndImages();
});
