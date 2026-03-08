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

browser.action.onClicked.addListener((tab) => {
    if (!tab.url || !tab.url.includes("studydrive.net")) {
        console.error("nicht auf studydrive.net");
        return;
    }

    browser.tabs.sendMessage(tab.id, {action: "fetch"})
        .then((response) => {
            // console.log(response.html);
            const downloadUrl = getDownloadUrl(response.html, response.url);
            if (downloadUrl.startsWith("/not_found")) {
                console.error(downloadUrl);
                return;
            }
            browser.tabs.create({ url: downloadUrl });
        })
});
