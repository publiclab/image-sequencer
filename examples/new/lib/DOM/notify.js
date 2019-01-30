function notify(msg,id){
  if ($('#'+id).length == 0) {
    var notification = document.createElement('span');
    notification.innerHTML = ' <i class="fa fa-info-circle" aria-hidden="true"></i> ' + msg ;
    notification.id = id;
    notification.classList.add("notification");

    $('body').append(notification);
  }
  $('#'+id).fadeIn(500).delay(200).fadeOut(500);
}

module.exports = notify;