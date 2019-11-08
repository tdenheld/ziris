// generic javascript
// ------------------------------------------------------------
'use strict';

const ß = (node, element) => {
    const obj = element || document;
    const qs = obj.querySelectorAll(node);
    return Array.from(qs);
}

const exists = node => {
    return document.body.contains(document.querySelector(node));
}

const isHidden = node => {
    return window.getComputedStyle(node).display === 'none';
}

const valueInArray = (value, array) => {
    return array.includes(value);
}

const checkLocalStorage = (value) => {
    if (localStorage.getItem(value)) return localStorage.getItem(value).trim();
}

const removeAllChilds = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
}

const toggle = () => {
    const obj = '.js-toggle';
    if (!exists(obj)) return;
    ß(obj).map((el) => el.onclick = () => el.classList.toggle('is-active'));
}

const scrollToObject = () => {
    const obj = '.js-scroll-to';
    const offset = document.querySelector('.header').offsetHeight + 24;
    if (!exists(obj)) return;

    ß(obj).map((el) => el.onclick = () => {
        const target = el.getAttribute('href');
        if (!exists(target)) return;
        TweenMax.to(window, .8, {
            ease: Power3.easeInOut,
            scrollTo: {
                y: target,
                offsetY: offset,
                autoKill: false,
            }
        });
        return false;
    });
}


// discover
// ------------------------------------------------------------
const discover = () => {
    const node = '.js-discover';
    const obj = document.querySelector(node);
    if (!exists(node)) return;

    obj.onclick = () => {
        TweenMax.to(window, .8, {
            ease: Power3.easeInOut,
            scrollTo: {
                y: ".art",
                autoKill: false,
            }
        });
    }

    const reveal = () => {
        const nodePosition = obj.getBoundingClientRect();
        const inViewport = !(nodePosition.top > innerHeight * 0.82);
        inViewport ? obj.classList.add('o-0') : obj.classList.remove('o-0');
    }
    reveal();

    window.addEventListener('scroll', () => requestAnimationFrame(reveal));
    window.addEventListener('resize', () => requestAnimationFrame(reveal));
}



// reveal on scroll
// ------------------------------------------------------------------
const revealOnScroll = () => {
    const section = '.js-scroll';
    const richTxt = '.js-scroll-rt > *';
    if (!exists(section) && !exists(richTxt)) return;

    const init = (node) => {
        const reveal = () => ß(node).map((el) => {
            const defaultHook = 0.92;
            const hook = el.getAttribute('data-hook') || defaultHook;

            const nodePosition = el.getBoundingClientRect();
            const inViewport = !(nodePosition.top > innerHeight * hook);

            if (inViewport) {
                ß('.js-tr', el).map((ae) => ae.classList.add('is-active'));
                if (el.classList.contains('js-tr')) el.classList.add('is-active');
            }
        });
        reveal();

        window.addEventListener('scroll', () => requestAnimationFrame(reveal));
        window.addEventListener('resize', () => requestAnimationFrame(reveal));
    }

    ß(richTxt).map((el) => el.classList.add('js-tr', 'tr-fi-up', 'tr-1500'));
    init(richTxt);
    init(section);
}

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    scrollToObject();
    discover();
    revealOnScroll();
});