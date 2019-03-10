// generic javascript
// ------------------------------------------------------------


// global vars
// ------------------------------------------------------------
// ------------------------------------------------------------
var vw = Number;
var vh = Number;
var mobile = Boolean;
var scrolled = false;



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



// functionality that"s on linked on scroll
// ------------------------------------------------------------
$(window).scroll(() => {
    scrolled = true;
    if (scrolled) {
        requestAnimationFrame(scrolling);
    };
});

function scrolling() {
    var pos = $(window).scrollTop();
    // fade arrow scroll down button
    if (pos > 60) {
        $(".js-discover").addClass("o-0");
    } else {
        $(".js-discover").removeClass("o-0");
    };
    scrolled = false;
};



// scroll to
// ------------------------------------------------------------

// default
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
    };
};
discover();