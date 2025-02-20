# GoodWrite - Chrome Extension for Text Enhancement

GoodWrite is a Chrome extension that helps you improve your writing by providing real-time grammar and typo corrections while maintaining the original tone of your text. Using the Llama 2 language model, it offers contextual suggestions right where you need them.

## Features

- 🎯 Context menu integration for easy access
- ✍️ Grammar and typo correction
- 🎨 Preserves the original tone and style of your writing
- 🚀 Real-time text processing
- 💻 Works with any text input field on websites

## Prerequisites

Before installing GoodWrite, ensure you have:

1. Ollama installed locally with the Llama 2 model
2. Chrome browser (version 88 or higher)

## Installation

### Local Development Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/GoodWrite.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the GoodWrite directory

### Using the Extension

1. Right-click on any text field while browsing
2. Select "Rewrite" from the context menu
3. Wait for the enhanced text to appear in your text field

## Technical Details

GoodWrite uses:
- Chrome Extensions Manifest V3
- Local Ollama API integration
- Content Scripts for webpage interaction
- Background Service Worker for API communication

## Configuration

The extension connects to Ollama running on `localhost:11434`. If you need to modify this:

1. Update the host permissions in `manifest.json`
2. Modify the API endpoint in `background.js`

## Installation 

1. Load the extension in Chrome
2. Navigate to any website with a text input field
3. Right-click on the field and select "Rewrite"
4. Verify that the text is properly enhanced

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and feature requests, please create an issue in the GitHub repository.

---

**Note**: This extension requires a local Ollama installation with the Llama 2 model. Make sure it's properly set up and running before using the extension.
