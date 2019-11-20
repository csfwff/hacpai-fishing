chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery == "getImg") {
      // var url = "https://tools.stackoverflow.wiki/doutu.do?keyword=" +
      //   encodeURIComponent(request.doutuKeyword) + "&page=" + request.doutuPage;
      var url = "https://www.sszsj.top/doutu/search?keyword=" +
        encodeURIComponent(request.doutuKeyword) + "&page=" + request.doutuPage;
      // var url = "https://sszsj.cc:449/pics/json.jsp?query=" +
      // encodeURIComponent(request.doutuKeyword + " 表情") + "&st=5&start=" + request.doutuPage * 20 + "&xml_len=20"
      fetch(url)
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => console.log(error))
      return true;  // Will respond asynchronously.
    }
  });
