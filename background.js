chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getActiveTab") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                sendResponse({ tab: tabs[0] });
            } else {
                sendResponse({ tab: null });
            }
        });
        return true; // Necesario para usar sendResponse de manera asíncrona
    }
});
