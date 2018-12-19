// generic javascript
// ------------------------------------------------------------
$(document).ready(function () {

    // global vars
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    var vw = Number;
    var vh = Number;
    var mobile = Boolean;
    var scrolled = false;

    // animations
    var ease = Power3.easeInOut;



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
            ease: ease,
            autoAlpha: 1,
            display: "block",
        }).pause();
    };







    // functionality that"s on linked on scroll
    // ------------------------------------------------------------
    $(window).scroll(() => {
        scrolled = true;
        if (scrolled) {
            //requestAnimationFrame(scrolling);
        };
    });

    function scrolling() {
        var pos = $(window).scrollTop();
        // fade arrow scroll down button
        scrolled = false;
    };














    // include html
    // ------------------------------------------------------------
    function includeHtml() {
        var z, i, elmnt, file, xhttp;
        /*loop through a collection of all HTML elements:*/
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("include");
            if (file) {
                /*make an HTTP request using the attribute value as the file name:*/
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            elmnt.innerHTML = this.responseText;
                        }
                        if (this.status == 404) {
                            elmnt.innerHTML = "Page not found.";
                        }
                        /*remove the attribute, and call this function once more:*/
                        elmnt.removeAttribute("include");
                        includeHtml();
                    };
                };
                xhttp.open("GET", file, true);
                xhttp.send();
                /*exit the function:*/
                return;
            };
        };
    };
    includeHtml();

});