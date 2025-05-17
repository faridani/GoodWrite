# For Developers

This document provides a quick overview of the repository for new contributors. GoodWrite is a small Chrome extension that connects to a local Llama 2/Ollama API to rewrite selected text. The main files and folders are:

```
LICENSE
README.md
manifest.json          -- Chrome extension manifest (V3)
background.js          -- background service worker
content.js             -- content script injected into pages
icons/                 -- extension icons (16x16..128x128)
debug_tools/           -- local scripts for testing the API
```

## Purpose and Features
The extension offers real‑time grammar and typo correction while preserving the tone of the original text. It integrates directly into the browser’s context menu and requires a local Ollama server running on `localhost:11434`.

## Core Components
1. **manifest.json** – Declares extension permissions and references the scripts.
2. **background.js** – Creates the context‑menu entry and sends requests to the local API.
3. **content.js** – Displays an overlay with the selected text and updates the clipboard when results arrive.
4. **debug_tools/** – Node.js and Python scripts that help verify the API works as expected.

## Points to Know
- Ensure Ollama is running locally before using the extension.
- Manifest V3 uses a background service worker; `sendResponse` must be called asynchronously when making API requests.
- The typical flow is: right‑click → "Rewrite" → overlay → update text.

## Learning Next
If you plan to extend the project, consider exploring:
- Chrome extension APIs for context menus, messaging, and service workers.
- Enhancing the API call logic in `background.js` to improve error handling.
- Improving the overlay’s appearance with additional HTML/CSS.
- Setting up automated tests or additional debug scripts.

GoodWrite is intentionally minimal, making it a useful starting point for experimenting with browser integrations and local AI models.
