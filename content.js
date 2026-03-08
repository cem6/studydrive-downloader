// content.js 

browser.runtime.onMessage.addListener(async (message) => {
    if (message.action === "fetch") {
        const response = await fetch(window.location.href, {
                method: 'GET',
                credentials: 'omit', // cookies entfernen -> nicht logged in
                headers: {
                    // extra sachen für request
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
        const html = await response.text();

        return Promise.resolve({html, url: window.location.href});
    }
});

// TODO: alert message