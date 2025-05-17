// Store the element where the right-click occurred
let lastActiveEl = null;
document.addEventListener("contextmenu", function(e) {
  if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) {
    lastActiveEl = e.target;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "rewrite") {
    // Use the stored element or fallback to document.activeElement if needed.
    let activeEl = lastActiveEl || document.activeElement;

    // Create the overlay element
    const overlay = document.createElement("div");
    overlay.id = "rewrite-overlay";
    Object.assign(overlay.style, {
      position: "fixed",
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      padding: "10px",
      zIndex: "10000",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      color: "black" // Text color set to black
    });

    // Build the overlay content using the selected text
    overlay.innerHTML = `
      <div style="margin-bottom: 10px;">
        <strong>Corrected Text:</strong> ${request.selectedText}
      </div>
      <button id="ignore-btn" style="margin-right: 5px;">Ignore</button>
      <button id="update-btn">Update</button>
    `;

    document.body.appendChild(overlay);

    // "Ignore" button just closes the overlay.
    document.getElementById("ignore-btn").addEventListener("click", () => {
      overlay.remove();
    });

    document.getElementById("update-btn").addEventListener("click", () => {
      const textToCorrect = request.selectedText;
      console.log(`Selected text: ${textToCorrect}`);
      console.log(`Request processing worked!`);

      chrome.runtime.sendMessage({ action: "callOllama", text: textToCorrect }, (response) => {
        console.log("we are inside callOlamma");
        console.log(`Response: ${JSON.stringify(response, null, 2)}`);
        if (response && response.correctedText) {
          if (activeEl) {
            if ('value' in activeEl) {
              activeEl.value = response.correctedText;
            } else if (activeEl.isContentEditable) {
              activeEl.textContent = response.correctedText;
            }
          } else {
            navigator.clipboard.writeText(response.correctedText)
              .then(() => {
                console.log("Corrected text copied to clipboard!");
              })
              .catch(err => {
                console.error("Failed to copy text: ", err);
              });
          }
          overlay.remove();
        } else {
          console.error("Error received:", response.error);
          overlay.remove();
        }
      });
    });
  }
});
