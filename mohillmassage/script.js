document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    document
      .querySelectorAll('.reveal, .reveal-media, .divider')
      .forEach(function (el) { observer.observe(el); });
  } else {
    document
      .querySelectorAll('.reveal, .reveal-media, .divider')
      .forEach(function (el) { el.classList.add('visible'); });
  }

  // Subtle hero parallax
  var heroImg = document.getElementById('hero-img');
  if (heroImg && !reduceMotion) {
    var ticking = false;
    var updateParallax = function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroImg.style.transform = 'translateY(' + (y * 0.14) + 'px)';
      }
      ticking = false;
    };
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }
});
