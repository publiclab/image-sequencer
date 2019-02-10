function notify(msg, id, notificationClasses, duration, icon){
  if ($('#'+id).length == 0) {
    var notification = document.createElement('span');
    notification.innerHTML = `<b>${icon ? icon : ''} ${msg} </b>`;
    notification.id = id;
    
    for (className in notificationClasses){
      notification.classList.add(className);
    }

    $('body').append(notification);
  }
  $('#'+id).fadeIn(500).delay(duration ? duration : 200).fadeOut(500);
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
  notify,
  setCacheShortcut
}