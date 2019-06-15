chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request.contentScriptQuery == "getImg") {
      var url = "https://www.doutula.com/api/search?keyword=" +
              encodeURIComponent(request.doutuKeyword)+"&mime=0&page="+request.doutuPage;
      fetch(url)
          .then(response => response.text())
          .then(data => sendResponse(data))
          .catch(error => console.log(error))
      return true;  // Will respond asynchronously.
    }
  });
