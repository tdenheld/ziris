// generic javascript
// ------------------------------------------------------------


// global vars
// ------------------------------------------------------------
// ------------------------------------------------------------
var vw = Number;
var vh = Number;
var mobile = Boolean;



// update screen height
// ------------------------------------------------------------	
function updateWindowSize() {
    vw = $(window).innerWidth();
    vh = $(window).innerHeight();

    // set breakpoints
    if (vw > 912) {
        mobile = false;
    } else {
        mobile = true;
    };
};
updateWindowSize();

// update when resizing
$(window).resize(function () {
    updateWindowSize();
});



// basic toggle class
// ------------------------------------------------------------
$(".js-toggle").click(function () {
    $(this).toggleClass("is-active");
});



// basic tween object constructor for smooth transitions
// ------------------------------------------------------------
function Transition(obj) {
    this.obj = obj;
    this.tween = TweenMax.fromTo(this.obj, 1, {
        autoAlpha: 0,
        display: "none"
    }, {
        ease: Power3.easeInOut,
        autoAlpha: 1,
        display: "block",
    }).pause();
};



// default scroll to
// ------------------------------------------------------------
if ($(".js-scroll-to")[0]) {
    $("a[href^='#'].js-scroll-to").click(function () {
        var obj = {
            element: $($.attr(this, "href")),
            //offst: $(".header").height() + 14,
        };
        TweenMax.to(window, .8, {
            ease: Power3.easeInOut,
            scrollTo: {
                y: obj.element,
                //offsetY: obj.offst,
                autoKill: false,
            }
        });
        return false;
    });
};



// discover
// ------------------------------------------------------------
function discover() {
    var obj = $(".js-discover");
    if (obj[0] && !mobile) {
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

        function scrollTrig(i) {
            var obj = "#scroll-magic-" + i;
            var hook = 0.9;
            var customHook = $(obj).attr("hook");
            if (customHook != null) {
                hook = customHook;
            };
            var scrll = new ScrollMagic.Scene({
                    triggerElement: obj,
                })
                .triggerHook(hook)
                .offset(0)
                .on("start", function () {
                    $(obj + " .js-tr").toggleClass("is-active");
                    if ($(obj).hasClass("js-tr")) {
                        $(obj).toggleClass("is-active");
                    };
                })
                //.addIndicators()
                .addTo(controller);
        };

        section.each(function (i) {
            $(this).attr("id", "scroll-magic-" + i);
            scrollTrig(i);
        });
    };
};

$(function () {
    scrollMagic();
});