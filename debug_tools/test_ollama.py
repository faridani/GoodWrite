import requests
import json

def test_ollama():
    url = "http://localhost:11434/api/generate"
    
    # Test data
    payload = {
        "model": "llama2",
        "prompt": "correct this for grammar and typos, maintain the same tone in the resulting text:this is a test sentense with some typos and grammer mistakes",
        "stream": False
    }
    
    print("Sending request with payload:")
    print(json.dumps(payload, indent=2))
    
    try:
        response = requests.post(url, json=payload)
        print(f"\nResponse Status Code: {response.status_code}")
        print("Response Headers:")
        print(json.dumps(dict(response.headers), indent=2))
        
        if response.status_code == 200:
            print("\nResponse Content:")
            print(response.text)
            
            # Try to parse the response
            try:
                json_response = response.json()
                print("\nParsed JSON Response:")
                print(json.dumps(json_response, indent=2))
                print("+"*20)
                print("So in conclusion:")
                print(json_response["response"])
            except json.JSONDecodeError as e:
                print(f"\nCould not parse response as JSON: {e}")
                print("Raw response content:")
                print(response.text)
        else:
            print(f"Error: Received status code {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("Connection Error: Could not connect to Ollama server. Is it running?")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    print("Testing Ollama API...")
    test_ollama()
