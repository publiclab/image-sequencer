function produceNotification(msg) {
    console.log(msg);
    if ($('#notification-styles').length == 0) {
      var notification = document.createElement('span');
      notification.innerHTML = ' <i class="fa fa-info-circle" aria-hidden="true"></i> ' + msg ;
      notification.id ='notification-styles';
  
      $('body').append(notification);
    }
  
    $('#notification-styles').fadeIn(500).delay(200).fadeOut(500);
  }