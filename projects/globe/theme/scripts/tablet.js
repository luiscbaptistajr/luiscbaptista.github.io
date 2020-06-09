(function () {


	if (document.documentElement.clientWidth > 959) return;

	var mainNav = $('#header .main nav'),
		prodNav = $('.sub-nav-prod');

	// $('.logo').before('<nav class="tablet-nav">' + mainNav + '</nav>');
	// var prodNav = $('.tablet-nav').find('.nav-prod');
	// var subNav = $('.sub-holder').html();
	// var statusNav = false;

	mainNav.insertBefore($('.logo')).show().find('.nav-prod').append(prodNav);
	$('.sub-holder').remove();
	$('.menu-border, .arrow-down', mainNav).remove();
	// $(prodNav).append(subNav);
	// $('.tablet-nav').append('<span class="menu-border"></span>');

	// // remove details not needed
	$('li', prodNav, mainNav).removeClass();
	$('a', prodNav).removeClass().removeClass('tablet-sub-nav-prod')
		.find('span, p').remove().end()
		.append('<div class="icon-039"></div>');

	$('a.menu-launcher', mainNav).click(function(e) {
		e.preventDefault();
		hide(3);
		$('> ul', mainNav).toggle();
		$(this).toggleClass('active');
	});

	// $('.tablet-nav').find('li').removeClass();
	// $('.tablet-nav').find('.sub-nav-prod').removeClass().addClass('tablet-sub-nav-prod');
	prodNav.removeClass().addClass('tablet-sub-nav-prod');
	// $('.tablet-sub-nav-prod').find('li a span').remove();
	// $('.tablet-sub-nav-prod').find('li a p').remove();
	// $('.tablet-sub-nav-prod').find('.sub-font-menu').append('<div class="icon-039"></div>');

	// // add event
	// $('.tablet-nav').click(function() {
	// 	if (!statusNav) {
	// 		$(this).find('ul').css({ 'display':'block' });
	// 		$(this).css({'background-color':'#1953a4'});
	// 		//$(this).find('.menu-border').css({'display':'block'});
	// 		statusNav = true;
	// 	} else {
	// 		$(this).find('ul').css({ 'display':'none' });
	// 		$(this).css({'background-color':'#005ab0'});
	// 		//$(this).find('.menu-border').css({'display':'none'});
	// 		statusNav = false;
	// 	}
	// });
	
	// search toggle
	$('#header a.search-launcher').click(function(e) {
		e.preventDefault();
		hide(1);
		$('#search-box').toggle();
		$(this).toggleClass('active');
	});

	$('.sticky-login .collapse-button').click(function(e) {
		hide(2);
		$(this).toggleClass('active').siblings('.wrapper').toggle();
	})
	// slider

	function hide(num) {

		var objects = ['#search-box', '.sticky-login .wrapper', '#header .main nav > ul'],
			launcher = ['.search-launcher', '.sticky-login .collapse-button', '.menu-launcher'],
			objCount = objects.length;
		
		while (objCount--) {
			if (objCount == (num-1)) continue;
			$(objects[objCount]).hide();
			$(launcher[objCount]).removeClass('active');
		}

		
	}

	// fix for box 002
	if (document.documentElement.clientWidth < 640) {
		
		$('#home-box-002').append($('#home-box-4g-002'));

		var width = document.documentElement.clientWidth,
			carousel = $('.slider'),
			slideHolder = $('ul', carousel)
			slides = $('li', slideHolder),
			slideCount = slides.length,
			currSlide = 0,
			indicator = $('<p class="carousel-ind"></p>');

		for(var i=0; i<slideCount; i++ ) {
			$('<span/>').appendTo(indicator);
		}

		indicator.appendTo(carousel).find('span').eq(0).addClass('active');

 		slides.live('swipeleft', function(e) {
 			if (currSlide+1 >= slideCount) return;
 			changeSlide(++currSlide);
 		});

 		slides.live('swiperight', function(e) {
 			if (currSlide <= 0) return;
 			changeSlide(--currSlide);
 		});

 		function changeSlide(toSlide) {

 			indicator.find('span').eq(toSlide).addClass('active')
 				.siblings()
 				.removeClass('active');

 			slideHolder.animate({
 				marginLeft : -toSlide*$('li', slideHolder).width()
 			});
 		}


 		var stickyNav = $('.wrapper ul'),
 		    regLink = $('.sticky-login h1').html();

 		stickyNav.prepend($("<li class='login' />").append('<span class="arrow"><span></span></span>', regLink))
		// slideHolder.bind('touchstart mousedown', function(e) {

		// 	var mouseStartPos = e.screenX,
		// 		carouselStartPos = slideHolder.offset().left;

		// 	$(this).bind('touchmove mousemove', function(e) {
				
		// 		movecarousel(startPos)

		// 	});

		// 	$(this).bind('touchend mouseup mouseout', function(e) {
		// 		$(this).unbind('touchmove mousemove');
		// 	});

		// });

		// slideHolder.css('width', width*slideCount);
		// slides.css('width', width)

	}


})();