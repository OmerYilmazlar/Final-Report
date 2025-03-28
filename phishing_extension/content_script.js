console.log("Content script successfully loaded on:", window.location.href);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "getDOMFeatures") {
    const domFeatures = {
      insecureForms: document.querySelector("form[action^='http:']") ? 1 : 0,
      iframeOrFrame: document.querySelector("iframe, frame") ? 1 : 0,
      missingTitle: document.title.trim().length === 0 ? 1 : 0,
    };

    console.log("Sending DOM features:", domFeatures);
    sendResponse(domFeatures);
  }
});
