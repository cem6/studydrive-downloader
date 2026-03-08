// background.js

const allowedExtensions = ["pdf", "docx", "jpeg", "jpg", "png"];

const getDownloadUrl = (html, url) => {
    const tokenMatch = html.match(/token=(.*?)"/);
    if (!tokenMatch) return "/not_found: token";
    const token = tokenMatch[1];

    const urlObj = new URL(url);
    const docId = urlObj.pathname.split("/").pop();

    const filenameMatch = html.match(/"filename":"(.*?)"/);
    if (!filenameMatch) return "/not_found: filename";
    const filename = filenameMatch[1].toLowerCase();

    let extension = allowedExtensions.find(ext => filename.includes(ext));
    if (!extension) return "/not_found: extension";

    return `https://cdn.studydrive.net/d/prod/documents/${docId}/original/${docId}.${extension}?token=${token}`;
}

const t_getDownloadUrl = async (url) => {
	const response = await fetch(url, {
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
    if (!response.ok) return "/not_found";
    const html = await response.text();

    const tokenMatch = html.match(/token=(.*?)"/);
    if (!tokenMatch) return "/not_found: token";
    const token = tokenMatch[1];

    const urlObj = new URL(url);
    const docId = urlObj.pathname.split("/").pop();

    const filenameMatch = html.match(/"filename":"(.*?)"/);
    if (!filenameMatch) return "/not_found: filename";
    const filename = filenameMatch[1].toLowerCase();

    let extension = allowedExtensions.find(ext => filename.includes(ext));
    if (!extension) return "/not_found: extension";

    return `https://cdn.studydrive.net/d/prod/documents/${docId}/original/${docId}.${extension}?token=${token}`;
}

// browser.action.onClicked.addListener((tab) => {
chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.url || !tab.url.includes("studydrive.net")) {
        console.error("nicht auf studydrive.net");
        return;
    }

    // // browser.tabs.sendMessage(tab.id, {action: "fetch"})
    // chrome.tabs.sendMessage(tab.id, {action: "fetch"})
    //     .then((response) => {
    //         // console.log(response.html);
    //         const downloadUrl = getDownloadUrl(response.html, response.url);
    //         if (downloadUrl.startsWith("/not_found")) {
    //             console.error(downloadUrl);
    //             return;
    //         }
    //         // browser.tabs.create({ url: downloadUrl });
    //         chrome.tabs.create({ url: downloadUrl });
    //     })

	const downloadUrl = await t_getDownloadUrl(tab.url);
	if (!downloadUrl || downloadUrl.startsWith("/not_found")) {
		console.error(downloadUrl)
		return
	}
	chrome.tabs.create({ url: downloadUrl })
});
