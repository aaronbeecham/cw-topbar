// ==UserScript==
// @name         Top Bar
// @namespace    http://tampermonkey.net/
// @version      3.3
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
            "credentialsId": "23003598",
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
            "localAdminId": "10734174"
        },
        "Girl Guides NSW, ACT & NT": {
            "itGlueId": "8260882",
            "credentialsId": "20606178",
            "localAdminId": "20819381"
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
            "localAdminId": "6375172"
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
            "localAdminId": "17750338"
        },
        "Guidolin Agrimac": {
            "itGlueId": "8260895",
            "credentialsId": "17046512",
            "localAdminId": "17032597"
        },
        "Australian Amalgamated Terminals (AAT)": {
            "itGlueId": "8261173",
            "credentialsId": "21242437",
            "localAdminId": "21242437"
        },
        "Valiant Commercial Furniture": {
            "itGlueId": "8261136",
            "credentialsId": "7571715",
            "localAdminId": "7488319"
        },
        "Back to Back Financial Planners": {
            "itGlueId": "8260789",
            "credentialsId": "14265815",
            "localAdminId": "16816209"
        },
        "IAH Sales Pty Ltd": {
            "itGlueId": "8260909",
            "credentialsId": "25610138",
            "localAdminId": "25610138"
        },
        "Mayo Hardware": {
            "itGlueId": "8260981",
            "credentialsId": "3473633",
            "localAdminId": "4515782"
        },
        "Procurement Australia": {
            "itGlueId": "8261043",
            "credentialsId": "7082834",
            "localAdminId": "18916698"
        },
        "Splosh Australia": {
            "itGlueId": "8261100",
            "credentialsId": "27648201",
            "localAdminId": "27417205"
        },
        "Air Affairs Australia": {
            "itGlueId": "8260767",
            "credentialsId": "23117487",
            "localAdminId": ""
        },
        "Macedonian Welfare Association": {
            "itGlueId": "8260970",
            "credentialsId": "26043097",
            "localAdminId": "25667020"
        },
        "VFX Print Group": {
            "itGlueId": "8261137",
            "credentialsId": "3663335",
            "localAdminId": "4517162"
        },
        "Cater & Blumer": {
            "itGlueId": "8260815",
            "credentialsId": "26927946",
            "localAdminId": "27166668"
        },
        "Jackson Ranch": {
            "itGlueId": "8260790",
            "credentialsId": "28603048",
            "localAdminId": "4632827"
        },
        "Carey Group": {
            "itGlueId": "7203740",
            "credentialsId": "15492086",
            "localAdminId": "27649533"
        },
        "IMO Carwash Australasia": {
            "itGlueId": "8260913",
            "credentialsId": "18486608",
            "localAdminId": " "
        },
        "Mia Passenger Express P/L": {
            "itGlueId": "8260988",
            "credentialsId": "5988631",
            "localAdminId": "24574921"
        },
        "Hillston Medical Centre": {
            "itGlueId": "8260903",
            "credentialsId": "10609755",
            "localAdminId": "13653232"
        },
        "GB Sports": {
            "itGlueId": "8260880",
            "credentialsId": "5987544",
            "localAdminId": " "
        },
        "Grants Sawmilling Co": {
            "itGlueId": "8260889",
            "credentialsId": "6915823",
            "localAdminId": "13356091"
        },
        "David Davidge": {
            "itGlueId": "8260843",
            "credentialsId": "6672179",
            "localAdminId": "13918204"
        },
        "Nugan Estate Wines": {
            "itGlueId": "3614543",
            "credentialsId": "7001345",
            "localAdminId": "19082437"
        },
        "Mackenzie & Vardanega": {
            "itGlueId": "8260971",
            "credentialsId": "6689689",
            "localAdminId": "18171868"
        },
        "Racecourse Projects Pty Limited": {
            "itGlueId": "8261051",
            "credentialsId": "10619490",
            "localAdminId": "10720221"
        },
        "Swift Metal Australia": {
            "itGlueId": "8261111",
            "credentialsId": "25209230",
            "localAdminId": "16867316"
        },
        "Cox Sherlock Accountants": {
            "itGlueId": "5408382",
            "credentialsId": "13761505",
            "localAdminId": "22372607"
        },
        "Leeton Soldiers Club": {
            "itGlueId": "8260952",
            "credentialsId": "8061470",
            "localAdminId": " "
        },
        "Insurance Council Of Australia": {
            "itGlueId": "8260921",
            "credentialsId": "25427385",
            "localAdminId": "25427205"
        },
        "LJH Belconnen": {
            "itGlueId": "8260964",
            "credentialsId": "18373219",
            "localAdminId": "21260862"
        },
        "Patrick Dawson Law": {
            "itGlueId": "8261030",
            "credentialsId": "20575150",
            "localAdminId": "20084383"
        },
        "Patrick Dawson Law": {
            "itGlueId": "5408362",
            "credentialsId": "14265704",
            "localAdminId": "21510050"
        },
        "Rapid Clean Griffith": {
            "itGlueId": "8261054",
            "credentialsId": "14471557",
            "localAdminId": "19985782"
        },
        "AFPA - Australian Forest Products Association": {
            "itGlueId": "8260766",
            "credentialsId": "14265641",
            "localAdminId": "28863397"
        },
        "Eagle Foods Holdings": {
            "itGlueId": "8260852",
            "credentialsId": "8008058",
            "localAdminId": "28788705"
        },
        "EUROLUCE": {
            "itGlueId": "1841893",
            "credentialsId": "5074243",
            "localAdminId": "5149368"
        },
        "Lazard Australia Pty Ltd": {
            "itGlueId": "8260949",
            "credentialsId": "13406412",
            "localAdminId": "28415993"
        },
        "ORIGINAL MATTRESS FACTORY PTY LTD (OMF)": {
            "itGlueId": "8230804",
            "credentialsId": "",
            "localAdminId": ""
        },
        "Washington Brown": {
            "itGlueId": "8261146",
            "credentialsId": "18249344",
            "localAdminId": "13499611"
        },
        "Polczynski Robinson Pty Limited": {
            "itGlueId": "8261036",
            "credentialsId": "12847387",
            "localAdminId": "25263640"
        },
        "RBA": {
            "itGlueId": "8261056",
            "credentialsId": "20576834",
            "localAdminId": "4317575"
        },
        "Interactive Community Care": {
            "itGlueId": "8260922",
            "credentialsId": "16830061",
            "localAdminId": "16830099"
        },
        "Kedesh Rehabilitation Services": {
            "itGlueId": "8260933",
            "credentialsId": "4830494",
            "localAdminId": "4515772"
        },
        "Directions Conference & Incentive Management": {
            "itGlueId": "4261353",
            "credentialsId": "1283683",
            "localAdminId": "28826564"
        },
        "Warilla Bowls and Recreation Club": {
            "itGlueId": "8261144",
            "credentialsId": "19059229",
            "localAdminId": "19282859"
        },
        "St John Ambulance Australia": {
            "itGlueId": "8261102",
            "credentialsId": "26297422",
            "localAdminId": "25703108"
        },
        "Bannisters Hotels": {
            "itGlueId": "8260790",
            "credentialsId": "5299093",
            "localAdminId": "4632827"
        },
        "Maker Eng": {
            "itGlueId": "8534917",
            "credentialsId": "30173465",
            "localAdminId": "30065109"
        },
        "Leeton Steel Retail": {
            "itGlueId": "8260953",
            "credentialsId": "11191744",
            "localAdminId": "21786997"
        },
        "QinetiQ Air Affairs": {
            "itGlueId": "8260767",
            "credentialsId": "23117487",
            "localAdminId": "26730866"
        },
        "RapidG": {
            "itGlueId": "8261054",
            "credentialsId": "14265153",
            "localAdminId": "19985782"
        },
        // Add more company names and IDs here as needed
    };

    // Declare variables at the top scope
    let previousCompanyName = null;
    let topBar, timeBar;
    let itGlueButton, credentialsButton, localAdminButton;

    // Function to get hardcoded local time offsets based on state, postcode, or country
    function getHardcodedTime(state, postcode, country) {
        const stateOffsets = {
            "NSW": 11,   // AEDT (UTC+11)
            "ACT": 11,   // AEDT (UTC+11)
            "VIC": 11,   // AEDT (UTC+11)
            "TAS": 11,   // AEDT (UTC+11)
            "QLD": 10,   // AEST (UTC+10)
            "SA": 10.5,  // ACDT (UTC+10.5)
            "NT": 9.5,   // ACST (UTC+9.5)
            "WA": 8      // AWST (UTC+8)
        };

        const postcodeOffsets = {
            "0": 11,     // NSW/ACT
            "1": 11,     // NSW/ACT
            "2": 11,     // NSW/ACT
            "3": 11,     // VIC
            "4": 10,     // QLD
            "5": 10.5,   // SA
            "6": 8,      // WA
            "7": 11,     // TAS
            "8": 9.5,    // NT
            "9": 10.5    // SA
        };

        const countryOffsets = {
            "Australia": 11,   // Default to AEDT (UTC+11)
            "Singapore": 8     // SGT (UTC+8)
            // Add more countries as needed
        };

        let offset;

        if (state && stateOffsets[state.toUpperCase()]) {
            offset = stateOffsets[state.toUpperCase()];
        } else if (postcode && postcode[0] && postcodeOffsets[postcode[0]]) {
            offset = postcodeOffsets[postcode[0]];
        } else if (country && countryOffsets[country]) {
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

    // Function to get state, postcode, and country from input fields
    function getStatePostcodeCountry() {
        const stateElement = document.querySelector('input.cw_companyViewState');
        const postcodeElement = document.querySelector('input.cw_companyViewZip');
        const countryElement = document.querySelector('input.cw_companyViewCountry');
        const state = stateElement ? stateElement.value.trim() : null;
        const postcode = postcodeElement ? postcodeElement.value.trim() : null;
        const country = countryElement ? countryElement.value.trim() : null;
        return { state, postcode, country };
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

                // Restore position from localStorage if available
                const savedPosition = localStorage.getItem('customTopBarPosition');
                if (savedPosition) {
                    topBar.style.left = `${savedPosition}px`;
                    topBar.style.transform = `translateX(0)`; // Disable centering if position is set
                }

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
                    left: ${topBar.style.left};
                    transform: translateX(0);
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
                    initialLeft = parseInt(topBar.style.left.replace('px', ''));
                    document.body.style.userSelect = 'none';
                }

                function onDragMove(e) {
                    if (!isDragging) return;
                    const deltaX = e.clientX - startX;
                    const newLeft = initialLeft + deltaX;
                    topBar.style.left = `${newLeft}px`;
                    topBar.style.transform = `translateX(0)`; // Disable centering when dragging

                    // Update timeBar position to stay attached and centered to the top bar
                    const topBarWidth = topBar.offsetWidth;
                    const timeBarWidth = timeBar.offsetWidth;
                    const timeBarLeft = newLeft + (topBarWidth / 2) - (timeBarWidth / 2);
                    timeBar.style.left = `${timeBarLeft}px`;
                    timeBar.style.transform = `translateX(0)`;
                }

                function onDragEnd() {
                    isDragging = false;
                    document.body.style.userSelect = '';
                    // Save position to localStorage
                    localStorage.setItem('customTopBarPosition', topBar.style.left.replace('px', ''));
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
                    padding-left: 10px;
                `;
                leftHandle.innerHTML = `&#x2630;`;
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
                    padding-right: 10px;
                `;
                rightHandle.innerHTML = `&#x2630;`;
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
        const { state, postcode, country } = getStatePostcodeCountry();
        if (state || postcode || country) {
            const localTime = getHardcodedTime(state, postcode, country);
            displayElement.innerText = `Local Time: ${localTime}`;
        } else {
            displayElement.innerText = "Location not detected";
        }
        setTimeout(() => updateLocalTime(displayElement), 60000);
    }

    // Initialize the custom top bar and check for company changes every second
    setInterval(addCustomTopBar, 1000);
})();
