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
if ($(".js-scrollTo")[0]) {
    $("a[href^='#'].js-scrollTo").click(function () {
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