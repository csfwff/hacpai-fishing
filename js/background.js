chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery == "getImg") {
      var url = "https://tools.stackoverflow.wiki/doutu.do?keyword=" +
        encodeURIComponent(request.doutuKeyword) + "&page=" + request.doutuPage;
      fetch(url)
        .then(response => response.text())
        .then(data => sendResponse(data))
        .catch(error => console.log(error))
      return true;  // Will respond asynchronously.
    }
  });
