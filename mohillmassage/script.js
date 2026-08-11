document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('open');
      nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky header state
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll reveals
  var revealEls = document.querySelectorAll('.reveal, .reveal-media, .divider');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Failsafe: guarantee content (especially photography) is never permanently
  // hidden if the observer never fires for an element — crawlers, link-preview
  // bots and some assistive tools render the page without a real scroll event.
  window.setTimeout(function () {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }, 2500);
});
