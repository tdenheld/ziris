// generic javascript
// ------------------------------------------------------------
$(document).ready(function () {

    // global vars
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    var window_width = Number;
    var window_height = Number;
    var mobile = Boolean;
    var scrolled = false;

    // animations
    var default_ease = Power3.easeInOut;



    // update screen height
    // ------------------------------------------------------------	
    function updateWindowSize() {
        window_width = $(window).innerWidth();
        window_height = $(window).innerHeight();

        // set breakpoints
        if (window_width > 912) {
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
    function Transition(obj, y, scaleY) {
        this.obj = obj;
        this.y = y;
        this.scaleY = scaleY;

        this.tween = TweenMax.fromTo(this.obj, 1, {
            autoAlpha: 0,
            y: this.y,
            scaleY: this.scaleY,
            display: "none"
        }, {
            ease: default_ease,
            autoAlpha: 1,
            y: 0,
            scaleY: 1,
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



    // sticky bar
    // ------------------------------------------------------------
    function stickyBar() {
        var controller = new ScrollMagic.Controller();
        var id = document.getElementById("js-sticky-trig");
        if (id) {
            $(".js-sticky-bar").addClass("is-active");
            var scrll = new ScrollMagic.Scene({
                    triggerElement: "#js-sticky-trig",
                    duration: 999999,
                })
                .triggerHook(0.905)
                .offset(0)
                .on("start", function () {
                    $(".js-sticky-bar").toggleClass("is-active");
                })
                //.addIndicators()
                .addTo(controller);
        };
    };
    stickyBar();






    // form
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    function form() {
        var submit = true;
        var linkLocationDefault = $(".js-submit-link").attr("href");
        var linkLocation = linkLocationDefault;

        // error constructor
        function DisplayError(input, error) {
            this.input = input;
            this.error = error;
            this.tween = function (toAlpha, toDisplay) {
                TweenLite.to(this.error, .3, {
                    ease: default_ease,
                    autoAlpha: toAlpha,
                    display: toDisplay,
                });
            };
            this.show = function () {
                this.input.addClass("is-error");
                this.tween(1, "block");
            };
            this.hide = function () {
                this.input.removeClass("is-error");
                this.tween(0, "none");
            };
        };

        function formField(i) {
            var id = "#js-ff-default-" + i;
            var input = $(id + " .tk-ff__input");
            var tick = $(id + " .tk-ff__icon--approved");
            var error = $(id + " .tk-ff__error");
            var errorMessage = new DisplayError(input, error);

            function checkValue() {
                if (input.val() != "") {
                    tick.addClass("is-active");
                } else {
                    tick.removeClass("is-active");
                };
            };

            input.keyup(function () {
                errorMessage.hide();
                tick.removeClass("is-active");
            });

            input.focusout(function () {
                checkValue();
                if ($(this).prop("required")) {
                    if (input.val() == "") {
                        errorMessage.show();
                        submit = false;
                    } else {
                        submit = true;
                    };
                };
            });

            checkValue();
            submitButton(input, error);
        };

        if ($(".js-ff-default")[0]) {
            submit = false;
            $(".js-ff-default").each(function (i) {
                $(this).attr("id", "js-ff-default-" + i);
                formField(i);
            });
        };

        function checkDate() {
            var input = $(".js-ff-date .tk-ff__input");
            var error = $(".js-ff-date .tk-ff__error");
            var tick = $(".js-ff-date .tk-ff__icon--approved");
            var errorMessage = new DisplayError(input, error);

            function checkValue() {
                if (input.val().length == 10) {
                    submit = true;
                    tick.addClass("is-active");
                } else {
                    tick.removeClass("is-active");
                    submit = false;
                };
            };

            if (input[0]) {
                submit = false;
                checkValue();

                // only numbers are valid input
                input.keydown(function (e) {
                    if (!((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105) || (e.which === 8) || (e.which === 9))) {
                        return false;
                    };
                });

                input.keyup(function () {
                    errorMessage.hide();
                    checkValue();

                    // add hyphen when digits are typed
                    var n = input.val();
                    if (input.val().length == 2) {
                        input.val(n + "-");
                    };
                    if (input.val().length == 5) {
                        input.val(n + "-");
                    };
                });

                input.focusout(function () {
                    if (input.val().length == 10) {
                        submit = true;
                    } else {
                        errorMessage.show();
                        submit = false;
                    };
                });
            };

            submitButton(input, error);
        };
        checkDate();

        function checkEmail() {
            var typingTimer;
            var serverCallSym;
            var isValidEmail;
            var emailField = document.getElementById("email");
            var obj = ".js-ff-email";
            var input = $(obj + " .tk-ff__input");
            var loading = $(obj + " .tk-ff__icon--loading");
            var tick = $(obj + " .tk-ff__icon--approved");
            var known = $(obj + " .tk-ff__icon--known");
            var knownMessage = $(obj + " .tk-ff__message");
            var error = $(obj + " .tk-ff__error");
            var buttonText = $(".js-submit-button").text();
            var errorMessage = new DisplayError(input, error);

            if (emailField) {
                submit = false;
                isValidEmail = email.checkValidity();

                // on keyup, start the countdown
                input.keyup(function () {
                    errorMessage.hide();
                    clearTimeout(typingTimer);
                    clearTimeout(serverCallSym);
                    typingTimer = setTimeout(doneTyping, 750);
                    loading.removeClass("is-active");
                    tick.removeClass("is-active");
                    known.removeClass("is-active");
                    knownMessage.removeClass("is-active");
                    isValidEmail = email.checkValidity();
                    $(".js-submit-button").text(buttonText);
                    linkLocation = linkLocationDefault;
                });

                // on keydown, clear the countdown 
                input.keydown(function () {
                    clearTimeout(typingTimer);
                });

                input.focusout(function () {
                    if (isValidEmail) {
                        submit = true;
                    } else {
                        errorMessage.show();
                        submit = false;
                    };
                });

                if (isValidEmail) {
                    submit = true;
                };

                // user is finished typing
                function doneTyping() {
                    if (isValidEmail) {
                        loading.addClass("is-active");
                        serverCallSym = setTimeout(() => {
                            if (input.val() != "tjeerd@ns.nl") {
                                loading.removeClass("is-active");
                                tick.addClass("is-active");
                            } else {
                                loading.removeClass("is-active");
                                known.addClass("is-active");
                                knownMessage.addClass("is-active");
                                $(".js-submit-button").text("Inloggen");
                                linkLocation = "https://login.ns.nl";
                            };
                        }, 300);
                    } else {
                        loading.removeClass("is-active");
                        tick.removeClass("is-active");
                        known.removeClass("is-active");
                    };
                };

                doneTyping();
                submitButton(input, error);
            };
        };
        checkEmail();

        function checkPostal() {
            var input = $(".js-ff-postal .tk-ff__input");
            var tick = $(".js-ff-postal .tk-ff__icon--approved");
            var error = $(".js-ff-postal .tk-ff__error");
            var address = $(".tk-ff__address");
            var errorMessage = new DisplayError(input, error);

            // check value
            function checkValue() {
                if (input.val().length == 6) {
                    tick.addClass("is-active");
                    submit = true;
                    TweenLite.to(address, .2, {
                        ease: default_ease,
                        autoAlpha: 1,
                        scaleY: 1,
                        display: "grid",
                    });
                } else {
                    tick.removeClass("is-active");
                    submit = false;
                    TweenLite.to(address, .2, {
                        ease: default_ease,
                        autoAlpha: 0,
                        scaleY: 0.7,
                        display: "none",
                    });
                };
            };

            if (input[0]) {
                submit = false;
                checkValue();

                // prevent spacebar input
                input.keypress(function (e) {
                    if (e.which === 32) {
                        return false;
                    };
                });

                // show or hide address on completed postal code
                input.keyup(function () {
                    errorMessage.hide();
                    checkValue();
                });

                // show error on focusout if input is correct
                input.focusout(function () {
                    if (input.val().length == 6) {

                    } else {
                        errorMessage.show();
                    };
                });
            };

            submitButton(input, error);
        };
        checkPostal();

        function addAddressNumber() {
            var input = $("#huisnummer");
            var houseAddition = $("#toevoeging");

            function addNumber() {
                $(".tk-ff__address-number").text(" " + input.val() + houseAddition.val());
            };

            if (input.val() != "" || houseAddition.val() != "") {
                addNumber();
            };

            input.keyup(function () {
                addNumber();
            });

            houseAddition.keyup(function () {
                addNumber();
            });
        };
        addAddressNumber();

        function customAddress() {
            $(".tk-ff__address-icon").click(() => {
                TweenLite.to(".tk-ff__address", 0, {
                    ease: default_ease,
                    autoAlpha: 0,
                    display: "none",
                });
                TweenLite.to(".js-address-additional", 0.3, {
                    ease: default_ease,
                    autoAlpha: 1,
                    display: "block",
                });
            });
        };
        customAddress();

        function submitButton(i, e) {
            var errorMessage = new DisplayError(i, e);
            $(".js-submit-link").click(function (event) {
                event.preventDefault();
                if (submit) {
                    window.location = linkLocation;
                } else if (i.prop("required")) {
                    errorMessage.show();
                };
            });
        };

        // give checkboxes id's
        if ($(".tk-ff__checkbox")[0]) {
            $(".tk-ff__checkbox").each(function (i) {
                var obj = "checkbox" + i;
                $(".checkbox__input", this).attr("id", obj).attr("name", obj);
                $(".checkbox__label", this).attr("id", obj).attr("for", obj);
            });
        };
    };
    form();





    // choice selector
    // ------------------------------------------------------------
    if ($(".js-cs-item")[0]) {
        $(".js-cs-item").each(function (i) {
            $(this).attr("id", "js-cs-item-" + i);
        });
    };

    function choiceSelector() {
        var time = 250;
        var obj = ".js-cs-item";
        var toggleClass = "is-selected";
        var initID = "#js-cs-item-0"; // set default on current card
        var content = ".tk-choice-selector__content";

        if ($(obj)[0]) {
            $(content).slideUp(time);
            $(initID + " " + content).slideDown(0);
            $(initID).addClass(toggleClass);

            $(obj).click(function () {
                if (!$(this).hasClass(toggleClass)) {
                    $(obj).removeClass(toggleClass);
                    $(this).addClass(toggleClass);
                    $(content).slideUp(time);
                    $(content, this).slideDown(time);
                };
            });
        };
    };
    choiceSelector();



    // datepicker
    // ------------------------------------------------------------
    function dpBottomSheet() {
        var btn = $(".dp-bs-btn");
        var overlay = $(".dp-bs");
        var close = $(".tk-datepicker-bs__swiper, .dp-bs .tk-overlay__bg");
        var bottomSheet = new Transition(".tk-datepicker-bs", 300, 1);
        var darkener = new Transition(".dp-bs .tk-overlay__bg", 0, 1);

        btn.click(() => {
            if (window_width <= 640) {
                overlay.show();
                bottomSheet.tween.duration(0.35).play();
                darkener.tween.duration(0.6).play();
            };
        });

        close.click(() => {
            bottomSheet.tween.duration(0.35).play().reverse();
            darkener.tween.duration(0.6).play().reverse();
            setTimeout(() => {
                overlay.hide();
            }, 610);
        });
    };
    dpBottomSheet();

    function dpDesktop() {
        var active = false;
        var dp;

        $(".dp-btn").click(function () {
            dp = $(".tk-datepicker-lg", this);
            if (window_width > 640) {
                if (!active) {
                    TweenLite.fromTo(dp, 0.3, {
                        opacity: 0,
                        scaleY: 0.9,
                        display: "none",
                    }, {
                        ease: default_ease,
                        opacity: 1,
                        scaleY: 1,
                        display: "block",
                    });
                    active = true;
                } else {
                    TweenLite.to(dp, 0.3, {
                        ease: default_ease,
                        opacity: 0,
                        display: "none",
                    });
                    active = false;
                }
            };
        });
    };
    dpDesktop();





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