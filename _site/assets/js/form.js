// handle data in session
// ----------------------------------------------------------------
function setCourseData() {
    var courseDataObj = $(".js-set-course-data");

    if (courseDataObj[0]) {
        courseDataObj.each(function () {
            sessionStorage.setItem(this.id, $("#" + this.id).text());
        });
    };
};
setCourseData();

function setFormData() {
    var formDataObj = $(".js-set-form-data");

    if (formDataObj[0]) {
        formDataObj.each(function () {
            sessionStorage.setItem(this.id, $("#" + this.id).val());
        });
    };
};
setFormData();

function getData() {
    $(".js-get-data").each(function () {
        var data = sessionStorage.getItem(this.id);
        if (data !== "") {
            $(this).text(data);
        };
    });
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

    if ($(".js-course-title-form")[0]) {
        $(".js-course-title-form").val(sessionStorage.getItem("course-title"));
    };

    if ($(".js-submit")[0]) {
        $(".js-submit").click(() => {
            setFormData();
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