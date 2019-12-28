// ------------------------------------
// Navigation on mobile
// ------------------------------------

'use strict';

(() => {
    if (!exists('.js-nav')) return;
    const nav = document.querySelector('.js-nav');
    const toggle = document.querySelector('.js-nav-toggle');
    const header = document.querySelector('.js-header');

    const tl = gsap.timeline({
        paused: true,
        defaults: {
            duration: 0.2,
            ease: 'power4.out',
        }
    }).fromTo(nav, {
        display: 'block',
    }, {
        scaleY: 1,
    }).fromTo('.js-nav-item', {
        opacity: 0,
        y: -16,
    }, {
        duration: 0.5,
        stagger: 0.05,
        opacity: 1,
        y: 0,
    });

    toggle.parentNode.addEventListener('click', () => {
        if (!toggle.classList.contains('is-active')) {
            tl.play().timeScale(1);
            header.classList.add('is-active');
        } else {
            tl.timeScale(-2);
            setTimeout(() => header.classList.remove('is-active'), 400);
        }
        toggle.classList.toggle('is-active');
    });
})();