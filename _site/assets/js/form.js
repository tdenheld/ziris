// store current course title in session
// ------------------------------------------------------------
if ($(".js-cta")[0]) {
    sessionStorage.setItem("course", $(".js-cta").attr("course"));
};

if ($(".js-signup-title")[0]) {
    $(".js-signup-title").text(sessionStorage.getItem("course"));
};


// form field
// ------------------------------------------------------------

function form() {
    function formField(i) {
        var id = "#js-formfield-" + i;
        var input = $(id + " .js-input");
        var label = $(id + " .js-label");
        var tick = $(id + " .js-tick");

        function checkValue() {
            if (input.val() != "") {
                tick.addClass("is-active");
            } else {
                tick.removeClass("is-active");
            };
        };
        checkValue();

        input.keyup(() => {
            tick.removeClass("is-active");
            if (input.val() != "") {
                label.addClass("is-active");
            } else {
                label.removeClass("is-active");
            };
        });

        input.focusin(() => {
            label.addClass("is-focussed");
        });

        input.focusout(() => {
            checkValue();
            label.removeClass("is-focussed");
        });
    };

    if ($(".js-course-title")[0]) {
        $(".js-course-title").val(sessionStorage.getItem("course"));
    };

    if ($(".js-formfield")[0]) {
        $(".js-formfield").each(function (i) {
            $(this).attr("id", "js-formfield-" + i);
            formField(i);
        });
    };
};
$(function () {
    form();
});