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
    }, '<0.2').fromTo('.js-intro-caption', {
        autoAlpha: 0,
        x: -20
    },{
        duration: 1.5,
        autoAlpha: 1,
        x: 0
    },'<1.5');
    
    document.querySelector('.js-intro-header').style.visibility = 'visible';
    splitText('.js-intro-header', 0.03);

})();