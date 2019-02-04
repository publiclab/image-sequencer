$(document).ready(function($){
	$(function(){
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100){
				$('.move-up').fadeIn();
			} else {
				$('.move-up').fadeOut();
			}
		});
		$('.move-up button').click(function(){
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
});
