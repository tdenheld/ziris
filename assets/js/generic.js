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

const checkSessionStorage = (value) => {
    if (sessionStorage.getItem(value)) return sessionStorage.getItem(value).trim();
}

const removeAllChilds = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
}

const debounce = (callback, time) => {
    let interval;
    return (...args) => {
        clearTimeout(interval);
        interval = setTimeout(() => {
            interval = null;
            callback(...args);
        }, time);
    }
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
        gsap.to(window, {
            duration: 0.8,
            ease: 'power3.inOut',
            scrollTo: {
                y: target,
                offsetY: offset
            }
        });
        return false;
    });
}

const scrollRevealer = (node, hook, inView, outView) => {
    const reveal = () => {
        const nodePosition = node.getBoundingClientRect();
        const inViewport = !(nodePosition.top > innerHeight * hook);
        if (inViewport) {
            if (inView) inView();
        } else {
            if (outView) outView();
        }
    }
    reveal();

    window.addEventListener('scroll', () => requestAnimationFrame(reveal));
    window.addEventListener('resize', () => requestAnimationFrame(reveal));
}

const discover = () => {
    const node = '.js-discover';
    const obj = document.querySelector(node);
    if (!exists(node)) return;

    obj.onclick = () => {
        gsap.to(window, {
            duration: 0.8,
            ease: 'power3.inOut',
            scrollTo: {
                y: '.art',
                autoKill: false,
            }
        });
    }

    scrollRevealer(obj, 0.82, () => obj.classList.add('o-0'), () => obj.classList.remove('o-0'));
}

const revealOnScroll = () => {
    const section = '.js-scroll';
    const richTxt = '.js-scroll-rt > *';
    if (!exists(section) && !exists(richTxt)) return;

    const init = (node) => {
        ß(node).map((el) => {
            const defaultHook = 0.92;
            const hook = el.getAttribute('data-hook') || defaultHook;
            scrollRevealer(el, hook, () => {
                ß('.js-tr', el).map((ae) => ae.classList.add('is-active'));
                if (el.classList.contains('js-tr')) el.classList.add('is-active');
            });
        });
    }

    ß(richTxt).map((el) => el.classList.add('js-tr', 'tr-fi-up', 'tr-1500'));
    init(richTxt);
    init(section);
}

const gallery = () => {
    const obj = '.js-gallery';
    if (!exists(obj) || Modernizr.touchevents) return;
    
    const verticalEmptyContainer = document.querySelector('.js-gallery-vertical-empty-container');
    const gallery = document.querySelector(obj);

    window.scrollTop = 0;
    gallery.scrollLeft = 0;
    
    const updateEmptyContainerHeight = () => {
        verticalEmptyContainer.style.height = gallery.scrollWidth + 'px';
    }
    updateEmptyContainerHeight();

    window.addEventListener('scroll', () => requestAnimationFrame(() => {
        gallery.scrollLeft = window.scrollY;
    }));

    gallery.addEventListener('scroll', debounce(() => {
        window.scrollTo(0, gallery.scrollLeft);
    }, 24));

    window.addEventListener('load', () => updateEmptyContainerHeight());
}

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    scrollToObject();
    discover();
    revealOnScroll();
    gallery();
});