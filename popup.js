document.getElementById("scrapeBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scrapeMarketplaceListings
  });
});

function scrapeMarketplaceListings() {
  const listings = [];
  const seen = new Set();

  const items = Array.from(document.querySelectorAll('a[href*="/marketplace/item"]'));

  items.forEach((item) => {
    const link = item.href;
    if (seen.has(link)) return;
    seen.add(link);

    const lines = item.innerText.split("\n").map(l => l.trim()).filter(Boolean);

    let price = "N/A";
    let title = "No title";
    let location = "Unknown";

    let foundPrice = false;
    let foundTitle = false;

    for (const line of lines) {
      if (/^(NT\$|\$)?[\d,]+$/.test(line) || /^Free$/i.test(line)) {
        if (!foundPrice) {
          price = line;
          foundPrice = true;
        }
      } else if (!foundTitle) {
        title = line;
        foundTitle = true;
      }
    }

    // Try to get location from nearby image alt text (if present)
    const img = item.querySelector('img[alt*=" in "]');
    if (img) {
      const alt = img.alt;
      const match = alt.match(/ in (.+)$/);
      if (match && match[1]) {
        location = match[1].trim();
      }
    }

    listings.push({ title, price, location, link });
  });

  if (listings.length === 0) {
    alert("No listings found. Try scrolling down to load more.");
    return;
  }

  const now = new Date();
  const timestamp = now.toLocaleString('sv-SE', { hour12: false }).replace(/[: ]/g, '-');
  const filename = `marketplace_${timestamp}.json`;

  const blob = new Blob([JSON.stringify(listings, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}