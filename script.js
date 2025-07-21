// ==UserScript==
// @name         Top Bar (Modern UI - Tweaked)
// @namespace    http://tampermonkey.net/
// @version      3.6
// @match        https://aus.myconnectwise.net/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Load Google Font
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    const companyLinks = {
        "Trenton International": {
            "itGlueId": "1842422",
            "credentialsId": "4005427",
            "localAdminId": "29075352",
            "msaasId": "",
            "soeId": "",
            "usePowernetUrl": true
        },
        "Pacific Rail Engineering": {
            "itGlueId": "8261026",
            "credentialsId": "6437438",
            "localAdminId": "6434752",
            "msaasId": "",
            "soeId": ""
        },
        "Quinn O'Hanlon Architects Pty Ltd": {
            "itGlueId": "4746286",
            "credentialsId": "13462897",
            "localAdminId": "28751069",
            "msaasId": "",
            "soeId": "",
            "usePowernetUrl": true
        },
        "Family Services Australia (FSA)": {
            "itGlueId": "8260864",
            "credentialsId": "8576248",
            "localAdminId": "24481000",
            "msaasId": "293022-msaas-summary",
            "soeId": "52627-applications"
        },
        "Peoplecare": {
            "itGlueId": "5429844",
            "credentialsId": "15552914",
            "localAdminId": "25303391",
            "msaasId": "",
            "soeId": ""
        },
        "State Sport Centres Trust (SSCT)": {
            "itGlueId": "8261103",
            "credentialsId": "10494182",
            "localAdminId": "10972458",
            "msaasId": "",
            "soeId": ""
        },
        "Lubrication Engineers": {
            "itGlueId": "8260966",
            "credentialsId": "2812021",
            "localAdminId": "4515777",
            "msaasId": "",
            "soeId": ""
        },
        "Heard McEwan Pty Limited": {
            "itGlueId": "8260899",
            "credentialsId": "6090767",
            "localAdminId": "6078049",
            "msaasId": "",
            "soeId": ""
        },
        "ECTARC": {
            "itGlueId": "8260856",
            "credentialsId": "26041223",
            "localAdminId": "25847056",
            "msaasId": "",
            "soeId": ""
        },
        "Aquilius Investment Partners Pte. Ltd.": {
            "itGlueId": "8260774",
            "credentialsId": "17559312",
            "localAdminId": "17559429",
            "msaasId": "293022-msaas-summary",
            "soeId": "52627-applications"
        },
        "Polyflor": {
            "itGlueId": "8261037",
            "credentialsId": "10096962",
            "localAdminId": "15045798",
            "msaasId": "",
            "soeId": ""
        },
        "Chamberlains": {
            "itGlueId": "8260821",
            "credentialsId": "23003598",
            "localAdminId": "4515702",
            "msaasId": "",
            "soeId": ""
        },
        "Axis Plumbing": {
            "itGlueId": "4585191",
            "credentialsId": "13763560",
            "localAdminId": "17144505",
            "msaasId": "",
            "soeId": ""
        },
        "AWN Food & Fibre Holdings Pty Ltd": {
            "itGlueId": "8260787",
            "credentialsId": "18694396",
            "localAdminId": "20819327",
            "msaasId": "",
            "soeId": ""
        },
        "Chartertech Pty Ltd": {
            "itGlueId": "8260823",
            "credentialsId": "14265908",
            "localAdminId": "20114900",
            "msaasId": "",
            "soeId": ""
        },
        "Evolve Housing": {
            "itGlueId": "4842737",
            "credentialsId": "22010818",
            "localAdminId": "10734174",
            "msaasId": "",
            "soeId": ""
        },
        "Girl Guides NSW, ACT & NT": {
            "itGlueId": "8260882",
            "credentialsId": "20606178",
            "localAdminId": "20819381",
            "msaasId": "",
            "soeId": ""
        },
        "Endotherapeutics Pty Ltd": {
            "itGlueId": "8260859",
            "credentialsId": "23434860",
            "localAdminId": "22099378",
            "msaasId": "",
            "soeId": ""
        },
        "Advanced Constructions": {
            "itGlueId": "8260765",
            "credentialsId": "18342882",
            "localAdminId": "17144505",
            "msaasId": "",
            "soeId": ""
        },
        "Centurion Healthcare": {
            "itGlueId": "8260819",
            "credentialsId": "19132422",
            "localAdminId": "24621473",
            "msaasId": "",
            "soeId": ""
        },
        "Curijo Pty Ltd": {
            "itGlueId": "8260839",
            "credentialsId": "14277889",
            "localAdminId": "15820693",
            "msaasId": "",
            "soeId": ""
        },
        "My Gateway": {
            "itGlueId": "8261000",
            "credentialsId": "2291285",
            "localAdminId": "4515786",
            "msaasId": "",
            "soeId": ""
        },
        "Domaine Wine Shippers (DWS)": {
            "itGlueId": "8260846",
            "credentialsId": "27996400",
            "localAdminId": "19777052",
            "msaasId": "",
            "soeId": ""
        },
        "align.me": {
            "itGlueId": "4314127",
            "credentialsId": "17451897",
            "localAdminId": "9732988",
            "msaasId": "",
            "soeId": ""
        },
        "CleanSpace Technology Pty Ltd": {
            "itGlueId": "8260753",
            "credentialsId": "16717196",
            "localAdminId": "7488319",
            "msaasId": "",
            "soeId": ""
        },
        "Care Pharmaceuticals": {
            "itGlueId": "8260810",
            "credentialsId": "16884291",
            "localAdminId": "6375172",
            "msaasId": "",
            "soeId": ""
        },
        "Nugan Estate Wines": {
            "itGlueId": "3614543",
            "credentialsId": "7001345",
            "localAdminId": "19082437",
            "msaasId": "",
            "soeId": ""
        },
        "Mini Tankers Australia Pty Ltd (RFS)": {
            "itGlueId": "8260990",
            "credentialsId": "23630488",
            "localAdminId": "24408470",
            "msaasId": "",
            "soeId": ""
        },
        "Australian Indigenous Education Foundation (AIEF)": {
            "itGlueId": "8260782",
            "credentialsId": "16716437",
            "localAdminId": "24325209",
            "msaasId": "",
            "soeId": ""
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
            "msaasId": "339336-msaas-summary",
            "soeId": "99848-applications",
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
            "localAdminId": "21242437",
            "msaasId": "293022-msaas-summary",
            "soeId": "52627-applications"
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
            "credentialsId": "18031037",
            "localAdminId": "16867316",
            "msaasId": "293022-msaas-summary",
            "soeId": "52627-applications"
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
            "credentialsId": "31801881",
            "localAdminId": "5149368",
            "usePowernetUrl": true
        },
        "Lazard Australia Pty Ltd": {
            "itGlueId": "8260949",
            "credentialsId": "13406412",
            "localAdminId": "28415993"
        },
        "ORIGINAL MATTRESS FACTORY PTY LTD (OMF)": {
            "itGlueId": "4737892",
            "credentialsId": "11278437",
            "localAdminId": "11499284",
            "usePowernetUrl": true
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
        "Preston Lane": {
            "itGlueId": "8261041",
            "credentialsId": "22353031",
            "localAdminId": "17069563"
        },
        "TAGGLE SYSTEMS": {
            "itGlueId": "5213129",
            "credentialsId": "13113370",
            "localAdminId": "15987017",
            "usePowernetUrl": true
        },
        "Pacific Rail Engineering": {
            "itGlueId": "8261026",
            "credentialsId": "6437438",
            "localAdminId": "6434752"
        },
        "NKT Pty Ltd": {
            "itGlueId": "1841971",
            "credentialsId": "",
            "localAdminId": "17608620",
            "usePowernetUrl": true
        },
        "Wise Group Solutions Pty Ltd": {
            "itGlueId": "5489911",
            "credentialsId": "14547831",
            "localAdminId": "22220552",
            "usePowernetUrl": true
        },
        "Sydney Prop Specialists (SPS)": {
            "itGlueId": "8261112",
            "credentialsId": "1569096",
            "localAdminId": "28631505",
            "msaasId": "293022-msaas-summary",
            "soeId": "52627-applications"
        },
        "Yellow Canary": {
            "itGlueId": "6770954",
            "credentialsId": "22557394",
            "localAdminId": "23394798",
            "useEvoUrl": true
        },
        "ALLURA PARTNERS PTY LTD": {
            "itGlueId": "6068165",
            "credentialsId": "17033381",
            "localAdminId": "30983250",
            "usePowernetUrl": true
        },
        "Remedial Building Services Australia": {
            "itGlueId": "6537798",
            "credentialsId": "19777537",
            "localAdminId": "19787784",
            "msaasId": "339335-msaas-summary",
            "soeId": "3098-applications",
            "usePowernetUrl": true
        },
        "Commercial Kitchen Company": {
            "itGlueId": "1841952",
            "credentialsId": "28016510",
            "localAdminId": "32143883",
            "msaasId": "339335-msaas-summary",
            "soeId": "3098-applications",
            "usePowernetUrl": true
        },
    };

    let previousCompanyName = null;
    let topBar;
    let itGlueButton, credentialsButton, localAdminButton, msaasButton, soeButton;

    function addCustomTopBar() {
        const companyNameElement = document.querySelector('input.GMDB3DUBKVH.GMDB3DUBFWH.cw_company[type="text"]');
        const companyName = companyNameElement ? companyNameElement.value.trim() : null;

        if (!companyName) {
            console.log('Company name not detected, retrying...');
            setTimeout(addCustomTopBar, 1000);
            return;
        }

        if (companyName !== previousCompanyName) {
            previousCompanyName = companyName;

            const companyData = companyLinks[companyName];
            let baseUrl = 'https://virtual-it-services.itglue.com/';
            if (companyData?.useGreenlightUrl) baseUrl = 'https://greenlight-itc.itglue.com/';
            else if (companyData?.usePowernetUrl) baseUrl = 'https://powernet.itglue.com/';
            else if (companyData?.useEvoUrl) baseUrl = 'https://evologic.itglue.com/';

            const itGlueUrl = companyData?.itGlueId ? `${baseUrl}${companyData.itGlueId}` : baseUrl;
            const credentialsUrl = companyData?.credentialsId
                ? `${baseUrl}${companyData.itGlueId}/passwords/${companyData.credentialsId}`
                : baseUrl;
            const localAdminUrl = companyData?.localAdminId
                ? `${baseUrl}${companyData.itGlueId}/passwords/${companyData.localAdminId}`
                : baseUrl;
            const msaasUrl = companyData?.msaasId
                ? `${baseUrl}${companyData.itGlueId}/assets/${companyData.msaasId}`
                : baseUrl;
            const soeUrl = companyData?.soeId
                ? `${baseUrl}${companyData.itGlueId}/assets/${companyData.soeId}`
                : baseUrl;

            if (!topBar) {
                topBar = document.createElement('div');
                topBar.id = 'customTopBar';
                topBar.style = `
                    position: fixed;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    background: rgba(0, 123, 255, 0.75);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                    color: white;
                    width: 193;
                    border-radius: 0 12px 12px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 15px 15px;
                    z-index: 9999;
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    user-select: none;
                `;

                const savedPosition = localStorage.getItem('customTopBarPosition');
                if (savedPosition) {
                    topBar.style.top = `${savedPosition}px`;
                    topBar.style.transform = `translateY(0)`;
                }

                // 🔘 Button container
                const buttonContainer = document.createElement('div');
                buttonContainer.style = `
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;
                    align-items: center;
                `;
                topBar.appendChild(buttonContainer);

                // 🧬 Button factory (with matched rounding)
                function createModernButton(label, color = "#007bff") {
                    const btn = document.createElement('button');
                    btn.innerText = label;
                    btn.style = `
                        background: white;
                        color: ${color};
                        border: none;
                        border-radius: 12px;
                        padding: 8px 16px;
                        width: 160px;
                        text-align: center;
                        font-size: 13px;
                        font-weight: 600;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                        transition: all 0.3s ease-in-out;
                        cursor: pointer;
                    `;
                    btn.onmouseover = () => {
                        btn.style.background = color;
                        btn.style.color = "white";
                    };
                    btn.onmouseout = () => {
                        btn.style.background = "white";
                        btn.style.color = color;
                    };
                    return btn;
                }

                // 🎯 Create buttons
                itGlueButton = createModernButton("IT Glue");
                credentialsButton = createModernButton("365 Credentials");
                localAdminButton = createModernButton("Local Admin");
                msaasButton = createModernButton("MSAAS");
                soeButton = createModernButton("SOE");

                // ➕ Append buttons
                buttonContainer.appendChild(itGlueButton);
                buttonContainer.appendChild(credentialsButton);
                buttonContainer.appendChild(localAdminButton);
                buttonContainer.appendChild(msaasButton);
                buttonContainer.appendChild(soeButton);

                // 🧲 Drag Logic
                let isDragging = false;
                let startY = 0;
                let initialTop = 0;

                function onDragStart(e) {
                    isDragging = true;
                    startY = e.clientY;
                    initialTop = parseInt(topBar.style.top.replace('px', ''));
                    document.addEventListener('mousemove', onDragMove);
                    document.addEventListener('mouseup', onDragEnd);
                    document.body.style.userSelect = 'none';
                }

                function onDragMove(e) {
                    if (!isDragging) return;
                    const deltaY = e.clientY - startY;
                    const newTop = initialTop + deltaY;
                    topBar.style.top = `${newTop}px`;
                    topBar.style.transform = `translateY(0)`;
                }

                function onDragEnd() {
                    isDragging = false;
                    document.body.style.userSelect = '';
                    localStorage.setItem('customTopBarPosition', topBar.style.top.replace('px', ''));
                }

                topBar.addEventListener('mousedown', onDragStart);
                document.addEventListener('mousemove', onDragMove);
                document.addEventListener('mouseup', onDragEnd);

                // 🧩 Final attach
                document.body.appendChild(topBar);
            }

            itGlueButton.onclick = () => window.open(itGlueUrl, '_blank');
            credentialsButton.onclick = () => window.open(credentialsUrl, '_blank');
            localAdminButton.onclick = () => window.open(localAdminUrl, '_blank');
            msaasButton.onclick = () => window.open(msaasUrl, '_blank');
            soeButton.onclick = () => window.open(soeUrl, '_blank');
        }
    }

    setInterval(addCustomTopBar, 1000);
})();
