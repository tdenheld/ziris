// image gallery of studends
// ------------------------------------------------------------------
// ------------------------------------------------------------------

'use strict';

(() => {
    const obj = '.js-gallery';
    if (!exists(obj) || Modernizr.touchevents) return;

    const container = document.querySelector('.js-gallery-container');
    const gallery = document.querySelector(obj);

    // reset positions on page load
    window.scrollTop = 0;
    gallery.scrollLeft = 0;

    /* make an empty vertical container to let the window object scroll down
    the same height as the width of the gallery scroll container */
    const updateEmptyContainerHeight = () => {
        container.style.height = gallery.scrollWidth + 'px';
    }
    updateEmptyContainerHeight();

    // vertical scroll event listener
    window.addEventListener('scroll', () => requestAnimationFrame(() => {
        gallery.scrollLeft = window.scrollY;
    }));

    // update vertical scroll listener (window) when finished scrolling horizontal
    gallery.addEventListener('scroll', debounce(() => {
        window.scrollTo(0, gallery.scrollLeft);
    }, 24));

    // update vertical empty container height when all images are loaded
    window.addEventListener('load', () => updateEmptyContainerHeight());

    // lazy loading images
    // --------------------------------------------------------
    const preloadImage = img => {
        const src = img.getAttribute('data-src');
        if (!src) return
        img.src = src;
        setTimeout(() => img.style.minWidth = '0px', 10);
    }

    const observer = new IntersectionObserver((entries, self) => {
        entries.map(entry => {
            if (entry.isIntersecting) {
                updateEmptyContainerHeight();
                preloadImage(entry.target);

                // Stop watching and load the image
                self.unobserve(entry.target);
            }
        });
    }, {
        root: gallery,
        rootMargin: '256px',
        threshold: 0,
    });

    ß('[data-src]').map(el => {
        observer.observe(el);
    });
})();