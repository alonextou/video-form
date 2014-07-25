// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var video1, video2;

$(document).ready(function(){

	video1 = document.getElementById('video-intro');
	video2 = document.getElementById('video-loop');
	video2.volume = 0;

	video1.play();

	$(video1).on('play',function(){
		$(video1).removeAttr('controls');
	});

	video1.onended = function(){
		$(video1).remove();
		$(video2).show();
		video2.play();
		//$('#subscribe').foundation('reveal', 'open');
	}

	$(document).on('open', '[data-reveal]', function () {
		var modal = $(this);
		$(video1).remove();
		$(video2).show();
		video2.play();
	});

	$('input, textarea').placeholder();

	$("#subscribe-form form").validate({
		submitHandler: function(form) {
			var input = $(form).serialize();
			$.post('/subscribe.php',
				input 
			).done(function(response) {
				if(response.status == 'ok') {
					$('#subscribe-form').fadeOut(function(){
						$('#subscribe-thankyou').fadeIn();
					});
				} else {
	    			$('#subscribe-form').fadeOut(function(){
						$('#subscribe-error').fadeIn();
					});
	    		}
		  	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		  		$('#subscribe-form').fadeOut(function(){
					$('#subscribe-error').fadeIn();
				});
		  	});
		}
	});

});
