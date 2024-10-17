// ==UserScript==
// @name         ConnectWise Bottom Bar Enhancements
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Adds a custom bottom bar with voicemail features for ConnectWise.
// @match        https://aus.myconnectwise.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the custom bottom bar with buttons
    function createBottomBar() {
        // Ensure the script runs only on the specific page
        if (!window.location.href.includes('timeexpensemodule.html')) {
            console.log('Not on timeexpensemodule.html page. Exiting createBottomBar.');
            return;
        }

        // Check if the bottom bar already exists
        let bottomBar = document.getElementById('customBottomBar');
        if (!bottomBar) {
            console.log('Creating custom bottom bar.');
            bottomBar = document.createElement('div');
            bottomBar.id = 'customBottomBar';

            // Isolate styles to prevent conflicts
            bottomBar.style.position = 'fixed';
            bottomBar.style.bottom = '0';
            bottomBar.style.left = '0';
            bottomBar.style.width = '100%';
            bottomBar.style.backgroundColor = '#28a745';
            bottomBar.style.color = '#fff';
            bottomBar.style.height = '50px'; // Slightly increased height for better visibility
            bottomBar.style.zIndex = '999'; // Reduced z-index to prevent overlapping critical elements
            bottomBar.style.display = 'flex';
            bottomBar.style.alignItems = 'center';
            bottomBar.style.justifyContent = 'center';
            bottomBar.style.boxShadow = '0 -2px 5px rgba(0,0,0,0.3)'; // Added shadow for separation
            bottomBar.style.padding = '0 20px'; // Added padding for better spacing

            // Define the buttons with their respective actions
            const buttons = [
                { text: 'Voicemail Left', type: 'voicemailLeft' },
                { text: 'No Voicemail', type: 'noVoicemail' },
                { text: 'No Response Closure', type: 'noResponseClosure' },
                { text: 'Refresh', type: 'refresh' }
            ];

            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.style.margin = '0 10px';
                button.style.padding = '10px 15px';
                button.style.backgroundColor = '#fff';
                button.style.color = '#28a745';
                button.style.border = 'none';
                button.style.borderRadius = '4px';
                button.style.cursor = 'pointer';
                button.style.fontWeight = 'bold';
                button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                button.style.transition = 'background-color 0.3s, color 0.3s';

                // Hover effect
                button.addEventListener('mouseenter', () => {
                    button.style.backgroundColor = '#28a745';
                    button.style.color = '#fff';
                });
                button.addEventListener('mouseleave', () => {
                    button.style.backgroundColor = '#fff';
                    button.style.color = '#28a745';
                });

                button.innerText = btn.text;
                button.onclick = function(event) {
                    event.preventDefault(); // Prevent default action
                    event.stopPropagation(); // Stop event propagation
                    console.log(`${btn.text} button clicked.`);
                    if (btn.type === 'refresh') {
                        location.reload();
                    } else {
                        insertMessage(btn.type);
                    }
                };
                bottomBar.appendChild(button);
            });

            // Append the bottom bar to the body
            document.body.appendChild(bottomBar);
            console.log('Custom bottom bar appended to the body.');

            // Adjust the main content area to prevent overlap
            const mainContent = document.querySelector('body > div.cw_MainContent');
            if (mainContent) {
                mainContent.style.paddingBottom = '60px'; // Adjust this value as needed
            }
        } else {
            console.log('Custom bottom bar already exists.');
        }
    }

    // Function to insert messages by simulating user input in Draft.js editor
    function insertMessage(type) {
        console.log(`insertMessage called with type: ${type}`);

        // Retrieve the user's first name
        const userElement = document.querySelector('div.cw_ContactLabel.cw_contact');
        let userName = '<USER>';
        if (userElement && userElement.textContent.trim()) {
            userName = userElement.textContent.trim().split(' ')[0];
            console.log(`User name found: ${userName}`);
        } else {
            console.warn('User name element not found.');
        }

        // Retrieve the ticket number
        const ticketInput = document.querySelector('input.cw_ChargeToTextBox');
        let ticketNumber = '<TICKET>';
        if (ticketInput && ticketInput.value) {
            const match = ticketInput.value.match(/\b\d{7}\b/);
            if (match) {
                ticketNumber = match[0];
                console.log(`Ticket number found: ${ticketNumber}`);
            } else {
                console.warn('Ticket number format does not match.');
            }
        } else {
            console.warn('Ticket input element not found or empty.');
        }

        // Define the message based on the button type
        let message = '';
        if (type === 'voicemailLeft') {
            message = `Hi ${userName},\n\nI tried calling through and have left a voicemail.\nCould you please call us back on 02 4217 7810 and quote ticket #${ticketNumber}.`;
        } else if (type === 'noVoicemail') {
            message = `Hi ${userName},\n\nI tried calling through but was unable to leave a voicemail.\nCould you please call us back on 02 4217 7810 and quote ticket #${ticketNumber}.`;
        } else if (type === 'noResponseClosure') {
            message = `Hi ${userName},\n\nWe have attempted to contact you via email and phone multiple times and have been unsuccessful.\nTicket #${ticketNumber} has now been closed due to unsuccessful attempts to reach you.\nIf you still require assistance, please reply to this email or call 02 4217 7810.`;
        }

        console.log(`Message to insert: ${message}`);

        // Locate the Draft.js editor's contenteditable div
        const editorDiv = document.querySelector('div.public-DraftEditor-content');
        if (editorDiv) {
            console.log('Editor div found.');

            try {
                // Focus on the editor first
                editorDiv.focus();

                // Insert a space character to ensure the editor is in edit mode
                document.execCommand('insertText', false, ' ');

                // Then insert the actual message
                document.execCommand('insertText', false, message);
                console.log('Message inserted successfully.');
            } catch (error) {
                console.error('Error inserting message:', error);
                alert('An error occurred while trying to insert the message.');
            }
        } else {
            console.error('Unable to find the Draft.js editor to insert the message.');
            alert('Unable to find the Draft.js editor to insert the message.');
        }
    }

    // Function to wait for the editor to be available using MutationObserver
    function waitForEditor(selector, callback) {
        const observer = new MutationObserver((mutations, obs) => {
            const editorDiv = document.querySelector(selector);
            if (editorDiv) {
                console.log('Editor div detected.');
                obs.disconnect();
                callback(editorDiv);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize the script after the page loads
    function init() {
        console.log('Initializing ConnectWise Bottom Bar Enhancements script.');
        // Wait for the editor to be available before creating the bottom bar
        waitForEditor('div.public-DraftEditor-content', createBottomBar);
    }

    window.addEventListener('load', init);
})();
