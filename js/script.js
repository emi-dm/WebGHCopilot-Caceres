/* Terminal/DOS Retro Website - Vanilla JS */

const THEME_STORAGE_KEY = 'ghcdd-theme';

document.addEventListener('DOMContentLoaded', function() {
  let storedLight = false;
  try {
    storedLight = localStorage.getItem(THEME_STORAGE_KEY) === 'light';
  } catch (e) {}
  document.documentElement.classList.toggle('theme-light', storedLight);

  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.header-menu-toggle');

  if (header && menuToggle) {
    const themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'theme-toggle';

    const metaThemeColor = (function() {
      let el = document.querySelector('meta[name="theme-color"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'theme-color');
        document.head.appendChild(el);
      }
      return el;
    })();

    const setTheme = function(light) {
      document.documentElement.classList.toggle('theme-light', light);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, light ? 'light' : 'dark');
      } catch (e) {}

      themeBtn.setAttribute('aria-pressed', String(light));
      themeBtn.setAttribute(
        'aria-label',
        light ? 'Activar modo oscuro' : 'Activar modo claro'
      );
      themeBtn.textContent = light ? '☀' : '☽';
      metaThemeColor.setAttribute('content', light ? '#f0f4fa' : '#0c0c10');
    };

    themeBtn.addEventListener('click', function() {
      setTheme(!document.documentElement.classList.contains('theme-light'));
    });

    menuToggle.before(themeBtn);
    setTheme(document.documentElement.classList.contains('theme-light'));
  }

  // Active navigation link
  const navLinks = document.querySelectorAll('nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const siteNav = document.querySelector('.site-nav');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const hrefPage = href.split('/').pop();
    if (hrefPage === currentPage || (currentPage === '' && hrefPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  if (header && menuToggle && siteNav) {
    const setMenuState = function(isOpen) {
      header.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      siteNav.hidden = isMobile ? !isOpen : false;
    };

    const syncResponsiveMenuMode = function() {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      document.body.classList.toggle('mobile-nav', isMobile);

      if (!isMobile) {
        setMenuState(false);
      } else {
        siteNav.hidden = !header.classList.contains('menu-open');
      }
    };

    menuToggle.addEventListener('click', function() {
      const isOpen = header.classList.contains('menu-open');
      setMenuState(!isOpen);
    });

    siteNav.addEventListener('click', function(event) {
      if (event.target.closest('a')) {
        setMenuState(false);
      }
    });

    document.addEventListener('click', function(event) {
      if (!header.classList.contains('menu-open')) {
        return;
      }

      if (!header.contains(event.target)) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        setMenuState(false);
      }
    });

    syncResponsiveMenuMode();
    window.addEventListener('resize', syncResponsiveMenuMode);
  }

  // Home image lightbox (expand on click)
  const homeEventImage = document.getElementById('home-event-image');
  if (homeEventImage) {
    let lightbox = null;

    const closeLightbox = function() {
      if (!lightbox) {
        return;
      }

      lightbox.remove();
      lightbox = null;
      document.body.classList.remove('lightbox-open');
    };

    const openLightbox = function() {
      if (lightbox) {
        return;
      }

      lightbox = document.createElement('div');
      lightbox.className = 'image-lightbox';

      const expandedImage = document.createElement('img');
      expandedImage.src = homeEventImage.src;
      expandedImage.alt = homeEventImage.alt;

      lightbox.appendChild(expandedImage);

      lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });

      document.body.appendChild(lightbox);
      document.body.classList.add('lightbox-open');
    };

    homeEventImage.addEventListener('click', openLightbox);

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });
  }
});
