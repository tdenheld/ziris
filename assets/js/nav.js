// ------------------------------------
// Navigation on mobile
// ------------------------------------

'use strict';

(() => {
    if (!exists('.js-nav')) return;
    const nav = document.querySelector('.js-nav');
    const toggle = document.querySelector('.js-nav-toggle');

    toggle.parentNode.addEventListener('click', () => {
        toggle.classList.toggle('is-active');
    });
})();