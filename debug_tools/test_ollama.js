const fetch = require('node-fetch');

async function testOllama() {
    const url = "http://localhost:11434/api/generate";
    
    // Test data matching your background.js
    const payload = {
        model: "llama2",
        prompt: "correct this for grammar and typos, maintain the same tone in the resulting text this is a test sentence with typos",
        stream: false
    };
    
    console.log("Sending request with payload:");
    console.log(JSON.stringify(payload, null, 2));
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log(`\nResponse Status Code: ${response.status}`);
        console.log("Response Headers:");
        console.log(JSON.stringify(Object.fromEntries([...response.headers]), null, 2));
        
        if (response.status === 200) {
            const text = await response.text();
            console.log("\nResponse Content:");
            console.log(text);
            
            // Try to parse the response
            try {
                const jsonResponse = JSON.parse(text);
                console.log("\nParsed JSON Response:");
                console.log(JSON.stringify(jsonResponse, null, 2));
            } catch (e) {
                console.log("\nCould not parse response as JSON:", e.message);
                console.log("Raw response content:");
                console.log(text);
            }
        } else {
            console.log(`Error: Received status code ${response.status}`);
            const text = await response.text();
            console.log(text);
        }
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log("Connection Error: Could not connect to Ollama server. Is it running?");
        } else {
            console.log("Unexpected error:", error);
        }
    }
}

console.log("Testing Ollama API...");
testOllama();
