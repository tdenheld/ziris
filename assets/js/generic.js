// generic javascript
// ------------------------------------------------------------



// discover
// ------------------------------------------------------------
function discover() {
    var obj = $(".js-discover");
    if (obj[0]) {
        obj.click(() => {
            TweenMax.to(window, .8, {
                ease: Power3.easeInOut,
                scrollTo: {
                    y: ".art",
                    autoKill: false,
                }
            });
        });
        var controller = new ScrollMagic.Controller();
        var scrll = new ScrollMagic.Scene({
                triggerElement: window,
                duration: 999999,
            })
            .triggerHook(0)
            .offset(60)
            .on("start", function () {
                obj.toggleClass("o-0");
            })
            //.addIndicators()
            .addTo(controller);
    };
};
discover();



// scroll magic
// ------------------------------------------------------------------
function scrollMagic() {
    var section = $(".js-scroll-magic");

    if (section[0]) {
        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                duration: 99999,
            },
        });

        function scrollTrig(obj) {
            var scrll = new ScrollMagic.Scene({
                    triggerElement: obj,
                })
                .triggerHook(0.94)
                .offset(0)
                .on("start", function () {
                    $('.js-tr', obj).toggleClass('is-active');
                    if ($(obj).hasClass("js-tr")) {
                        $(obj).toggleClass("is-active");
                    };
                })
                //.addIndicators()
                .addTo(controller);
        };

        section.each(function () {
            scrollTrig(this);
        });
    };
};

$(function () {
    scrollMagic();
});