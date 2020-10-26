// ----------------------------------------------------
// #GALLERY
// ----------------------------------------------------

'use strict';


(() => {
    const obj = '.js-gallery';
    if (!exists(obj)) return;

    const container = document.querySelector('.js-gallery-container');
    const gallery = document.querySelector(obj);






    // lazy loading images
    // --------------------------------------------------------
    const preloadImage = img => {
        const src = img.getAttribute('data-src');
        if (!src) return
        img.src = src;
        img.addEventListener('load', () => {
            img.style.minWidth = 'auto';
            img.nextElementSibling.classList.add('is-hidden');
        });
    }

    const observeImage = new IntersectionObserver((entries, self) => {
        entries.map(entry => {
            if (entry.isIntersecting) {
                if (!Modernizr.touchevents) updateEmptyContainerHeight();
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 256px',
    });

    ß('[data-src]').map(el => observeImage.observe(el));






    // transition gallery tile
    // --------------------------------------------------------
    const observeTile = new IntersectionObserver((entries, self) => {
        entries.map(entry => {
            if (entry.isIntersecting) {
                ß('.js-tr', entry.target).map((el) => el.classList.add('is-active'));
                self.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px -16%'
    });

    ß('.js-gallery-item').map(el => observeTile.observe(el));

    /* show 2nd image by default otherwise
       the user has no scroll indication */
    const secondGalleryItem = document.querySelector('#js-gallery-item-2');
    ß('.js-tr', secondGalleryItem).map(el => el.classList.add('is-active'));






    // vertical scroll gallery
    // --------------------------------------------------------
    if (Modernizr.touchevents) return;

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
    }, 50));

    // update vertical empty container height when all images are loaded
    window.addEventListener('load', () => updateEmptyContainerHeight());

})();