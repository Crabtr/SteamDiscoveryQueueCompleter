// ==UserScript==
// @name         Steam Discovery Queue Completer
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Automatically completes the Steam discovery queue
// @author       Evan Crabtree <github.com/crabtr>
// @match        *://*store.steampowered.com/*
// @grant        none
// ==/UserScript==

document.onload = (function() {
    'use strict';

    // Normal game page in "discovery queue mode"
    let buttons = document.getElementsByClassName("next_in_queue_content");

    if (buttons.length > 0) {
        buttons[0].click();
    }

    // Start a new queue after completion
    // Derives the number of cards unlocked from the queue completion page
    let header = document.getElementsByClassName("discovery_queue_winter_sale_cards_header");

    if (header.length > 0) {
        let unlocked = parseInt(header[0].innerText.trim().split("\n")[1].split(" ")[3]);

        if (unlocked > 0) {
            buttons = document.getElementsByClassName("btnv6_lightblue_blue btn_medium");

            if (buttons.length > 0) {
                let innerText = buttons[0].innerText.trim();

                if (innerText === "Start another queue >>") {
                    buttons[0].click();
                }
            }
        }
    }
})();
