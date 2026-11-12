(function () {
    'use strict';

    // ---------- Aktuálny rok v pätičke ----------
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ---------- Odhaľovanie obsahu pri scrollovaní ----------
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        // Fallback: prehliadač bez podpory IntersectionObserver zobrazí obsah hneď
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }

    // ---------- Animácia úrovní zručností ----------
    var skillBars = document.querySelectorAll('.skill-bar > span');
    if ('IntersectionObserver' in window && skillBars.length) {
        var skillBarObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var bar = entry.target;
                var targetWidth = bar.dataset.target || bar.style.width || '0%';
                bar.style.width = '0%';
                requestAnimationFrame(function () {
                    bar.style.width = targetWidth;
                });
                skillBarObserver.unobserve(bar);
            });
        }, { threshold: 0.45 });

        skillBars.forEach(function (bar) {
            var targetWidth = bar.style.width || '0%';
            bar.dataset.target = targetWidth;
            bar.style.width = '0%';
            skillBarObserver.observe(bar);
        });
    }

    // ---------- Pozadie navigácie pri scrollovaní ----------
    var siteNav = document.getElementById('site-nav');
    function updateNavBackground() {
        if (!siteNav) return;
        siteNav.classList.toggle('scrolled', window.scrollY > 12);
    }
    updateNavBackground();
    window.addEventListener('scroll', updateNavBackground, { passive: true });

    // ---------- Mobilné menu ----------
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');

    function closeMobileMenu() {
        if (!navToggle || !navLinks) return;
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // ---------- Zvýraznenie aktívnej položky menu ----------
    var sections = document.querySelectorAll('main section[id]');
    var navAnchors = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        var current = '';
        sections.forEach(function (section) {
            var rect = section.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
                current = section.id;
            }
        });
        navAnchors.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    if (sections.length && navAnchors.length) {
        updateActiveLink();
        window.addEventListener('scroll', updateActiveLink, { passive: true });
    }
})();
