'use strict';

const cursor = () => {
    if (Modernizr.touchevents) return;

    const follow = (obj, x, y, t) => {
        if (!exists(obj)) return;
        TweenMax.to(obj, t, {
            x: x,
            y: y,
            ease: Power4.easeOut
        });
    }

    const fade = (obj, a, b, t) => {
        if (!exists(obj)) return;
        TweenMax.fromTo(obj, t, {
            autoAlpha: a
        }, {
            autoAlpha: b,
            ease: Power4.easeOut
        });
    }

    const tracking = (obj, t, fading) => {
        if (!exists(obj)) return;

        document.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                follow(obj, e.clientX, e.clientY, t);
            });
        }, {
            passive: true
        });

        document.body.addEventListener('mouseenter', e => {
            if (fading) fade(obj, 0, 1, 0.1);
            follow(obj, e.clientX, e.clientY, 0);
        }, {
            passive: true
        });

        document.body.addEventListener('mouseleave', () => {
            if (fading) fade(obj, 1, 0, 0.7);
        }, {
            passive: true
        });
    }

    // hover states
    // ------------------------------------------------
    const sizing = (obj, size) => {
        if (!exists(obj)) return;
        TweenMax.to(obj, 0.5, {
            width: size,
            height: size,
            top: -size / 2,
            left: -size / 2,
            ease: Power4.easeOut
        });
    }

    const hover = (obj) => {
        if (!exists(obj)) return;
        const initSize = ß(obj).map((el) => el.offsetWidth);
        const hover = 'a, button, fieldset, .js-discover';

        ß(hover).map((el) => {
            el.addEventListener('mouseenter', () => sizing(obj, initSize * 3), {
                passive: true
            });
            el.addEventListener('mouseleave', () => sizing(obj, initSize), {
                passive: true
            });
        });
    }

    // execution
    // ------------------------------------------------
    tracking('#js-cursor', 0.9, 'fading');
    hover('#js-cursor');
}

document.addEventListener('DOMContentLoaded', () => cursor());