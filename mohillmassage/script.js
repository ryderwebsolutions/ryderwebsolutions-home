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
    var onHeaderScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    onHeaderScroll();
    window.addEventListener('scroll', onHeaderScroll, { passive: true });
  }

  // Mobile "Get in Touch" bar — stays hidden until the hero has fully scrolled
  // off screen, so it never covers the hero's own CTA buttons.
  var stickyCta = document.querySelector('.sticky-cta');
  var hero = document.querySelector('.hero');
  if (stickyCta && hero) {
    var onCtaScroll = function () {
      stickyCta.classList.toggle('visible', window.scrollY >= hero.offsetHeight);
    };
    onCtaScroll();
    window.addEventListener('scroll', onCtaScroll, { passive: true });
    window.addEventListener('resize', onCtaScroll, { passive: true });
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
