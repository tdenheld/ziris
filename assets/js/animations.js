// ----------------------------------------------------
// #ANIMATIONS
// ----------------------------------------------------

'use strict';


const animation = {


    /* First section on home, invoked when
       DOM content is loaded */
    // --------------------------------

    intro() {
        if (!exists('.js-intro')) return;

        gsap.timeline({
            defaults: {
                duration: 2,
                ease: 'power4.out',
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
        }, {
            duration: 1.5,
            autoAlpha: 1,
            x: 0
        }, '<1.5');
    },





    // --------------------------------

    pattern() {
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
        }, {
            duration: 2,
            autoAlpha: 1,
            x: 0
        }, '<0.6');
    },

    



    // --------------------------------

    splitText(node) {
        if (!document.body.contains(node)) return;

        const stagger = node.dataset.stag || 0.01;
        const st = new SplitText(node, {
            type: 'chars,words,lines',
        });
        const chars = st.chars;
    
        gsap.timeline().from(chars, {
            duration: 'random(1, 4)',
            ease: 'power3.out',
            opacity: 0,
            stagger: stagger
        }).fromTo(node, {
            autoAlpha: 0
        }, {
            duration: 0.3,
            ease: 'power3.inOut',
            autoAlpha: 1
        }, '<0');
    }
}

Object.freeze(animation);





// Init when content is loaded
// --------------------------------

document.addEventListener('DOMContentLoaded', () => {
    animation.intro();
});