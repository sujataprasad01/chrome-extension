📝 AI Summariser (Chrome Extension)

AI Summariser is a simple Chrome extension that extracts article content from the current tab and generates a summary using Google Gemini API.
You can choose between a Brief, Detailed, or Bullet Point summary, and quickly copy the result.

🚀 Features

🔍 Extracts article text from the active webpage.

🤖 Summarizes content using Gemini 2.0 Flash model.

📑 Three summary modes:

Brief → 2-3 sentences

Detailed → A longer explanation

Bullets → 5–7 bullet points

📋 Copy-to-clipboard button with feedback.

🖼 Clean, responsive popup UI.

📂 Project Structure
ai-summariser-extension/
│── manifest.json        # Chrome extension manifest (v3)
│── popup.html           # Extension popup UI
│── popup.js             # Popup logic & API integration
│── content.js           # Extracts article text from web pages
│── background.js        # Service worker (optional for handling events)
│── options.html         # Settings page to save Gemini API key
│── options.js           # Logic for storing/retrieving API key
│── icon.png             # Extension icon

⚙️ Installation

Clone or download this repository.

Open Chrome and go to chrome://extensions/.

Enable Developer mode (toggle in top-right).

Click Load unpacked and select the project folder.

The extension should now appear in your extensions list.

🔑 Setting Up Gemini API Key

Go to Google AI Studio
.

Generate a new API key.

Open the extension popup → Click the ⚙️ (options/settings).

Paste your API key and click Save Settings.

▶️ Usage

Open any article or blog post in your browser.

Click the AI Summariser extension icon in the toolbar.

Choose summary type (Brief, Detailed, or Bullets).

Click Summarize.

Copy the summary using the Copy button.

🛠 Tech Stack

Manifest V3 (Chrome Extensions API)

HTML, CSS, JavaScript

Google Gemini API (Generative Language API)

⚠️ Notes

Make sure your API key is valid and has quota.

The extension only extracts text from <article> or <p> tags — results may vary depending on the website.
