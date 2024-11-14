// ==UserScript==
// @name         Top Bar
// @namespace    http://tampermonkey.net/
// @version      2.9
// @match        https://aus.myconnectwise.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define the company names and corresponding IDs
    const companyLinks = {
        "Family Services Australia (FSA)": {
            "itGlueId": "8260864",
            "credentialsId": "8576248",
            "localAdminId": "24481000"
        },
        "Peoplecare": {
            "itGlueId": "5429844",
            "credentialsId": "15552914",
            "localAdminId": ""
        },
        "State Sport Centres Trust (SSCT)": {
            "itGlueId": "8261103",
            "credentialsId": "10494182",
            "localAdminId": "10972458"
        },
        "Lubrication Engineers": {
            "itGlueId": "8260966",
            "credentialsId": "2812021",
            "localAdminId": ""
        },
        "Heard McEwan Pty Limited": {
            "itGlueId": "8260899",
            "credentialsId": "6090767",
            "localAdminId": ""
        },
        "ECTARC": {
            "itGlueId": "8260856",
            "credentialsId": "26041223",
            "localAdminId": ""
        },
        "Aquilius Investment Partners Pte. Ltd.": {
            "itGlueId": "8260774",
            "credentialsId": "17559312",
            "localAdminId": "17559429"
        },
        "Polyflor": {
            "itGlueId": "8261037",
            "credentialsId": "10096962",
            "localAdminId": ""
        },
        "Chamberlains": {
            "itGlueId": "8260821",
            "credentialsId": "2551350",
            "localAdminId": "4515702"
        },
        "Axis Plumbing": {
            "itGlueId": "4585191",
            "credentialsId": "13763560",
            "localAdminId": ""
        },
        "AWN Food & Fibre Holdings Pty Ltd": {
            "itGlueId": "8260787",
            "credentialsId": "18694396",
            "localAdminId": "20819327"
        },
        "Chartertech Pty Ltd": {
            "itGlueId": "8260823",
            "credentialsId": "14265908",
            "localAdminId": ""
        },
        "Evolve Housing": {
            "itGlueId": "4842737",
            "credentialsId": "22010818",
            "localAdminId": "14628112"
        },
        "Girl Guides NSW, ACT & NT": {
            "itGlueId": "8260882",
            "credentialsId": "20606178",
            "localAdminId": ""
        },
        "Endotherapeutics Pty Ltd": {
            "itGlueId": "8260859",
            "credentialsId": "23434860",
            "localAdminId": ""
        },
        "Advanced Constructions": {
            "itGlueId": "8260765",
            "credentialsId": "18342882",
            "localAdminId": ""
        },
        "Centurion Healthcare": {
            "itGlueId": "8260819",
            "credentialsId": "19132422",
            "localAdminId": ""
        },
        "Curijo Pty Ltd": {
            "itGlueId": "8260839",
            "credentialsId": "14277889",
            "localAdminId": "15820693"
        },
        "My Gateway": {
            "itGlueId": "8261000",
            "credentialsId": "2291285",
            "localAdminId": ""
        },
        "Domaine Wine Shippers (DWS)": {
            "itGlueId": "8260846",
            "credentialsId": "27996400",
            "localAdminId": ""
        },
        "align.me": {
            "itGlueId": "4314127",
            "credentialsId": "17451897",
            "localAdminId": "9732988"
        },
        "CleanSpace Technology Pty Ltd": {
            "itGlueId": "8260753",
            "credentialsId": "16717196",
            "localAdminId": ""
        },
        "Care Pharmaceuticals": {
            "itGlueId": "8260810",
            "credentialsId": "16884291",
            "localAdminId": ""
        },
        "Nugan Estate Wines": {
            "itGlueId": "3614543",
            "credentialsId": "7001345",
            "localAdminId": ""
        },
        "Mini Tankers Australia Pty Ltd (RFS)": {
            "itGlueId": "8260990",
            "credentialsId": "23630488",
            "localAdminId": ""
        },
        "Australian Indigenous Education Foundation (AIEF)": {
            "itGlueId": "8260782",
            "credentialsId": "16716437",
            "localAdminId": "24325209"
        },
        "RSL National": {
            "itGlueId": "8261081",
            "credentialsId": "13762888",
            "localAdminId": "24325209"
        },
        "Briemar Nominees Pty Ltd": {
            "itGlueId": "8260810",
            "credentialsId": "16884291",
            "localAdminId": "",
        },
        "ROC Partners Pty Limited": {
            "itGlueId": "3010977",
            "credentialsId": "5617401",
            "localAdminId": "5617396",
            "useGreenlightUrl": true
        },
        "Infrastructure Sustainability Council (ISCA)": {
            "itGlueId": "6174644",
            "credentialsId": "19652915",
            "localAdminId": "17750338",
        },
        "Guidolin Agrimac": {
            "itGlueId": "8260895",
            "credentialsId": "17046512",
            "localAdminId": "17032597",
        },
        "Australian Amalgamated Terminals (AAT)": {
            "itGlueId": "8261173",
            "credentialsId": "21242437",
            "localAdminId": "",
        },
        "Valiant Commercial Furniture": {
            "itGlueId": "8261136",
            "credentialsId": "7571715",
            "localAdminId": "7488319",
        },
        "Back to Back Financial Planners": {
            "itGlueId": "8260789",
            "credentialsId": "14265815",
            "localAdminId": "",
        },
        "IAH Sales Pty Ltd": {
            "itGlueId": "8260909",
            "credentialsId": "22578456",
            "localAdminId": "",
        },
        "Mayo Hardware": {
            "itGlueId": "8260981",
            "credentialsId": "3473633",
            "localAdminId": "4515782",
        },
        "Procurement Australia": {
            "itGlueId": "8261043",
            "credentialsId": "7082834",
            "localAdminId": "18916698",
        },
        "Splosh Australia": {
            "itGlueId": "8261100",
            "credentialsId": "27648201",
            "localAdminId": "27417205",
        },
        "Air Affairs Australia": {
            "itGlueId": "8260767",
            "credentialsId": "23117487",
            "localAdminId": "",
        },
        "Macedonian Welfare Association": {
            "itGlueId": "8260970",
            "credentialsId": "26043097",
            "localAdminId": "25667020",
        },
        "VFX Print Group": {
            "itGlueId": "8261137",
            "credentialsId": "3663335",
            "localAdminId": "4517162",
        },
        "Cater & Blumer": {
            "itGlueId": "8260815",
            "credentialsId": "26927946",
            "localAdminId": "27166668",
        },
        // Add more company names and IDs here as needed
    };

    // Function to add the custom buttons in the top bar
    function addCustomTopBar() {
        // Get the company name from the input field
        const companyNameElement = document.querySelector('input.GL4OBY5BAVH.GL4OBY5BLVH.cw_company[type="text"]');
        let companyName = companyNameElement ? companyNameElement.value.trim() : null;

        // Set the default base URL
        const defaultBaseUrl = 'https://virtual-it-services.itglue.com/';

        // Set the default URLs (for unknown companies)
        const defaultItGlueUrl = defaultBaseUrl;
        const defaultCredentialsUrl = defaultBaseUrl;
        const defaultLocalAdminUrl = defaultBaseUrl;

        // Retry if the company name is not detected right away
        if (!companyName) {
            console.log('Company name not detected, retrying...');
            setTimeout(addCustomTopBar, 1000);  // Retry after 1 second if the company name is not found
            return;
        }

        // Determine the URLs based on the company IDs
        const companyData = companyLinks[companyName];
        const baseItGlueUrl = companyData && companyData.useGreenlightUrl ? 'https://greenlight-itc.itglue.com/' : defaultBaseUrl;
        const itGlueUrl = companyData ? `${baseItGlueUrl}${companyData.itGlueId}` : defaultItGlueUrl;
        const credentialsUrl = companyData && companyData.credentialsId ? `${baseItGlueUrl}${companyData.itGlueId}/passwords/${companyData.credentialsId}` : defaultCredentialsUrl;
        const localAdminUrl = companyData && companyData.localAdminId ? `${baseItGlueUrl}${companyData.itGlueId}/passwords/${companyData.localAdminId}` : defaultLocalAdminUrl;

        // Check if the top bar already exists
        if (!document.getElementById('customTopBar')) {
            // Create the top bar
            const topBar = document.createElement('div');
            topBar.id = 'customTopBar';
            topBar.style.position = 'fixed';
            topBar.style.top = '0';
            topBar.style.backgroundColor = '#007bff';
            topBar.style.color = '#fff';
            topBar.style.height = '44px';
            topBar.style.zIndex = '9999';  // Ensure it stays on top of other elements
            topBar.style.display = 'flex';
            topBar.style.alignItems = 'center';
            topBar.style.justifyContent = 'center';
            topBar.style.padding = '0 20px';  // Add buffer space around the sides of the buttons
            topBar.style.borderRadius = '0 0 5px 5px';  // Optional: rounded corners at the bottom
            topBar.style.cursor = 'move'; // Indicate that the bar is draggable
            topBar.style.userSelect = 'none'; // Prevent text selection during drag

            // Restore position from localStorage or center it
            let storedPosition = localStorage.getItem('topBarPosition');
            if (storedPosition !== null) {
                topBar.style.left = `${storedPosition}px`;
            } else {
                // Center the top bar
                topBar.style.left = '50%';
                topBar.style.transform = 'translateX(-50%)';
            }

            // Create left and right grab indicators
            const leftGrab = document.createElement('div');
            leftGrab.style.width = '10px';
            leftGrab.style.height = '100%';
            leftGrab.style.cursor = 'move';
            leftGrab.style.display = 'flex';
            leftGrab.style.alignItems = 'center';
            leftGrab.style.justifyContent = 'center';
            leftGrab.style.marginRight = '5px';

            const rightGrab = document.createElement('div');
            rightGrab.style.width = '10px';
            rightGrab.style.height = '100%';
            rightGrab.style.cursor = 'move';
            rightGrab.style.display = 'flex';
            rightGrab.style.alignItems = 'center';
            rightGrab.style.justifyContent = 'center';
            rightGrab.style.marginLeft = '5px';

            // Use Unicode characters for grab indicators
            leftGrab.innerHTML = '&#x2630;'; // Triple bar icon
            rightGrab.innerHTML = '&#x2630;'; // Triple bar icon

            leftGrab.style.color = '#fff';
            rightGrab.style.color = '#fff';

            // Variables for dragging
            let isDragging = false;
            let startX = 0;
            let initialLeft = 0;

            // Mouse event handlers for the grab indicators
            function dragMouseDown(e) {
                isDragging = true;
                startX = e.clientX;
                initialLeft = topBar.offsetLeft;
                topBar.style.transition = 'none'; // Disable transitions during drag
                document.body.style.userSelect = 'none'; // Prevent text selection during drag
            }

            function dragMouseMove(e) {
                if (isDragging) {
                    let deltaX = e.clientX - startX;
                    let newLeft = initialLeft + deltaX;

                    // Prevent the bar from moving off-screen
                    const maxLeft = window.innerWidth - topBar.offsetWidth;
                    if (newLeft < 0) newLeft = 0;
                    if (newLeft > maxLeft) newLeft = maxLeft;

                    topBar.style.left = `${newLeft}px`;
                    topBar.style.transform = ''; // Remove transform when dragging
                }
            }

            function dragMouseUp(e) {
                if (isDragging) {
                    isDragging = false;
                    // Save the position to localStorage
                    localStorage.setItem('topBarPosition', topBar.offsetLeft);
                    topBar.style.transition = ''; // Re-enable transitions if any
                    document.body.style.userSelect = ''; // Re-enable text selection
                }
            }

            // Attach event listeners to the grab indicators
            leftGrab.addEventListener('mousedown', dragMouseDown);
            rightGrab.addEventListener('mousedown', dragMouseDown);
            document.addEventListener('mousemove', dragMouseMove);
            document.addEventListener('mouseup', dragMouseUp);

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
            credentialsButton.style.margin = '0 10px';
            credentialsButton.innerText = '365 Credentials';
            credentialsButton.onclick = function() {
                window.open(credentialsUrl, '_blank');
            };

            // Create the Local Admin button
            const localAdminButton = document.createElement('button');
            localAdminButton.id = 'localAdminButton';
            localAdminButton.style.backgroundColor = '#fff';
            localAdminButton.style.color = '#007bff';
            localAdminButton.style.padding = '5px 10px';
            localAdminButton.style.border = 'none';
            localAdminButton.style.cursor = 'pointer';
            localAdminButton.style.margin = '0 10px';
            localAdminButton.innerText = 'Local Admin';
            localAdminButton.onclick = function() {
                window.open(localAdminUrl, '_blank');
            };

            // Create a container for the buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.alignItems = 'center';
            buttonContainer.style.justifyContent = 'center';

            // Add buttons to the container
            buttonContainer.appendChild(itGlueButton);
            buttonContainer.appendChild(credentialsButton);
            buttonContainer.appendChild(localAdminButton);

            // Build the top bar
            topBar.appendChild(leftGrab);
            topBar.appendChild(buttonContainer);
            topBar.appendChild(rightGrab);

            // Add the top bar to the page
            document.body.insertBefore(topBar, document.body.firstChild);
            document.body.style.paddingTop = '44px';
        } else {
            // Update the buttons' URLs if the company changes
            const itGlueButton = document.getElementById('itGlueButton');
            const credentialsButton = document.getElementById('credentialsButton');
            const localAdminButton = document.getElementById('localAdminButton');
            itGlueButton.onclick = function() {
                window.open(itGlueUrl, '_blank');
            };
            credentialsButton.onclick = function() {
                window.open(credentialsUrl, '_blank');
            };
            localAdminButton.onclick = function() {
                window.open(localAdminUrl, '_blank');
            };
        }
    }

    // Continuously check every 5 seconds to ensure the top bar is present and updated
    setInterval(addCustomTopBar, 5000);

})();
