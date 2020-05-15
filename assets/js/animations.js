'use strict';

// ------------------------------------
// Intro animation
// ------------------------------------

'use strict';

const introAnimation = () => {
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
    }, '<0.2').fromTo('.js-intro-caption', {
        autoAlpha: 0,
        x: -20
    },{
        duration: 1.5,
        autoAlpha: 1,
        x: 0
    },'<1.5');
}

document.addEventListener('DOMContentLoaded', () => {
    introAnimation();
});




// ------------------------------------
// Pattern (CTA on home) animation
// ------------------------------------

const pattern = () => {
    if (!exists('.js-pattern')) return;

    gsap.timeline({
        defaults: {
            duration: 3,
            ease: 'power3.out',
        }
    }).fromTo('.js-pattern-bg', {
        autoAlpha: 0,
        scale: 0.9
    }, {
        autoAlpha: 1,
        scale: 1
    }).fromTo('.js-pattern-button', {
        autoAlpha: 0,
        x: -20
    },{
        duration: 2,
        autoAlpha: 1,
        x: 0
    }, '<0.8');
}