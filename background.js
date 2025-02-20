chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "rewrite",
      title: "Rewrite",
      contexts: ["selection", "editable"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "rewrite") {
      chrome.tabs.sendMessage(tab.id, {
        action: "rewrite",
        selectedText: info.selectionText
      });
    }
  });
  

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "callOllama") {
      console.log("inside the caller");
      console.log("Request text:", request.text);

      const requestBody = {
        model: "llama2",
        prompt: `correct this for grammar and typos, maintain the same tone in the resulting text ${request.text}`,
        stream: false
      };

      //console.log("Request body:", JSON.stringify(requestBody, null, 2));
      console.log("Request body:", requestBody);

      fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        json: requestBody
      })
        .then(response => {
          console.log("Raw response status:", response.status);
          console.log("Response headers:", JSON.stringify(Object.fromEntries([...response.headers]), null, 2));
          return response.text();
        })
        .then(text => {
          console.log("Raw API response:", text);
          
          if (!text.trim()) {
            throw new Error("Empty response from API");
          }
          
          // Split the response by newlines in case we get multiple JSON objects
          const jsonResponses = text.split('\n').filter(line => line.trim());
          
          if (jsonResponses.length === 0) {
            throw new Error("No JSON responses found in API response");
          }
          
          // Get the last response (which should be the final result)
          const lastResponse = jsonResponses[jsonResponses.length - 1];
          
          try {
            const data = JSON.parse(lastResponse);
            console.log("Parsed data:", data);
            sendResponse({ correctedText: data.response });
          } catch (e) {
            console.error("JSON parse error:", e);
            sendResponse({ 
              error: `JSON parse error: ${e.message}\nRaw text: ${text}\nRequest body: ${JSON.stringify(requestBody)}` 
            });
          }
        })
        .catch(error => {
          console.error("Error calling Ollama API:", error);
          sendResponse({ 
            error: `API Error: ${error.toString()}\nRequest body: ${JSON.stringify(requestBody)}` 
          });
        });
      return true; // Indicates asynchronous response
    }
  });