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

        if (data) {
            el.nodeName === 'INPUT' ? el.value = data: el.textContent = data;
        } else {
            el.textContent = 'n.v.t.';
        }
    });
}

const clearSessionMeta = () => {
    const obj = '.js-meta';
    if (!exists(obj)) return;

    sessionStorage.clear();
}


// form
// ------------------------------------------------------------
const form = () => {
    const obj = '#form';
    const formField = '.js-formfield';

    if (!exists(obj) || !exists(formField)) return;
    const form = document.querySelector(obj);

    // validation show and hide errors
    // ------------------------------------------
    const showError = (el, error, input) => {
        if (el.contains(error)) return;
        insertAfter(error, input);

        gsap.fromTo(error, {
            height: 0,
        }, {
            duration: 0.2,
            ease: 'power3.out',
            height: 'auto'
        });

        // messages for different usecases
        if (input.validity.valueMissing) {
            if (input.name === 'firstname') {
                error.textContent = 'We hebben echt je voornaam nodig.';
            } else if (input.name === 'lastname') {
                error.textContent = 'We hebben echt je achternaam nodig.';
            } else if (input.name === 'phone') {
                error.textContent = 'We hebben echt je telefoonnummer nodig.';
            } else if (input.name === 'email') {
                error.textContent = 'We hebben echt je e-mailadres nodig.';
            } else {
                error.textContent = 'Dit veld hebben we echt van je nodig.';
            }
        } else if (input.validity.typeMismatch) {
            if (input.name === 'email') {
                error.textContent = 'Oeps! Je e-mailadres lijkt nog niet helemaal goed ingevuld.';
            } else {
                error.textContent = 'Oeps! Er lijkt hier iets niet helemaal goed ingevuld.';
            }
        } else if (input.validity.tooShort) {
            if (input.name === 'phone') {
                error.textContent = `Oeps! Voor een telefoonnummer hebben we minimaal ${ input.minLength } cijfers van je nodig.`;
            } else {
                error.textContent = `Dit veld heeft minimaal ${ input.minLength } karakters nodig. Je hebt er nu ${ input.value.length } ingetypt.`;
            }
        }
    }

    const removeError = error => {
        gsap.fromTo(error, {
            height: 'auto',
        }, {
            duration: 0.1,
            ease: 'power3.out',
            height: 0,
            onComplete() {
                error.remove();
            }
        });
    }



    // activate all formfields
    // ------------------------------------------------------------------
    ß('.js-formfield').reverse().map(el => { // reversed to focus on first invalid field
        const input = el.querySelector('input');
        const label = el.querySelector('label');


        // show hide and style label
        // ------------------------------------------
        input.addEventListener('input', () => {
            input.value ? label.classList.add('is-active') : label.classList.remove('is-active');
        });

        input.addEventListener('focusin', () => label.classList.add('is-focussed'));
        input.addEventListener('focusout', () => label.classList.remove('is-focussed'));


        // validation
        // ------------------------------------------
        if (!input.hasAttribute('required')) return;

        // create error element
        const error = document.createElement('span');
        error.classList.add('signup__error');
        error.setAttribute('aria-live', 'polite');

        input.addEventListener('input', () => {
            removeError(error);
        });

        // validation on submit
        form.addEventListener('submit', e => {
            if (!input.validity.valid) {
                showError(el, error, input);
                input.focus();
                e.preventDefault();
            } else {
                setData();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    clearSessionMeta();
    setData();
    getData();
    form();
});