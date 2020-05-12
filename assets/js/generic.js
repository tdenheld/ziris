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

const scrollTo = () => {
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

    const observer = new IntersectionObserver(entries => {
        entries.map(entry => {        
            if (entry.isIntersecting) {
                entry.target.classList.add('o-0');
            } else if (!entry.isIntersecting) {
                entry.target.classList.remove('o-0');
            }
        });
    }, {
        rootMargin: '200% 0px -18%',
    });

    observer.observe(obj);
}

const splitText = node => {
    const st = new SplitText(node, {
        type: 'chars,words,lines'
    });
    const chars = st.chars;

    gsap.from(chars, {
        duration: 'random(0.5, 5)',
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.01
    });
}

const revealOnScroll = () => {
    const section = '.js-scroll';
    const richTxt = '.js-scroll-rt > *';
    if (!exists(section) && !exists(richTxt)) return;

    const observer = new IntersectionObserver((entries, self) => {
        entries.map(entry => {
            const target = entry.target;
            
            if (entry.isIntersecting) {
                ß('.js-tr', target).map((el) => el.classList.add('is-active'));
                if (target.classList.contains('js-tr')) target.classList.add('is-active');
                if (target.classList.contains('js-split-text')) {
                    splitText(target);
                }
                self.unobserve(target);
            }
        });
    }, {
        rootMargin: '-5% 0px',
        threshold: 0.05
    });

    ß(richTxt).map((el) => {
        el.classList.add('js-tr', 'tr-fi-up', 'tr-1500');
        observer.observe(el);
    });
    ß(section).map(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    scrollTo();
    discover();
    revealOnScroll();
});