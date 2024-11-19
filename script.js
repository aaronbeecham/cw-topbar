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
            "localAdminId": "25303391"
        },
        "State Sport Centres Trust (SSCT)": {
            "itGlueId": "8261103",
            "credentialsId": "10494182",
            "localAdminId": "10972458"
        },
        "Lubrication Engineers": {
            "itGlueId": "8260966",
            "credentialsId": "2812021",
            "localAdminId": "4515777"
        },
        "Heard McEwan Pty Limited": {
            "itGlueId": "8260899",
            "credentialsId": "6090767",
            "localAdminId": "6078049"
        },
        "ECTARC": {
            "itGlueId": "8260856",
            "credentialsId": "26041223",
            "localAdminId": "25847056"
        },
        "Aquilius Investment Partners Pte. Ltd.": {
            "itGlueId": "8260774",
            "credentialsId": "17559312",
            "localAdminId": "17559429"
        },
        "Polyflor": {
            "itGlueId": "8261037",
            "credentialsId": "10096962",
            "localAdminId": "15045798"
        },
        "Chamberlains": {
            "itGlueId": "8260821",
            "credentialsId": "2551350",
            "localAdminId": "4515702"
        },
        "Axis Plumbing": {
            "itGlueId": "4585191",
            "credentialsId": "13763560",
            "localAdminId": "17144505"
        },
        "AWN Food & Fibre Holdings Pty Ltd": {
            "itGlueId": "8260787",
            "credentialsId": "18694396",
            "localAdminId": "20819327"
        },
        "Chartertech Pty Ltd": {
            "itGlueId": "8260823",
            "credentialsId": "14265908",
            "localAdminId": "20114900"
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
            "localAdminId": "22099378"
        },
        "Advanced Constructions": {
            "itGlueId": "8260765",
            "credentialsId": "18342882",
            "localAdminId": "17144505"
        },
        "Centurion Healthcare": {
            "itGlueId": "8260819",
            "credentialsId": "19132422",
            "localAdminId": "24621473"
        },
        "Curijo Pty Ltd": {
            "itGlueId": "8260839",
            "credentialsId": "14277889",
            "localAdminId": "15820693"
        },
        "My Gateway": {
            "itGlueId": "8261000",
            "credentialsId": "2291285",
            "localAdminId": "4515786"
        },
        "Domaine Wine Shippers (DWS)": {
            "itGlueId": "8260846",
            "credentialsId": "27996400",
            "localAdminId": "19777052"
        },
        "align.me": {
            "itGlueId": "4314127",
            "credentialsId": "17451897",
            "localAdminId": "9732988"
        },
        "CleanSpace Technology Pty Ltd": {
            "itGlueId": "8260753",
            "credentialsId": "16717196",
            "localAdminId": "7488319"
        },
        "Care Pharmaceuticals": {
            "itGlueId": "8260810",
            "credentialsId": "16884291",
            "localAdminId": "6375172"
        },
        "Nugan Estate Wines": {
            "itGlueId": "3614543",
            "credentialsId": "7001345",
            "localAdminId": "19082437"
        },
        "Mini Tankers Australia Pty Ltd (RFS)": {
            "itGlueId": "8260990",
            "credentialsId": "23630488",
            "localAdminId": "24408470"
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
            "localAdminId": "6375172",
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
            "localAdminId": "21242437",
        },
        "Valiant Commercial Furniture": {
            "itGlueId": "8261136",
            "credentialsId": "7571715",
            "localAdminId": "7488319",
        },
        "Back to Back Financial Planners": {
            "itGlueId": "8260789",
            "credentialsId": "14265815",
            "localAdminId": "16816209",
        },
        "IAH Sales Pty Ltd": {
            "itGlueId": "8260909",
            "credentialsId": "22578456",
            "localAdminId": "25610138",
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
        "Jackson Ranch": {
            "itGlueId": "8260790",
            "credentialsId": "28603048",
            "localAdminId": "4632827",
        },
        // Add more company names and IDs here as needed
    };

    // Function to get hardcoded local time offsets
    function getHardcodedTime(city, country) {
        const cityOffsets = {
            "Singapore": 8, // GMT+8
            "Sydney": 11, // GMT+11 (with daylight saving)
            "Brisbane": 10, // GMT+10
            "Auckland": 13 // GMT+13 (with daylight saving)
        };
        const countryOffsets = {
            "Australia": 11, // GMT+11 (default to Sydney timezone)
            "New Zealand": 13, // GMT+13 (default to Auckland timezone)
            "Singapore": 8 // GMT+8
        };
        let offset = cityOffsets[city];
        if (offset === undefined && country) {
            offset = countryOffsets[country];
        }
        if (offset !== undefined) {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const localTime = new Date(utc + (3600000 * offset));
            return localTime.toTimeString().slice(0, 5);
        }
        return "Time unavailable";
    }

    // Function to get city and country from input fields
    function getCityAndCountry() {
        const cityElement = document.querySelector('input.cw_companyViewCity');
        const countryElement = document.querySelector('input.cw_companyViewCountry');
        const city = cityElement ? cityElement.value.trim() : null;
        const country = countryElement ? countryElement.value.trim() : null;
        return { city, country };
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

        // Create or update the top bar
        let topBar = document.getElementById('customTopBar');
        let timeBar = document.getElementById('localTimeBar');
        if (!topBar) {
            // Main Top Bar
            topBar = document.createElement('div');
            topBar.id = 'customTopBar';
            topBar.style = `
                position: fixed;
                top: 0;
                background-color: #007bff;
                color: white;
                height: 44px;
                width: auto;
                display: flex;
                align-items: center;
                z-index: 9999;
                padding: 0 36px;
                border-radius: 0 0 5px 5px;
                cursor: move;
                user-select: none;
                left: 50%;
                transform: translateX(-50%);
            `;
            document.body.appendChild(topBar);

            // Local Time Bar
            timeBar = document.createElement('div');
            timeBar.id = 'localTimeBar';
            timeBar.style = `
                position: fixed;
                top: 44px;
                background-color: #0056b3;
                color: white;
                height: 22px;
                width: auto;
                padding: 0 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9998;
                border-radius: 0 0 5px 5px;
                left: 50%;
                transform: translateX(-50%);
            `;
            document.body.appendChild(timeBar);

            const timeDisplay = document.createElement('span');
            timeDisplay.innerText = "Loading local time...";
            timeBar.appendChild(timeDisplay);

            // Update Time Bar
            updateLocalTime(timeDisplay);

            // Enable Dragging
            let isDragging = false;
            let startX = 0;
            let initialLeft = 0;

            function onDragStart(e) {
                isDragging = true;
                startX = e.clientX;
                initialLeft = topBar.offsetLeft;
                document.body.style.userSelect = 'none';
            }

            function onDragMove(e) {
                if (!isDragging) return;
                const deltaX = e.clientX - startX;
                const newLeft = initialLeft + deltaX;
                topBar.style.left = `${newLeft}px`;
                timeBar.style.left = `${newLeft}px`;
            }

            function onDragEnd() {
                isDragging = false;
                document.body.style.userSelect = '';
            }

            const leftHandle = document.createElement('div');
            leftHandle.style = `
                width: 20px;
                height: 100%;
                cursor: move;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                left: 0;
                font-size: 20px;
                padding-left: 10px; // Add padding to the left side for extra spacing
            `;
            leftHandle.innerHTML = `&#x2630;`; // Triple bar icon
            leftHandle.style.color = '#fff';
            topBar.appendChild(leftHandle);

            const rightHandle = document.createElement('div');
            rightHandle.style = `
                width: 20px;
                height: 100%;
                cursor: move;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                right: 0;
                font-size: 20px;
                padding-right: 10px; // Add padding to the right side for extra spacing
            `;
            rightHandle.innerHTML = `&#x2630;`; // Triple bar icon
            rightHandle.style.color = '#fff';
            topBar.appendChild(rightHandle);


            leftHandle.addEventListener('mousedown', onDragStart);
            rightHandle.addEventListener('mousedown', onDragStart);
            document.addEventListener('mousemove', onDragMove);
            document.addEventListener('mouseup', onDragEnd);

            // Buttons
            const buttonContainer = document.createElement('div');
            buttonContainer.style = "display: flex; align-items: center; justify-content: center; margin: auto;";
            topBar.appendChild(buttonContainer);

            const itGlueButton = document.createElement('button');
            itGlueButton.innerText = 'IT Glue Link';
            itGlueButton.style = `
                background-color: white;
                color: #007bff;
                border: none;
                margin: 0 5px;
                padding: 5px 10px;
                cursor: pointer;
            `;
            itGlueButton.onclick = () => window.open(itGlueUrl, '_blank');
            buttonContainer.appendChild(itGlueButton);

            const credentialsButton = document.createElement('button');
            credentialsButton.innerText = '365 Credentials';
            credentialsButton.style = `
                background-color: white;
                color: #007bff;
                border: none;
                margin: 0 5px;
                padding: 5px 10px;
                cursor: pointer;
            `;
            credentialsButton.onclick = () => window.open(credentialsUrl, '_blank');
            buttonContainer.appendChild(credentialsButton);

            const localAdminButton = document.createElement('button');
            localAdminButton.innerText = 'Local Admin';
            localAdminButton.style = `
                background-color: white;
                color: #007bff;
                border: none;
                margin: 0 5px;
                padding: 5px 10px;
                cursor: pointer;
            `;
            localAdminButton.onclick = () => window.open(localAdminUrl, '_blank');
            buttonContainer.appendChild(localAdminButton);
        }
    }

    // Update local time periodically
    async function updateLocalTime(displayElement) {
        const { city, country } = getCityAndCountry();
        if (city || country) {
            const localTime = getHardcodedTime(city, country);
            displayElement.innerText = `Local Time: ${localTime}`;
        } else {
            displayElement.innerText = "City or Country not detected";
        }
        setTimeout(() => updateLocalTime(displayElement), 60000);
    }

    // Initialize the custom top bar immediately and retry every second
    addCustomTopBar();
    setInterval(addCustomTopBar, 1000);
})();