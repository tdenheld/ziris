// ------------------------------------
// Intro animation
// ------------------------------------

'use strict';

(() => {
    if (!exists('.js-intro')) return;

    gsap.timeline({
        defaults: {
            duration: 2,
            ease: 'power4.out',
        }
    }).fromTo('.js-intro-bg', {
        autoAlpha: 1,
        x: '-100%'
    }, {
        x: 0
    }).set('.js-intro-txt', {
        autoAlpha: 1
    },'<0').fromTo('.js-intro-img', {
        autoAlpha: 1,
        x: '-100%'
    },{
        ease: 'power3.inOut',
        x: 0
    },'<-0.4');

    splitText('.js-intro-txt');
})();