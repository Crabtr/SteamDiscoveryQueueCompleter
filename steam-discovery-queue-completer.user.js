// ==UserScript==
// @name         Steam Discovery Queue Completer
// @version      1.2.0
// @description  Automatically completes the Steam discovery queue
// @license      GPLv3
// @author       Evan Crabtree <github.com/crabtr>
// @namespace    https://github.com/Crabtr/SteamDiscoveryQueueCompleter
// @match        *://*store.steampowered.com/*
// @grant        none
// @updateURL   https://raw.githubusercontent.com/Crabtr/SteamDiscoveryQueueCompleter/master/steam-discovery-queue-completer.user.js
// @downloadURL https://raw.githubusercontent.com/Crabtr/SteamDiscoveryQueueCompleter/master/steam-discovery-queue-completer.user.js
// ==/UserScript==

document.onload = (function() {
    'use strict';

    // Normal game page in "discovery queue mode"
    let buttons = document.getElementsByClassName("next_in_queue_content");

    if (buttons.length > 0) {
        buttons[0].click();
    }

    // Determine if the page is an age check or an age gate
    // Age check pages contain a "Don't show this warning again" checkbox while
    // age gate pages don't
    let remember = document.getElementById("remember"); // Warning checkbox

    if (remember) {
        remember.checked = true;

        buttons = document.getElementsByClassName("btn_grey_white_innerfade btn_medium");

        if (buttons.length > 0) {
            let innerText = buttons[0].innerText.trim();

            if (innerText === "Continue") {
                buttons[0].click();
            }
        }
    } else {
        buttons = document.getElementsByClassName("btnv6_blue_hoverfade btn_small");

        if (buttons.length > 1) {
            let innerText = buttons[0].innerText.trim();

            if (innerText === "Enter")  {
                // Sets your age to "1 January 1990"
                let ageButtons = document.getElementsByName("ageDay");
                if (ageButtons.length > 0) {
                    ageButtons[0].value = "1";
                }

                ageButtons = document.getElementsByName("ageMonth");
                if (ageButtons.length > 0) {
                    ageButtons[0].value = "January";
                }

                ageButtons = document.getElementsByName("ageYear");
                if (ageButtons.length > 0) {
                    ageButtons[0].value = "1990";
                }

                buttons[0].click();
            }
        }
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
