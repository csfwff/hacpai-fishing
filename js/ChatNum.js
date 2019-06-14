$(function() {
  var countNum = function(){
      let a = $('#chatRoomOnlineCnt').children().length;
      let date = getNowFormatDate()
      if($('#numView').length==0){
        let numView = $('<div id="numView">'+date+'的时候共有'+a+'人在线')
        $(numView).appendTo($('.chats__input'))
      }else {
        $('#numView').html(date+'的时候共有'+a+'人在线')
      }

  }

//  countNum()
  setInterval(()=>{
    countNum()
  },1000)

  setATitle()

})


function setATitle(){
  let a = $('.title.fn__ellipsis')
  a.each(i=>{
    a[i].title = a[i].innerHTML
  })
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
