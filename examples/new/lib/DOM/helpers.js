function Collapse(elem, cmd){
  switch (cmd){
    case 'show':
      $(elem).addClass('custom-show');
      break;
    case 'hide':
      $(elem).removeClass('custom-show');
      break;
    default:
      $(elem).toggleClass('custom-show');
      break;
  }
}

function notify(msg, id, duration = 200){
  if ($('#'+id).length == 0) {
    var notification = document.createElement('span');
    notification.innerHTML = '<b><i class="material-icons">info</i> ' + msg + '</b>';
    notification.id = id;
    notification.classList.add("notification");

    $('body').append(notification);
  }
  $('#'+id).fadeIn(500).delay(duration).fadeOut(500);
}

function setScrollBtn(btn){
  $(document).ready(function($){
    $(function(){
      $(window).scroll(function(){
        if ($(this).scrollTop() > 100){
          $(btn).fadeIn();
        } else {
          $(btn).fadeOut();
        }
      })

      $(btn).click(function(){
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      })
    })
  })

  function topFunction() {
    $('body').animate({scrollTop: 0});
    $(':root').animate({scrollTop: 0});
  }

  $(btn).on("click",topFunction);
}

function setCacheShortcut(){
  var ctrlcmd = false, 
    E = false,
    keyMaps = {
      ctrlcmd: [17, 91, 93, 224],
      E: 69
    };

  function checkCtrlCmdPress(e){
    if (!ctrlcmd){
      if (keyMaps.ctrlcmd.includes(e.which)){
        ctrlcmd = true;
        $(document).off('keydown');
        $(document).on('keydown', checkEPress);
      }
    }
  }

  function checkEPress(e){
    if (ctrlcmd && !E){
      if (e.which == keyMaps.E){
        $('#clear-cache').click();
      }
    }
  }

  $(document).on('keydown', checkCtrlCmdPress);
  $(document).on('keyup', function(e){
    if (keyMaps.ctrlcmd.includes(e.which) || e.which == keyMaps.E){
      ctrlcmd = false;
      E = false;
      $(document).off('keydown');
      $(document).on('keydown', checkCtrlCmdPress);
    }
  })
}

module.exports = {
  Collapse,
  notify,
  setScrollBtn,
  setCacheShortcut
}