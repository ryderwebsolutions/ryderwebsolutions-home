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

includes.forEach(({ sel, path }) => {
  fetch(path)
    .then(r => r.ok ? r.text() : '')
    .then(html => {
      const el = document.querySelector(sel);
      if (el) el.innerHTML = html;
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
  // convert data-src images
  document.querySelectorAll('img[data-src]').forEach(img => {
    const src = img.getAttribute('data-src');
    if (src) {
      img.src = basePath + src;
    }
  });
}

// update copyright year if element exists
window.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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