// generic javascript
// ------------------------------------------------------------
'use strict';

const ß = (node, element) => {
    const obj = element || document;
    const qs = obj.querySelectorAll(node);
    return Array.from(qs);
}

const exists = (node) => {
    return document.body.contains(document.querySelector(node));
}

const isHidden = (node) => {
    return window.getComputedStyle(node).display === 'none';
}

const valueInArray = (value, array) => {
    return array.includes(value);
}

const checkLocalStorage = (value) => {
    if (localStorage.getItem(value)) return localStorage.getItem(value).trim();
}

const checkSessionStorage = (value) => {
    if (sessionStorage.getItem(value)) return sessionStorage.getItem(value).trim();
}

const removeAllChilds = (node) => {
    while (node.firstChild) node.removeChild(node.firstChild);
}

const insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const debounce = (callback, time) => {
    let interval;
    return (...args) => {
        clearTimeout(interval);
        interval = setTimeout(() => {
            interval = null;
            callback(...args);
        }, time);
    }
}

(() => {
    const obj = '.js-toggle';
    if (!exists(obj)) return;
    ß(obj).map((el) => el.onclick = () => el.classList.toggle('is-active'));
})();