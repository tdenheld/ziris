// ------------------------------------
// Intro animation
// ------------------------------------

'use strict';

(() => {
    if (!exists('.js-intro')) return;

    gsap.timeline({
        defaults: {
            duration: 2,
            ease: 'power3.out',
        }
    }).fromTo('.js-intro-bg', {
        autoAlpha: 0,
        x: '-100%'
    }, {
        autoAlpha: 1,
        x: 0
    }).fromTo('.js-intro-img', {
        autoAlpha: 1,
        x: '-100%'
    }, {
        x: 0,
        onComplete() {
            ß('.js-intro-caption').map(el => el.style.visibility = 'visible');
            splitText('.js-intro-caption');
        }
    }, '<0.2');

    ß('.js-intro-txt').map(el => el.style.visibility = 'visible');
    splitText('.js-intro-txt', 0.03);

})();