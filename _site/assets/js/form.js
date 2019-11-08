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
        if (!data) return;
        (el.nodeName === 'INPUT') ? el.value = data: el.textContent = data;
    });
}


// form field
// ------------------------------------------------------------
const form = () => {
    ß('.js-formfield').map((el) => {
        const input = el.querySelector('.js-input');
        const label = el.querySelector('.js-label');

        input.addEventListener('keyup', () => {
            input.value ? label.classList.add('is-active') : label.classList.remove('is-active');
        });

        input.addEventListener('focusin', () => label.classList.add('is-focussed'));
        input.addEventListener('focusout', () => label.classList.remove('is-focussed'));
    });

    const submit = '.js-submit';
    if (exists(submit)) ß(submit).map((el) => el.onclick = () => setData());
}

document.addEventListener('DOMContentLoaded', () => {
    setData();
    getData();
    form();
});