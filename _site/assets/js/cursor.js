function cursor() {
    if (!Modernizr.touchevents) {
        function follow(obj, x, y, t) {
            if ($(obj)[0]) {
                TweenMax.to(obj, t, {
                    x: x,
                    y: y,
                    ease: Power4.easeOut
                });
            }
        }

        function fade(obj, a, b, t) {
            if ($(obj)[0]) {
                TweenMax.fromTo(obj, t, {
                    autoAlpha: a
                }, {
                    autoAlpha: b,
                    ease: Power4.easeOut
                });
            }
        }

        function tracking(obj, t, fading) {
            if ($(obj)[0]) {
                let init = false;
                
                $(document).mousemove((e) => {
                    requestAnimationFrame(() => {
                        follow(obj, e.clientX, e.clientY, t);
                    });
                });

                $(window).mouseenter((e) => {
                    if (!init) {
                        if (fading) {
                            fade(obj, 0, 1, 0.1);
                        }
                        follow(obj, e.clientX, e.clientY, 0);
                        init = true;
                    }
                });
                
                $(document).mouseleave(() => {
                    if (fading) {
                        fade(obj, 1, 0, 0.7);
                    }
                    init = false;
                });
            }
        }

        // hover states
        // ------------------------------------------------
        function sizing(obj, size) {
            if ($(obj)[0]) {
                TweenMax.to(obj, 0.5, {
                    width: size,
                    height: size,
                    top: -size / 2,
                    left: -size / 2,
                    ease: Power4.easeOut
                });
            }
        }

        function hover(obj) {
            if ($(obj)[0]) {
                const size = $(obj).width();
                const hover = 'a, button, fieldset, .js-discover';

                $(hover).mouseenter(() => {
                    sizing(obj, size * 3);
                });
                $(hover).mouseleave(() => {
                    sizing(obj, size);
                });
            }
        }

        // image hover
        // ------------------------------------------------
        function followingImgHover(trig, obj, img) {
            if ($(obj)[0]) {
                $(trig).mouseenter(function () {
                    fade(obj, 0, 1, 1);
                    fade(img, 1, 0, 0);
                    const currentImg = $(this).attr('data-img');
                    $(img).each(function(){
                        if (currentImg === $(this).attr('data-img')) {
                            fade(this, 0, 1, 4);
                        };
                    });
                });
                $(trig).mouseleave(function () {
                    fade(obj, 1, 0, 0.5);
                });
            }
        }

        // execute functions
        tracking('#js-cursor', 0.9, true);
        hover('#js-cursor');
    }
}
cursor();