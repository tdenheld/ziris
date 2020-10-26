// ----------------------------------------------------
// #IMG LOADER
// ----------------------------------------------------

'use strict';

(() => {
    const obj = '.js-img-loader';
    if (!exists(obj)) return;

    const preloadImage = (placeholder, img) => {
        const src = img.getAttribute('data-src');
        if (!src) return
        img.src = src
        img.addEventListener('load', () => {
            img.classList.add('is-visible');
            if (exists('.js-img-loader-placeholder')) {
                placeholder.classList.add('is-hidden');
            }
        });
    }

    const observeImage = new IntersectionObserver((entries, self) => {
        entries.map(entry => {
            const placeholder = entry.target.querySelector('.js-img-loader-placeholder');
            const img = entry.target.querySelector('.js-img-loader-item');

            if (entry.isIntersecting) {
                preloadImage(placeholder, img);
                self.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '1600px 0px',
    });

    ß(obj).map(el => observeImage.observe(el));
})();