// ==UserScript==
// @name         Steam Discovery Queue Completer
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Automatically completes the Steam discovery queue
// @author       Evan Crabtree <github.com/crabtr>
// @match        *://*store.steampowered.com/*
// @grant        none
// ==/UserScript==

document.onload = (function() {
    'use strict';

    let buttons = document.getElementsByClassName("next_in_queue_content");

    if (buttons.length > 0) {
        buttons[0].click();
    }
})();
