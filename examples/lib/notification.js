function produceNotification(msg,id) {
    var id1 ="#"+id; 
    if ($(id1).length == 0) {
      var notification = document.createElement('span');
      notification.innerHTML = ' <i class="fa fa-info-circle" aria-hidden="true"></i> ' + msg ;
      notification.classList.add("notification-styles");
      notification.id = id;
  
      $('body').append(notification);
    }
  
    $('.notification-styles').fadeIn(500).delay(200).fadeOut(500);
  }
