var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    sendMessage('您好, 我是医疗机器人提莫. 有什么可以帮到您吗?');
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  // 读取user msg
  {
    msg = $('.message-input').val();
    // console.log(msg)
    if ($.trim(msg) == '') {
      return false;
    }
  }



  // 将User msg 发送给服务器
  {
    let user_query = {
    'content': msg
    }
    const request = new XMLHttpRequest()
    request.open('POST', `processUserQuery/${JSON.stringify(user_query)}`)
    // 接受服务器的response
    request.onload = () => {
      const flaskMsg = request.responseText
      console.log(flaskMsg)

      // 发送系统回复
      {
        setTimeout(function() {
        sendMessage(flaskMsg);
        }, 1000 + (Math.random() * 20) * 100);
      }
    }

    request.send()
  }


  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();




}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})


function sendMessage(msg) {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="static/images/teemo.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="static/images/teemo.png" /></figure>' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);

}