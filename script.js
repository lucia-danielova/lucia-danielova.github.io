(function () {
    'use strict';

    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    var siteNav = document.getElementById('site-nav');
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');

    function setMenu(open) {
        if (!navToggle || !navLinks) return;
        navToggle.classList.toggle('open', open);
        navLinks.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        navToggle.setAttribute('aria-label', open ? 'Zavrieť menu' : 'Otvoriť menu');
        document.body.classList.toggle('nav-open', open);
    }

    if (navToggle && navLinks && siteNav) {
        navToggle.addEventListener('click', function () {
            setMenu(!navLinks.classList.contains('open'));
        });

        siteNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenu(false);
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navLinks.classList.contains('open')) {
                setMenu(false);
                navToggle.focus();
            }
        });

        document.addEventListener('click', function (event) {
            if (!navLinks.classList.contains('open')) return;
            if (siteNav.contains(event.target)) return;
            setMenu(false);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 860) setMenu(false);
        });
    }

    var sections = document.querySelectorAll('main section[id]');
    var navAnchors = document.querySelectorAll('#nav-links a[href^="#"]');

    function updateActiveLink() {
        var current = '';
        sections.forEach(function (section) {
            var rect = section.getBoundingClientRect();
            if (rect.top <= 96 && rect.bottom >= 96) {
                current = section.id;
            }
        });
        navAnchors.forEach(function (link) {
            var id = (link.getAttribute('href') || '').slice(1);
            var on = id === current;
            link.classList.toggle('active', on);
            if (on) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    }

    if (sections.length && navAnchors.length) {
        updateActiveLink();
        window.addEventListener('scroll', updateActiveLink, { passive: true });
    }
})();
