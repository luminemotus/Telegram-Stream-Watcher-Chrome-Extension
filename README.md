
# Telegram Stream Watcher

**Telegram Stream Watcher** is a Chrome extension designed to monitor activities on Telegram Web, detect new messages, and send the data to a configured endpoint.

---

## Technologies Used

1. **Manifest V3**:
   - Used to structure the extension with more secure permissions and Service Workers.
2. **JavaScript**:
   - Main development language.
3. **Fetch API**:
   - To perform HTTP POST requests and send data to a remote endpoint.
4. **Chrome Extensions APIs**:
   - Usage of `chrome.runtime`, `chrome.storage`, and `chrome.tabs`.
5. **MutationObserver**:
   - Detects DOM changes to identify new messages.
6. **HTML/CSS**:
   - For designing the popup and configuring the extension.

---

## Legal Risks

Before using this extension, please consider the following legal risks:

1. **Violation of Terms of Service**:
   - Telegram Web does not allow scraping or automated interactions without its authorization.
   - Using this extension might violate their terms and conditions.

2. **Data Privacy**:
   - Monitoring and sending messages may be considered a privacy violation if done without consent.

3. **User Responsibility**:
   - The user is solely responsible for how this tool is used. The developer assumes no liability for misuse.

We recommend using this extension only for educational purposes or with explicit consent from affected parties.

---

## Installation Guide

### **Prerequisites**

- **Google Chrome** installed on your system.
- Enable developer mode in Chrome.
- Internet connection to send data to the endpoint.

### **Steps to Install**

1. Download the repository files:
   - Clone the repository:
     ```bash
     git clone https://github.com/your-repository/telegram-stream-watcher.git
     ```
   - Or download the `.zip` file and extract it.

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" in the top-right corner.

4. Click on **"Load unpacked"**.

5. Select the folder containing the downloaded files (`manifest.json`, `content.js`, etc.).

6. The extension will appear in the list of active extensions.

### **Configuration**

1. Click on the extension icon in the toolbar.
2. Enter the **Chat ID** and the **endpoint** where you want to send the data.
3. Click **Save** to store the configuration.

---

## Key Features

1. **Real-time Monitoring**:
   - Detects changes in Telegram Web messages using `MutationObserver`.

2. **Target Configuration**:
   - Set the chat ID and endpoint via an easy-to-use popup.

3. **Data Sending**:
   - New messages are automatically sent to the configured endpoint via Fetch API.

---

## Common Issues and Solutions

1. **CORS Restrictions**:
   - If the server does not allow CORS requests, the extension might not function properly.
   - Solution: Configure the server or use `background.js` for the requests.

2. **Changes in Telegram DOM Structure**:
   - If Telegram updates its interface, the selectors used in the code might stop working.
   - Solution: Update the selector in the source code.

3. **Insufficient Permissions**:
   - If you don't see messages logged, ensure that `tabs` and `activeTab` permissions are enabled in `manifest.json`.

---

## Contributions

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Make your changes and submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE). 

---

If you need further assistance, feel free to open an issue in the repository or contact me. 😊
