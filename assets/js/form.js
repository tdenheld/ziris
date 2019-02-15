// handle data in session
// ----------------------------------------------------------------
function setData() {
    var obj = $(".js-set-data");
    if (obj[0]) {
        obj.each(function () {
            var el = $("#" + this.id);
            if ($(this).is("input")) {
                sessionStorage.setItem(this.id, el.val());
            } else {
                sessionStorage.setItem(this.id, el.text());
            };
        });
    };
};
setData();

function getData() {
    var obj = $(".js-get-data");
    if (obj[0]) {
        obj.each(function () {
            var data = sessionStorage.getItem(this.id);
            if (data !== "") {
                if ($(this).is("input")) {
                    $(this).val($.trim(data));
                } else {
                    $(this).text(data);
                };
            };
        });
    };
};
getData();


// form field
// ------------------------------------------------------------
function form() {
    function formField(i) {
        var id = "#js-formfield-" + i;
        var input = $(id + " .js-input");
        var label = $(id + " .js-label");

        input.keyup(() => {
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
            label.removeClass("is-focussed");
        });
    };

    if ($(".js-submit")[0]) {
        $(".js-submit").click(() => {
            setData();
        });
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