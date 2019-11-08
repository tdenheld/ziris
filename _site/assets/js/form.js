'use strict';

// handle data in session
// ----------------------------------------------------------------
const setData = () => {
    const obj = '.js-set-data';
    if (!exists(obj)) return;

    ß(obj).map((el) => {
        const value = (el.nodeName === 'INPUT') ? el.value : el.textContent;
        sessionStorage.setItem(el.id, value);
    });
}

const getData = () => {
    const obj = '.js-get-data';
    if (!exists(obj)) return;

    ß(obj).map((el) => {
        const data = checkSessionStorage(el.id);
        (el.nodeName === 'INPUT') ? el.value = data : el.textContent = data;
    });
}


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
            }
        });

        input.focusin(() => {
            label.addClass("is-focussed");
        });

        input.focusout(() => {
            label.removeClass("is-focussed");
        });
    }

    if ($(".js-submit")[0]) {
        $(".js-submit").click(() => {
            setData();
        });
    }

    if ($(".js-formfield")[0]) {
        $(".js-formfield").each(function (i) {
            $(this).attr("id", "js-formfield-" + i);
            formField(i);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setData();
    getData();
    form();
});