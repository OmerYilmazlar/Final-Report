// background.js (VirusTotal v3 version)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "scanWithVirusTotal") {
    chrome.storage.sync.get("vtApiKey", ({ vtApiKey }) => {
      if (!vtApiKey) {
        sendResponse({ error: "No API key set." });
        return;
      }

      // 1. POST the URL to VirusTotal v3
      fetch("https://www.virustotal.com/api/v3/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-apikey": vtApiKey,
        },
        body: "url=" + encodeURIComponent(message.url),
      })
        .then((submitResponse) => submitResponse.json())
        .then((submitData) => {
          // Check if submission was successful
          if (!submitData.data || !submitData.data.id) {
            sendResponse({ error: "Failed to submit URL to VirusTotal." });
            return null; // Stop the chain
          }

          // 2. Retrieve the analysis by ID
          const analysisId = submitData.data.id;
          return fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
            headers: { "x-apikey": vtApiKey },
          });
        })
        .then((analysisResponse) => {
          if (!analysisResponse) return; // If something went wrong above
          return analysisResponse.json();
        })
        .then((analysisData) => {
          if (!analysisData || !analysisData.data || !analysisData.data.attributes) {
            sendResponse({ error: "No analysis data returned from VirusTotal." });
            return;
          }

          // 3. Extract the relevant stats from v3
          const stats =
            analysisData.data.attributes.last_analysis_stats ||
            analysisData.data.attributes.stats;

          if (!stats) {
            sendResponse({ error: "No stats found in analysis data." });
            return;
          }

          // For example:
          const malicious = stats.malicious || 0;
          const suspicious = stats.suspicious || 0;
          const undetected = stats.undetected || 0;
          // (Some reports also have "harmless", "timeout", etc. — you can add if needed.)

          // Calculate a total by summing all known categories in stats
          let total = 0;
          for (const key in stats) {
            total += stats[key];
          }

          // 4. Send them back to popup.js with matching variable names
          sendResponse({
            malicious: malicious,
            suspicious: suspicious,
            undetected: undetected,
            total: total,
          });
        })
        .catch((error) => {
          console.error("VirusTotal v3 API Error:", error);
          sendResponse({ error: "Error connecting to VirusTotal API." });
        });
    });

    // Return true to allow asynchronous sendResponse
    return true;
  }
});
