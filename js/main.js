document.addEventListener('DOMContentLoaded', function () {

    // ── Page navigation ──
    function showPage(id) {
        document.querySelectorAll('.page').forEach(function (p) {
            p.classList.remove('active');
        });
        var target = document.getElementById('page-' + id);
        if (target) {
            target.classList.add('active');
            window.scrollTo(0, 0);

            // re-observe reveals on new page
            target.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.remove('visible');
                observer.observe(el);
            });

            // re-init Lucide icons on new page
            if (window.lucide) { lucide.createIcons(); }
        }

        // show/hide back button
        var backBtn = document.querySelector('.back-btn');
        if (backBtn) {
            backBtn.style.display = id === 'home' ? 'none' : 'inline-flex';
        }

        // close mobile nav if open
        var burger = document.getElementById('burger');
        var mobileNav = document.getElementById('mobileNav');
        if (mobileNav.classList.contains('open')) {
            burger.classList.remove('active');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    // click handlers for [data-page]
    document.querySelectorAll('[data-page]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            showPage(this.getAttribute('data-page'));
        });
    });

    // back button
    var backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            showPage('home');
        });
    }

    // ── Scroll reveal ──
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });

    // ── Header scroll state ──
    var header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // ── Mobile burger ──
    var burger = document.getElementById('burger');
    var mobileNav = document.getElementById('mobileNav');

    burger.addEventListener('click', function () {
        burger.classList.toggle('active');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

});
