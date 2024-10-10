// ==UserScript==
// @name         Top Bar
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description  Add IT Glue and 365 Credentials buttons in a top bar for ConnectWise
// @author       Your Name
// @match        https://aus.myconnectwise.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define the company names and corresponding IDs
    const companyLinks = {
        "Family Services Australia (FSA)": {
            "itGlueId": "8260864",
            "credentialsId": "8576248"
        },
        "Peoplecare": {
            "itGlueId": "5429844",
            "credentialsId": "15552914"
        },
        "State Sport Centres Trust (SSCT)": {
            "itGlueId": "8261103",
            "credentialsId": "10494182"
        },
        "Lubrication Engineers": {
            "itGlueId": "8260966",
            "credentialsId": "2812021"
        },
        "Heard McEwan Pty Limited": {
            "itGlueId": "8260899",
            "credentialsId": "6090767"
        },
        "ECTARC": {
            "itGlueId": "8260856",
            "credentialsId": "26041223"
        },
        "Aquilius Investment Partners Pte. Ltd.": {
            "itGlueId": "8260774",
            "credentialsId": "17559312"
        },
        "Polyflor": {
            "itGlueId": "8261037",
            "credentialsId": "10096962"
        },
        "Chamberlains": {
            "itGlueId": "8260821",
            "credentialsId": "2551350"
        },
        "Axis Plumbing": {
            "itGlueId": "4585191",
            "credentialsId": "15338780"
        },
        "AWN Food & Fibre Holdings Pty Ltd": {
            "itGlueId": "8260787",
            "credentialsId": "24109183"
        },
        "Chartertech Pty Ltd": {
            "itGlueId": "8260823",
            "credentialsId": "14265908"
        },
        "Evolve Housing": {
            "itGlueId": "4842737",
            "credentialsId": "22010818"
        },
        "Girl Guides NSW, ACT & NT": {
            "itGlueId": "8260882",
            "credentialsId": "20606178"
        },
        "Endotherapeutics Pty Ltd": {
            "itGlueId": "8260859",
            "credentialsId": "23434860"
        },
        "Advanced Constructions": {
            "itGlueId": "8260765",
            "credentialsId": "18342882"
        },
        "Centurion Healthcare": {
            "itGlueId": "8260819",
            "credentialsId": "19132422"
        },
        // Add more company names and IDs here as needed
    };

    // Function to add the custom buttons in the top bar
    function addCustomTopBar() {
        // Get the company name from the input field
        const companyNameElement = document.querySelector('input.GL4OBY5BAVH.GL4OBY5BLVH.cw_company[type="text"]');
        let companyName = companyNameElement ? companyNameElement.value.trim() : null;

        // Set the default URLs (for unknown companies)
        const defaultItGlueUrl = 'https://virtual-it-services.itglue.com/';
        const defaultCredentialsUrl = 'https://virtual-it-services.itglue.com/';

        // Retry if the company name is not detected right away
        if (!companyName) {
            console.log('Company name not detected, retrying...');
            setTimeout(addCustomTopBar, 1000);  // Retry after 1 second if the company name is not found
            return;
        }

        // Determine the URLs based on the company IDs
        const companyData = companyLinks[companyName];
        const itGlueUrl = companyData ? `https://virtual-it-services.itglue.com/${companyData.itGlueId}` : defaultItGlueUrl;
        const credentialsUrl = companyData ? `https://virtual-it-services.itglue.com/${companyData.itGlueId}/passwords/${companyData.credentialsId}` : defaultCredentialsUrl;

        // Check if the top bar already exists
        if (!document.getElementById('customTopBar')) {
            // Create the top bar
            const topBar = document.createElement('div');
            topBar.id = 'customTopBar';
            topBar.style.position = 'fixed';
            topBar.style.top = '0';
            topBar.style.left = '0';
            topBar.style.width = '100%';
            topBar.style.backgroundColor = '#007bff';
            topBar.style.color = '#fff';
            topBar.style.height = '44px';
            topBar.style.zIndex = '9999';  // Ensure it stays on top of other elements
            topBar.style.display = 'flex';
            topBar.style.alignItems = 'center';
            topBar.style.justifyContent = 'center';

            // Create the IT Glue Link button
            const itGlueButton = document.createElement('button');
            itGlueButton.id = 'itGlueButton';
            itGlueButton.style.backgroundColor = '#fff';
            itGlueButton.style.color = '#007bff';
            itGlueButton.style.padding = '5px 10px';
            itGlueButton.style.border = 'none';
            itGlueButton.style.cursor = 'pointer';
            itGlueButton.style.margin = '0 10px';
            itGlueButton.innerText = 'IT Glue Link';
            itGlueButton.onclick = function() {
                window.open(itGlueUrl, '_blank');
            };

            // Create the 365 Credentials button
            const credentialsButton = document.createElement('button');
            credentialsButton.id = 'credentialsButton';
            credentialsButton.style.backgroundColor = '#fff';
            credentialsButton.style.color = '#007bff';
            credentialsButton.style.padding = '5px 10px';
            credentialsButton.style.border = 'none';
            credentialsButton.style.cursor = 'pointer';
            credentialsButton.innerText = '365 Credentials';
            credentialsButton.onclick = function() {
                window.open(credentialsUrl, '_blank');
            };

            // Add both buttons to the top bar
            topBar.appendChild(itGlueButton);
            topBar.appendChild(credentialsButton);

            // Add the top bar to the page
            document.body.insertBefore(topBar, document.body.firstChild);
            document.body.style.paddingTop = '44px';
        } else {
            // Update the buttons' URLs if the company changes
            const itGlueButton = document.getElementById('itGlueButton');
            const credentialsButton = document.getElementById('credentialsButton');
            itGlueButton.onclick = function() {
                window.open(itGlueUrl, '_blank');
            };
            credentialsButton.onclick = function() {
                window.open(credentialsUrl, '_blank');
            };
        }
    }

    // Continuously check every second to ensure the top bar is present and updated
    setInterval(addCustomTopBar, 1000);

})();
