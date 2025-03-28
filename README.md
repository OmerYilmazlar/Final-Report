# 🛡️ Phishing and Spam Detection Browser Extension

A real-time browser extension that detects phishing websites and spam emails using machine learning and VirusTotal API integration. Built with modular architecture and a focus on user-friendly feedback, the extension enhances browser security without requiring technical expertise.

## 🔧 Features

- AI-based phishing detection using a trained Random Forest model
- Gmail email spam analysis through word frequency modeling
- Real-time VirusTotal scan for additional URL reputation analysis
- Color-coded and percentage-based visual feedback in the popup
- Lightweight, client-side execution with no data storage

## 🚀 Getting Started

1. Clone or download the repository to your computer.

2. Open Google Chrome and navigate to:


3. Enable **Developer mode** (top right), then click **Load unpacked** and select the "phishing_extension" folder.

4. Open the extension from the toolbar and:
- Click **Settings** to add your VirusTotal API key.
- Use **AI Analysis** to scan the active tab’s URL.
- Use **Scan Email** on an open Gmail message to evaluate for spam.

## 📦 Project Structure

- `popup.js` – Main logic for triggering scans and displaying results
- `background.js` – Handles VirusTotal API requests
- `content_script.js` & `email_content_script.js` – Extract webpage and email content
- `feature_extraction.js` – Prepares features for the ML models
- `phishing_model.js` & `email_model.js` – Exported JavaScript versions of the trained models
- `manifest.json` – Chrome extension configuration

## ✅ Requirements

- Google Chrome browser (latest)
- A VirusTotal API key (free to obtain from [virustotal.com](https://www.virustotal.com/))

## 📌 Notes

- No user data is stored or sent to third-party servers (except to VirusTotal via your own API key).
- Designed for educational use as part of a final-year Computer Science project.

## 👤 Author

**Ömer Faruk Yılmazlar**  
Goldsmiths, University of London  
