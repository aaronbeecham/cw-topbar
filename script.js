// ==UserScript==
// @name         Top Bar Optimized
// @namespace    http://tampermonkey.net/
// @version      2.5
// @match        https://aus.myconnectwise.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const companyLinks = {
        // ... (your companyLinks object remains the same)
    };

    let currentCompanyName = null;

    function addCustomTopBar(companyName) {
        const companyData = companyLinks[companyName];
        const defaultUrl = 'https://virtual-it-services.itglue.com/';
        const itGlueUrl = companyData ? `https://virtual-it-services.itglue.com/${companyData.itGlueId}` : defaultUrl;
        const credentialsUrl = companyData ? `https://virtual-it-services.itglue.com/${companyData.itGlueId}/passwords/${companyData.credentialsId}` : defaultUrl;

        let topBar = document.getElementById('customTopBar');
        if (!topBar) {
            topBar = document.createElement('div');
            topBar.id = 'customTopBar';
            // ... (style your top bar)

            const itGlueButton = document.createElement('button');
            itGlueButton.id = 'itGlueButton';
            // ... (style your button)
            itGlueButton.innerText = 'IT Glue Link';
            topBar.appendChild(itGlueButton);

            const credentialsButton = document.createElement('button');
            credentialsButton.id = 'credentialsButton';
            // ... (style your button)
            credentialsButton.innerText = '365 Credentials';
            topBar.appendChild(credentialsButton);

            document.body.insertBefore(topBar, document.body.firstChild);
            document.body.style.paddingTop = '44px';
        }

        // Update button actions
        document.getElementById('itGlueButton').onclick = () => window.open(itGlueUrl, '_blank');
        document.getElementById('credentialsButton').onclick = () => window.open(credentialsUrl, '_blank');
    }

    function init() {
        const companyInputSelector = 'input.GL4OBY5BAVH.GL4OBY5BLVH.cw_company[type="text"]';
        let companyInput = document.querySelector(companyInputSelector);

        if (!companyInput) {
            // Wait until the company input field is available
            const observer = new MutationObserver(() => {
                companyInput = document.querySelector(companyInputSelector);
                if (companyInput) {
                    observer.disconnect();
                    observeCompanyName(companyInput);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            observeCompanyName(companyInput);
        }
    }

    function observeCompanyName(companyInput) {
        currentCompanyName = companyInput.value.trim();
        addCustomTopBar(currentCompanyName);

        const inputObserver = new MutationObserver(() => {
            const newCompanyName = companyInput.value.trim();
            if (newCompanyName !== currentCompanyName) {
                currentCompanyName = newCompanyName;
                addCustomTopBar(currentCompanyName);
            }
        });

        inputObserver.observe(companyInput, { attributes: true, attributeFilter: ['value'] });
    }

    window.addEventListener('load', init);
})();
