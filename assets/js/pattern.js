// ------------------------------------
// Pattern (CTA on home) animation
// ------------------------------------

'use strict';

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
    
    splitText('.js-pattern-txt', 0.02);
}