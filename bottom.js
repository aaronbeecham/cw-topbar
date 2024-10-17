// ==UserScript==
// @name         Bottom Bar with Voicemail Features
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a custom bottom bar with voicemail features.
// @match        https://aus.myconnectwise.net/v*/timeexpensemodule.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to add the bottom bar with voicemail buttons
    function addCustomBottomBar() {
        // Ensure we're on the correct page
        if (!window.location.href.includes('timeexpensemodule.html')) {
            return;
        }

        let bottomBar = document.getElementById('customBottomBar');
        if (!bottomBar) {
            // Create the bottom bar
            bottomBar = document.createElement('div');
            bottomBar.id = 'customBottomBar';
            bottomBar.style.position = 'fixed';
            bottomBar.style.bottom = '0';
            bottomBar.style.left = '0';
            bottomBar.style.width = '100%';
            bottomBar.style.backgroundColor = '#28a745';
            bottomBar.style.color = '#fff';
            bottomBar.style.height = '44px';
            bottomBar.style.zIndex = '9999';
            bottomBar.style.display = 'flex';
            bottomBar.style.alignItems = 'center';
            bottomBar.style.justifyContent = 'center';

            // Create the "Voicemail Left" button
            const voicemailButton = document.createElement('button');
            voicemailButton.id = 'voicemailButton';
            voicemailButton.style.backgroundColor = '#fff';
            voicemailButton.style.color = '#28a745';
            voicemailButton.style.padding = '5px 10px';
            voicemailButton.style.border = 'none';
            voicemailButton.style.cursor = 'pointer';
            voicemailButton.style.margin = '0 10px';
            voicemailButton.innerText = 'Voicemail Left';
            voicemailButton.onclick = function() {
                insertMessage('voicemailLeft');
            };

            // Create the "No Voicemail" button
            const noVoicemailButton = document.createElement('button');
            noVoicemailButton.id = 'noVoicemailButton';
            noVoicemailButton.style.backgroundColor = '#fff';
            noVoicemailButton.style.color = '#28a745';
            noVoicemailButton.style.padding = '5px 10px';
            noVoicemailButton.style.border = 'none';
            noVoicemailButton.style.cursor = 'pointer';
            noVoicemailButton.style.margin = '0 10px';
            noVoicemailButton.innerText = 'No Voicemail';
            noVoicemailButton.onclick = function() {
                insertMessage('noVoicemail');
            };

            // Create the "No Response Closure" button
            const noResponseClosureButton = document.createElement('button');
            noResponseClosureButton.id = 'noResponseClosureButton';
            noResponseClosureButton.style.backgroundColor = '#fff';
            noResponseClosureButton.style.color = '#28a745';
            noResponseClosureButton.style.padding = '5px 10px';
            noResponseClosureButton.style.border = 'none';
            noResponseClosureButton.style.cursor = 'pointer';
            noResponseClosureButton.style.margin = '0 10px';
            noResponseClosureButton.innerText = 'No Response Closure';
            noResponseClosureButton.onclick = function() {
                insertMessage('noResponseClosure');
            };

            // Create the "Refresh" button
            const refreshButton = document.createElement('button');
            refreshButton.id = 'refreshButton';
            refreshButton.style.backgroundColor = '#fff';
            refreshButton.style.color = '#007bff';
            refreshButton.style.padding = '5px 10px';
            refreshButton.style.border = 'none';
            refreshButton.style.cursor = 'pointer';
            refreshButton.style.margin = '0 10px';
            refreshButton.innerText = 'Refresh';
            refreshButton.onclick = function() {
                location.reload();
            };

            // Add buttons to the bottom bar
            bottomBar.appendChild(voicemailButton);
            bottomBar.appendChild(noVoicemailButton);
            bottomBar.appendChild(noResponseClosureButton);
            bottomBar.appendChild(refreshButton);

            // Add the bottom bar to the page
            document.body.appendChild(bottomBar);
            document.body.style.paddingBottom = '44px';
        }
    }

    // Function to insert messages into the specified input field
    function insertMessage(type) {
        // Get the USER name
        const userElement = document.querySelector('div.cw_ContactLabel.cw_contact');
        let fullUserName = userElement ? userElement.textContent.trim() : '<USER>';

        // Extract the first name
        let userName = fullUserName;
        if (userName && userName !== '<USER>') {
            userName = userName.split(' ')[0];
        }

        // Get the TICKET number (first 7-digit number)
        const ticketInput = document.querySelector('input.cw_ChargeToTextBox');
        let ticketNumber = '<TICKET>';
        if (ticketInput && ticketInput.value) {
            const match = ticketInput.value.match(/\b\d{7}\b/);
            if (match) {
                ticketNumber = match[0];
            }
        }

        // Define the message based on the button clicked
        let message = '';
        if (type === 'voicemailLeft') {
            message = `Hi ${userName},\n\nI tried calling through and have left a voicemail.\nCould you please call us back on 02 4217 7810 and quote ticket #${ticketNumber}.`;
        } else if (type === 'noVoicemail') {
            message = `Hi ${userName},\n\nI tried calling through but was unable to leave a voicemail.\nCould you please call us back on 02 4217 7810 and quote ticket #${ticketNumber}.`;
        } else if (type === 'noResponseClosure') {
            message = `Hi ${userName},\n\nWe have attempted to contact you via email and phone multiple times and have been unsuccessful.\nTicket #${ticketNumber} has now been closed due to unsuccessful attempts to reach you.\nIf you still require assistance, please reply to this email or call 02 4217 7810.`;
        }

        // Find the contenteditable div to insert the message
        const contentEditableDiv = document.querySelector('div[contenteditable="true"].public-DraftEditor-content');
        if (contentEditableDiv) {
            // Focus the editor
            contentEditableDiv.focus();

            // Simulate typing the message
            document.execCommand('insertText', false, message);
        } else {
            alert('Unable to find the input field to insert the message.');
        }
    }

    // Initialize the script
    function init() {
        addCustomBottomBar();
    }

    // Wait for the page to load before initializing
    window.addEventListener('load', init);
})();
