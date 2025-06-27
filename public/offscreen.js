const _URL = "https://video-sync-10531.web.app/signInWithPopup.html";
const iframe = document.createElement("iframe");
iframe.src = _URL;
document.documentElement.appendChild(iframe);
chrome.runtime.onMessage.addListener(handleChromeMessages);

function handleChromeMessages(message, _sender, sendResponse) {
  console.log(`${message} ${sendResponse}`);
  if (message.target !== "offscreen" || message.type !== "firebase-auth") {
    return false;
  }

  function handleIframeMessage({ data }) {
    try {
      if (data.startsWith("!_{")) {
        return;
      }
      data = JSON.parse(data);
      console.log("Hi", data);
      self.removeEventListener("message", handleIframeMessage);

      sendResponse(data); // send response to caller
    } catch (e) {
      console.log(`json parse failed - ${e.message}`);
    }
  }

  globalThis.addEventListener("message", handleIframeMessage, false); // when iframe postMessage is done, handle it here
  iframe.contentWindow.postMessage({ initAuth: true }, new URL(_URL).origin); // iframe signal start auth
  return true;
}

