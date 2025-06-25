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

    for (const line of lines) {
      if (/^(NT\$|\$)[\d,]+/.test(line)) {
        if (price === "N/A") price = line;
      } else {
        if (title === "No title") title = line;
      }
      if (price !== "N/A" && title !== "No title") break;
    }

    listings.push({ title, price, link });
  });

  if (listings.length === 0) {
    alert("No listings found. Try scrolling down to load more.");
    return;
  }

  const blob = new Blob([JSON.stringify(listings, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "marketplace_data.json";
  a.click();
  URL.revokeObjectURL(url);
}