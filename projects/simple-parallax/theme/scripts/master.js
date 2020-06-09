/*!
 * CPI
 * ABS-CBN Corporation 2015
 */

 (function ($) {
 	$(window).on("scroll", onScroll);
 	
 	$('.link-mechanics').click(function(e) {
 	    // Code that makes the lightbox appear
 	    e.preventDefault();
		//show lightbox window - you can use a transition here if you want, i.e. .show('fast')
		$('body').css({'overflow':'hidden'});
		$('#lightbox-mechanics').fadeIn();
 	});

	$('.terms-cond').click(function(e) {
	    // Code that makes the lightbox appear
	    e.preventDefault();
	    
        //show lightbox window - you can use a transition here if you want, i.e. .show('fast')
        $('body').css({'overflow':'hidden'});
        $('#lightbox-terms').fadeIn();
	});

	$('.btn-submit').click(function(e) {
	    // Code that makes the lightbox appear
	    e.preventDefault();
	    
        //show lightbox window - you can use a transition here if you want, i.e. .show('fast')
        $('body').css({'overflow':'hidden'});
        $('#lightbox-confirmation').fadeIn();
	});

 	$('.lb-close, .cancel').click(function() {
 		$('body').css({'overflow':'scroll'});
 	    $('#lightbox-mechanics').fadeOut();
 	    $('#lightbox-confirmation').fadeOut();
 	    $('#lightbox-terms').fadeOut();
 	});

 	$(".join").click(function(e) {
 		e.preventDefault();
 	    $('html, body').animate({
 	        scrollTop: $(".form").offset().top
 	    }, 2000);
 	});

 	$(".back-to-top").click(function(e) {
 		e.preventDefault();
 	    $('html, body').animate({
 	        scrollTop: $("#wrapper").offset().top
 	    }, 2000);
 	});

	function onScroll(event){
		var pixs = $(document).scrollTop(),
		    pixs = pixs / 100;

		$('.mechanics').addClass('fadein');
		$(".bg-hero").css({"-webkit-filter": "blur("+pixs+"px)","filter": "blur("+pixs+"px)" });
	}


 }(jQuery));
