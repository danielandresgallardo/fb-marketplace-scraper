# Facebook Marketplace Scraper (Manual Chrome Extension)

This is a simple Chrome extension that allows you to **manually scrape visible listings** from Facebook Marketplace and save them to a `.json` file for analysis. It only scrapes listings currently displayed on the page — so you can scroll to load more results before clicking the scrape button.

---

## 🔧 Features

- ✅ Scrapes visible Facebook Marketplace listings (price, title, link)
- ✅ Avoids duplicate entries
- ✅ Works with NT$ or $ currency listings
- ✅ Outputs clean, structured JSON data
- ✅ Safe and manual — no automated browsing or server requests

---

## 📁 Files

| File | Description |
|------|-------------|
| `manifest.json` | Chrome extension manifest (v3) that defines permissions and settings |
| `popup.html` | Simple popup UI with a button to trigger the scraper |
| `popup.js` | Main logic: extracts data from the page and downloads it as JSON |
| *(Optional)* `icon.png` | Extension icon if included in the manifest (not required) |

---

## 🚀 How to Use

1. **Clone or download** this folder to your computer.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer Mode** (top right).
4. Click **"Load unpacked"** and select the folder containing this extension.
5. Go to [Facebook Marketplace](https://www.facebook.com/marketplace/), and perform a search.
6. **Scroll down to load more results** (optional).
7. Click the extension icon and press **“Scrape Listings”**.
8.	A JSON file containing the scraped listings will be automatically downloaded.
The filename includes a timestamp in ISO format, for example:
marketplace_data_2025-06-25T07-11-01-350Z.json
This ensures each scrape is saved uniquely and chronologically.

---

## 🧠 How It Works

- The extension waits for you to click the **“Scrape Listings”** button in the popup.
- It then injects a JavaScript function into the current Facebook Marketplace page.
- The script searches for anchor (`<a>`) elements that link to individual listings.
- It extracts:
  - `title`: the first line that’s not a price
  - `price`: the first line that looks like `NT$####` or `$####`
  - `link`: the full URL to the listing
- The results are collected into an array and downloaded as a `.json` file.

---

## ⚠️ Limitations

- It only scrapes **currently visible items** — you must manually scroll to load more.
- Facebook’s layout may change over time; class names and structure might need updating.
- This extension is for **personal or educational use only**. Scraping Facebook may violate their [Terms of Service](https://www.facebook.com/terms.php).

---

## 🛠️ Ideas for Improvements

- Export to CSV format
- Include thumbnail image URLs
- Auto-scroll to load more listings
- Clean listing URLs (remove tracking parameters)

---

## 📄 License

This project is open-source and provided **as-is for educational purposes only**.