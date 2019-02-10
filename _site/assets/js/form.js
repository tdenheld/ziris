// form
// ------------------------------------------------------------

if ($(".js-cta")[0]) {
    sessionStorage.setItem("course", $(".js-cta").attr("course"));
};

if ($(".js-signup-title")[0]) {
    $(".js-signup-title").text(sessionStorage.getItem("course"));
};