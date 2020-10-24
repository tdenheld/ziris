(() => {
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
})();