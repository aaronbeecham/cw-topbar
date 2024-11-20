// ==UserScript==
// @name         Top Bar
// @namespace    http://tampermonkey.net/
// @version      3.0
// @match        https://aus.myconnectwise.net/*
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/aaronbeecham/cw-topbar@main/companyLinks.js
// ==/UserScript==

(function() {
    'use strict';

    // Declare variables at the top scope
    let previousCompanyName = null;
    let topBar, timeBar;
    let itGlueButton, credentialsButton, localAdminButton;

    // Function to get hardcoded local time offsets based on state, postcode, or country
    function getHardcodedTime(state, postcode, country) {
        // ... (same as before)
    }

    // Function to get state, postcode, and country from input fields
    function getStatePostcodeCountry() {
        // ... (same as before)
    }

    // Function to create or update the top bar
    function addCustomTopBar() {
        const companyNameElement = document.querySelector('input.GMDB3DUBKVH.GMDB3DUBFWH.cw_company[type="text"]');
        const companyName = companyNameElement ? companyNameElement.value.trim() : null;

        if (!companyName) {
            console.log('Company name not detected, retrying...');
            setTimeout(addCustomTopBar, 1000);
            return;
        }

        // Only proceed if the company name has changed
        if (companyName !== previousCompanyName) {
            previousCompanyName = companyName;

            const companyData = companyLinks[companyName];
            const baseUrl = companyData?.useGreenlightUrl
                ? 'https://greenlight-itc.itglue.com/'
                : 'https://virtual-it-services.itglue.com/';
            const itGlueUrl = companyData?.itGlueId ? `${baseUrl}${companyData.itGlueId}` : baseUrl;
            const credentialsUrl = companyData?.credentialsId
                ? `${baseUrl}${companyData.itGlueId}/passwords/${companyData.credentialsId}`
                : baseUrl;
            const localAdminUrl = companyData?.localAdminId
                ? `${baseUrl}${companyData.itGlueId}/passwords/${companyData.localAdminId}`
                : baseUrl;

            // If the top bar doesn't exist, create it
            if (!topBar) {
                // ... (creation of topBar and timeBar, same as before)

                // Buttons
                const buttonContainer = document.createElement('div');
                buttonContainer.style = "display: flex; align-items: center; justify-content: center; margin: auto;";
                topBar.appendChild(buttonContainer);

                itGlueButton = document.createElement('button');
                itGlueButton.innerText = 'IT Glue Link';
                itGlueButton.style = `
                    background-color: white;
                    color: #007bff;
                    border: none;
                    margin: 0 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                `;
                buttonContainer.appendChild(itGlueButton);

                credentialsButton = document.createElement('button');
                credentialsButton.innerText = '365 Credentials';
                credentialsButton.style = `
                    background-color: white;
                    color: #007bff;
                    border: none;
                    margin: 0 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                `;
                buttonContainer.appendChild(credentialsButton);

                localAdminButton = document.createElement('button');
                localAdminButton.innerText = 'Local Admin';
                localAdminButton.style = `
                    background-color: white;
                    color: #007bff;
                    border: none;
                    margin: 0 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                `;
                buttonContainer.appendChild(localAdminButton);
            }

            // Update button onclick handlers with the new URLs
            itGlueButton.onclick = () => window.open(itGlueUrl, '_blank');
            credentialsButton.onclick = () => window.open(credentialsUrl, '_blank');
            localAdminButton.onclick = () => window.open(localAdminUrl, '_blank');
        }
    }

    // Update local time periodically
    async function updateLocalTime(displayElement) {
        // ... (same as before)
    }

    // Initialize the custom top bar and check for company changes every second
    setInterval(addCustomTopBar, 1000);
})();
