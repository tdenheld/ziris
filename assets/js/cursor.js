'use strict';

const cursor = () => {
    if (Modernizr.touchevents) return;

    const follow = (obj, x, y, t) => {
        gsap.to(obj, {
            duration: t,
            ease: 'power4.out',
            x: x,
            y: y,
        });
    }

    const fade = (obj) => {
        const _tween = gsap.fromTo(obj, {
            autoAlpha: 0
        }, {
            ease: 'linear.none',
            autoAlpha: 1,
        }).pause();

        const fadeIn = dur => {
            gsap.to(_tween, {
                ease: 'power4.out'
            });
            _tween.duration(dur).play();
        }

        const fadeOut = dur => {
            gsap.to(_tween, {
                ease: 'power4.in'
            });
            _tween.duration(dur).reverse();
        }

        return {
            fadeIn,
            fadeOut
        }
    }

    const tracking = (obj, duration, fading) => {
        if (!exists(obj)) return;
        const fadeObj = fade(obj);

        document.addEventListener('mousemove', e => requestAnimationFrame(() => {
            follow(obj, e.clientX, e.clientY, duration);
        }));

        document.addEventListener('mouseover', e => {
            if (fading) fadeObj.fadeIn(0.3);
            follow(obj, e.clientX, e.clientY, 0);
        });

        document.addEventListener('mouseout', () => {
            if (fading) fadeObj.fadeOut(1);
        });
    }

    // hover states
    // ------------------------------------------------
    const sizing = (obj, size, rotation, opacity) => {
        gsap.to(obj, {
            duration: 1,
            ease: 'power4.out',
            rotate: rotation,
            width: size,
            height: size,
            top: -size / 2,
            left: -size / 2,
            opacity: opacity
        });
    }

    const hover = (obj) => {
        if (!exists(obj)) return;
        const initSize = ß(obj).map((el) => el.offsetWidth);
        const hover = 'a, button, fieldset, .js-discover';

        ß(hover).map((el) => {
            el.addEventListener('mouseenter', () => sizing(obj, initSize * 3, '135deg', 0));
            el.addEventListener('mouseleave', () => sizing(obj, initSize, '0deg', 1));
        });
    }

    // execution
    // ------------------------------------------------
    tracking('#js-cursor', 0.9, 'fading');
    hover('#js-cursor');
}

document.addEventListener('DOMContentLoaded', () => cursor());