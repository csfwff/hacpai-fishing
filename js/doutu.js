$(function() {
  addDoutuBtn()
})

var doutuKeyword = ""
var doutuPage = 1

function addDoutuBtn() {

  let btn = $('<button class="green fn__right" id="doutuBtn">斗图</button>')
  $(btn).click(function() {
    showPop(true)
  })
  $(btn).appendTo($('.fn__clear'))
  addDoutuView()
}

function addDoutuView() {
  let popBg = $('<div id="popBg" class="none"/>')
  $(popBg).appendTo($('body'))
  $(popBg).click(function() {
    showPop(false)
  })

  let popView = $('<div id="doutuView"></div>')
  let doutuInputView = $('<div id="doutuInputView"><input id="doutuInput"/><button id="searchBtn" class="green">搜索</button></div>')
  doutuInputView.appendTo(popView)
  $(popView).appendTo($('body'))

  let result = $('<div id="result"></div>')
  result.appendTo(popView)

  let pageView = $('<div id="pageDiv"></div>')
  let preBtn = $('<button id="preBtn" class="green">上一页</button>')
  let numSpan = $('<span id="num">1</span>')
  let nextBtn = $('<button id="nextBtn" class="green">下一页</button>')
  pageView.append(preBtn, numSpan, nextBtn)
  pageView.appendTo(popView)

  $('#searchBtn').click(function() {
    doutuKeyword = $('#doutuInput')[0].value
    doutuPage = 1
    search()
  })
  $('#preBtn').click(function() {
    doutuPage--
    if (doutuPage < 1) {
      doutuPage = 1
      alert("都第1页了还往前翻！！")
      return
    }
    search()
  })
  $('#nextBtn').click(function() {
    doutuPage++
    search()
  })

}

function showPop(type) {
  let animationClass = type
    ? "popShow"
    : "popHide";
  let animation = function() {
    $('#popBg').attr('class', 'popBg ' + animationClass);
    $('#doutuView').attr('class', 'doutuView ' + animationClass);
  }
  setTimeout(animation, 100);
}

function search() {
  if (doutuKeyword.length == 0) {
    alert("你不给关键词我怎么搜？？？")
    return
  }
  $.ajax({
    url: 'https://www.doutula.com/api/search?keyword=' + doutuKeyword + '&mime=0&page=' + doutuPage,
    dataType: 'json',
    success: function(data) {
      $('#result').empty()
      if (data.status == 1) {
        if(data.data.list.length==0){
          let noImg = $("<div>找不到了啊</div>")
          noImg.appendTo($('#result'))
        }else {
          data.data.list.forEach((e) => {
            let imgString = '<div class="doutuItem"><img src=' + e.image_url + ' referrerpolicy="no-referrer" class="doutuImg" /></div>'
            let item = $(imgString)
            item.click(function() {
              addToArea("![" + doutuKeyword + "](" + e.image_url + ")")
              showPop(false)
            })
            item.appendTo($('#result'))
          })
        }
      } else {
        alert("我能怎么办，我也找不到啊！！")
      }
      $('#num')[0].innerHTML = doutuPage
    }
  })
}

function addToArea(content) {
  let area = $(".vditor-textarea")[0]
  area.value = area.value + content
}
