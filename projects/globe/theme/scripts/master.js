var useBillingAddress = false,
		useBillingAddress2 = false,
		unit = '',
		baranggay = '',
		province = '',
		street = '',
		city = '',
		zip = '',
		shippingUnit = '',
		shippingBaranngay = '',
		shippingProvince = '',
		shippingStreet = '',
		shippingCity = '',
		shippingZip = '';

$(document).ready(function () {

	// slider, slider
	var slySlider = function () {

		// the stuffs we need
		var sliderParent = '.main-slides',
			itemParent = '.mini-group-container',
			itemChild = 'li',
			perScroll = 480,
			count = 0,
			type;

		function initSlySlider(container) {
			var navLength = ($('.parallax-nav a', container).length);

			$(container+'>'+itemParent).width($(itemParent+'>'+sliderParent, container).length * $(itemParent+'>'+sliderParent, container).width());
			
			// on swipe
			$(container).on( 'swipeleft', swipeLeft);
			$(container).on( 'swiperight', swipeRight);

			// on click
			$('.parallax-nav a', container).on('click', function(e) {
				e.preventDefault();
				
				if($(this).hasClass('button-next')) {
					(count >= navLength) ? count = 0 : count++;

				} else {
					(count <= 0) ? count = navLength : count--;
				}
				
				$(container+'>'+itemParent).stop().animate({
					left: -(perScroll * count)
				});
			});

			function swipeLeft(event){
				(count >= navLength) ? count = 0 : count++;
				swiping(count);
			}

			function swipeRight(event){
				(count <= 0) ? count = navLength : count--;
				swiping(count);
			}

			function swiping(count) {
				$(container+'>'+itemParent).stop().animate({
					left: -(perScroll * count)
				});
			}
		}

		return {
			init: initSlySlider
		};
	}();

	// start slider, slider
	slySlider.init('.carousel-slider-box');

	// mini slider
	var miniSlider = function () {

		// the stuffs we need
		var sliderParent = '.mini-slider',
			itemParent = '.mini-group-container',
			itemChild = 'li',
			span4Left = 960,
			span3Left = 960,
			span2Left = 480,
			span1Left = 240,
			perScroll = 0,
			type;

		// for code review - not final
		function initMiniSlider(container) {
			var parent = $(sliderParent, container);
			groupItems(parent, container);		
		}


		// group item list
		function groupItems(parent, container) {

			var childLength = $(itemParent, sliderParent).find(itemChild).length;		

			if(parent.hasClass('mini-4-span-slider')) {
				perScroll = span4Left;
				console.log('4: '+ perScroll);
				for(var i = 0; i < childLength; i+=4) {
				  $((sliderParent, itemChild), container).slice(i, i+4).wrapAll('<ul class="mini-slide-group mini-4-span-group"></ul>');
				}
			}

			if(parent.hasClass('mini-3-span-slider')) {
				perScroll = span3Left;
				for(var i = 0; i < childLength; i+=3) {
				  $((sliderParent, itemChild), container).slice(i, i+3).wrapAll('<ul class="mini-slide-group mini-3-span-group"></ul>');
				}
			}

			if(parent.hasClass('mini-2-span-slider')) {
				perScroll = span2Left;
				for(var i = 0; i < childLength; i+=2) {
				  $((sliderParent, itemChild), container).slice(i, i+2).wrapAll('<ul class="mini-slide-group mini-2-span-group"></ul>');
				}
			}

			if(parent.hasClass('mini-1-span-slider')) {
				perScroll = span1Left;
				for(var i = 0; i < childLength; i+=1) {
				  $((sliderParent, itemChild), container).addClass('mini-slide-group mini-1-span-group');
				}
			}

			// correct semantics
			if(!parent.hasClass('mini-1-span-slider')) {
				var content = $(sliderParent + ' > ul', container).html(),
					containerAttr = $(sliderParent + ' > ul', container).attr('class');

				$(sliderParent + ' > ul', container).replaceWith($('<div class="'+containerAttr+'"/>').html(content));
			}

			// total width
			$(sliderParent+'>'+itemParent, container).width($((sliderParent, '.mini-slide-group'), container).length * $(sliderParent, container).width());

			// create nav
			createNav(parent, container, perScroll);
		}

		// create nav
		function createNav(parent, container, perScroll) {
			
			var index,
				count = 0,
				navLength;
 
			if(parent.hasClass('mini-1-span-slider')) {
				console.log(container);
				if($('.mini-nav a', container).length == 0) {
					for(var a = 0; a < $(container).length; a++) {
						for(var i = 0; i < $(container).eq(a).find('.slides').length; i++) {
							index = $((sliderParent, itemChild), container).eq(i).find('.slide-hero img').attr('data-src');
							$('.mini-nav', container).append('<a href="#" class="ui-inline mini-nav-btn" rel="'+i+'"><img src="'+index+'"/></a>');
						}
					}
				}
			} else {
				if($('.mini-nav a', container).length == 0) {
					for(var i = 0; i < $('.mini-slide-group', container).length; i++) {
						$('.mini-nav', container).append('<a href="#" class="ui-inline mini-nav-btn" rel="'+i+'"></a>');
					}
				}
			}

			// initial active nav
			navLength = ($('.mini-nav a', container).length) - 1;
			$('.mini-nav, .thumbnails', container).find('a:first-child').addClass('active');
			
			// on swipe
			$(container).on( 'swipeleft', swipeLeft);
			$(container).on( 'swiperight', swipeRight);

			// on click
			$('.mini-nav a', container).on('click', function(e) {
				e.preventDefault();
				$('.mini-nav a', container).removeClass('active');
				$(this).addClass('active');
				var multplr = $(this).attr('rel');

				if(parent.hasClass('mini-1-span-slider')) {
					$(sliderParent+'>ul', container).stop().css('position', 'relative').animate({
						left: -(perScroll * multplr)
					});
				} else {
					$(sliderParent+'>'+itemParent, container).stop().animate({
						left: -(perScroll * multplr)
					});
				}

			});

			function swipeLeft(event){
				(count >= navLength) ? count = 0 : count++;
				swiping(count);
			}

			function swipeRight(event){
				(count <= 0) ? count = navLength : count--;
				swiping(count);
			}

			function swiping(count) {
				$('.mini-nav a', container).removeClass('active');
				$('.mini-nav a', container).eq(count).addClass('active');
				var multplr = $('.mini-nav a.active', container).attr('rel');
				$(sliderParent+'>'+itemParent, container).stop().animate({
					left: -(perScroll * multplr)
				});	
			}

		}

		return {
			init: initMiniSlider
		};

	}();

    // slider
	var slider = function () {

		// the stuffs we need
		var container = '.slider',
			itemParent = 'ul',
			itemChild = 'li',
			itemIndex = 0,
			loopTime = null,
			autoplay = false,
			status = 'run',
			direction = 'negative',
			containerHeight = $(container).height(),
			childLength = $(itemParent, container).find(itemChild).length,
			childWidth = $(itemParent, container).find(itemChild).width();

		// initialize slider
		function initSlider() {
			$(container).show();
			$(itemParent, container).find(itemChild+':first-child').addClass('active').siblings();
			transEntr($(itemParent, container).find(itemChild+'.active'), direction);
			looper('positive', status);
			nav();
			thumb();
		}

		// attach click event on slider nav + stop autoplay on hover
		function nav() {

			$(container).hover(function() {
				status = 'stop';
				looper(direction, status);
			}, function() {
				status = 'run';
				looper(direction, status);
			});

			// on swipe
			$(container).on( 'swipeleft', swipeLeft);
			$(container).on( 'swiperight', swipeRight);

			$('.parallax-nav a').on('click', function (e) {
				e.preventDefault();
				clearTimeout(loopTime);

				if($(this).hasClass('button-prev')) {
					var directionEntr = 'positive',
						directionExit = 'negative';
					itemIndex--;
		        	itemIndex = (itemIndex < 0) ? itemIndex = (childLength - 1) : itemIndex;	
				}
				
				if($(this).hasClass('button-next')) {
					var directionEntr = 'negative',
						directionExit = 'positive';
					itemIndex++;
		        	itemIndex = (itemIndex == childLength) ? itemIndex = 0 : itemIndex;	
				}

				if (!autoplay) {
					if (itemIndex != $(itemParent, container).find(itemChild+'.active').index()) {
						transExit($(itemParent, container).find(itemChild+'.active'), directionExit, function () {
							$(itemParent, container).find(itemChild+'.active').removeClass('active').end().find("li").eq(itemIndex).addClass('active').show(0, function () {
								transEntr($(this), directionEntr);
							});
						});
					}
					looper(direction, status);
				}
				return false;
			});

			function swipeLeft(event){
				clearTimeout(loopTime);
				var directionEntr = 'positive',
					directionExit = 'negative';
					itemIndex--;
		        	itemIndex = (itemIndex < 0) ? itemIndex = (childLength - 1) : itemIndex;
				swiping(directionEntr, directionExit, itemIndex);
			}

			function swipeRight(event){
				clearTimeout(loopTime);
				var directionEntr = 'negative',
					directionExit = 'positive';
					itemIndex++;
		        	itemIndex = (itemIndex == childLength) ? itemIndex = 0 : itemIndex;	
				swiping(directionEntr, directionExit, itemIndex);
			}

			function swiping(directionEntr, directionExit, itemIndex) {
				if (!autoplay) {
					if (itemIndex != $(itemParent, container).find(itemChild+'.active').index()) {
						transExit($(itemParent, container).find(itemChild+'.active'), directionExit, function () {
							$(itemParent, container).find(itemChild+'.active').removeClass('active').end().find("li").eq(itemIndex).addClass('active').show(0, function () {
								transEntr($(this), directionEntr);
							});
						});
					}
					looper(direction, status);
				}
				return false;
			}
		}

		// thumbnail preview
		function thumb() {
			$('.thumbnail-box a').on('click', function (e) {
				e.preventDefault();
				var path = $(this).attr('rel');
				$(this).parents('.hero-box').find('.slide-hero>img').attr('src', path);
			});
		}

		// enter - transition + direction
		function transEntr(active, direction) {
			var count = 0;
			autoplay = true;
			$(container).find(itemChild).children().offset({
				left: (direction === 'negative') ? -($(window).width()) : ($(window).width())
			});
			active.children().each(function (i, item) {
				var item = $(item),
					speed = Math.floor(Math.random() * active.children().length) * 200;

				item.stop(true, true).animate({
					left: 0,
					opacity: 1
				}, 600, function () {
					count++;
					if (count == active.children().length) {
						autoplay = false;
					}
				});
			});
		}

		// exit - transition + direction
		function transExit(active, direction, callback) {
			var count = 0;
			autoplay = true;
			active.children().each(function (i, item) {
				var item = $(item),
					speed = Math.floor(Math.random() * active.children().length);
				item.stop(true, true).animate({
					left: (direction === 'negative') ? -($(window).width() + childWidth) : ($(window).width() + childWidth),
					opacity: 0
				}, 300, function () {
					count++;
					if (count == active.children().length && typeof callback === 'function') {
						callback.call();
						autoplay = false;
					}
				});
			});
		}

		// autoplay loop
		function looper(direction, status) {
			if(status == 'run') {
				loopTime = setTimeout(function () {
					var childActive = $(itemParent, container).find(itemChild+'.active'),
						nextIndex = childActive.next().index(),
						currentIndex = (nextIndex == -1) ? 0 : nextIndex;

					transExit(childActive, 'positive', function () {
						childActive.removeClass('active').hide().end().find('li').eq(currentIndex).addClass('active').show(0, function () {
							transEntr($(this), 'negative');
							looper(direction, status);
						});
					});
				}, 3000);
			} else if(status == 'stop') {
				loopTime = clearTimeout(loopTime);
			}
		}

		return {
			init: initSlider
		};

	}();


	if (document.documentElement.clientWidth >= 960) {
		// start mini carousel
		miniSlider.init('#mini-slider-online-shop-phones');
		miniSlider.init('#mini-slider-online-shop-promos');
		miniSlider.init('#mini-slider-online-shop-tattoo');
		miniSlider.init('#mini-slider-online-shop-downloads');
		miniSlider.init('#mini-slider-online-shop-simcards');
		miniSlider.init('.mini-slider-product-tipidd100');
		miniSlider.init('.mini-slider-product-tipidd200');
		miniSlider.init('.mini-slider-product-tipidd300');

		// start the carousel
		slider.init();

	}
	

	// SUB MENUS

	// WHEN MOUSE ROLLS OVER

	var navProd = $("#header .main nav ul > li.nav-prod a"),
		navProdSiblings = navProd.siblings('li'),
		subNavProdHolder = $("#header .sub-holder"),
		subNavList = subNavProdHolder.find("li"),
		mainHeader = $("#wrapper").find("#header"),
		mainHeaderLogo = $(mainHeader).find(".main > h1.logo"),
		iconProd = $(navProd).find("a  > span.icon-prod");

	//console.log(iconProd);

	$(navProd).hover(
	
	function(){
		
		$(subNavProdHolder)

			.stop(true, true)
			.animate({
				height: 'toggle'
			}, {
				queue: false,
	    		duration: 200,
	    		// easing: 'easeOutBack'
			})
	}, 

	function() {
		
		$(subNavProdHolder)

			.stop(true, true)
			.animate({
				height: 'toggle'
			}, {
				queue: false,
	    		duration: 200,
	    		// easing: 'easeOutBack'
			})

			return false;

			
	});

	$(subNavProdHolder).hover(
	
	function(){
		
		$(this).stop();
		$("#header .main nav ul > li.nav-prod").addClass('active')
		$(navProd).addClass('active');
	}, 

	function() {
		
		$(this)

			.animate({
				height: 'toggle'
			}, {
				queue: false,
	    		duration: 200,
	    		// easing: 'easeOutBack'
			})

		$("#header .main nav ul > li.nav-prod").removeClass('active')
		$(navProd).removeClass('active');

		return false;
	});

	// for sticky login
	var collapsing = false;
	$('.sticky-login .collapse-button').click(function(e) {

		if (document.documentElement.clientWidth < 959) return;

		if (collapsing) return;

		collapsing = true;

		if ( $('.wrapper').is(':visible') ) {

			$(this).siblings('.wrapper').animate({
				height : 'toggle'
			}, function() {

				$('.sticky-login header').animate({
					width:'toggle'
				}, function() { collapsing = false; });

			});
		} else {
			$('.sticky-login header').animate({
				width:'toggle'
			}, function() {
				$(this).siblings('.wrapper').animate({
					height : 'toggle'
				}, function() { collapsing = false; });
			});
		}

		e.preventDefault();

	});


	if (document.documentElement.clientWidth > 959) {
		$(".sticky-login").draggable({
			addClasses : false,
			containment : "body",
			opacity : 0.5,
			// revert : "invalid",
			create : function(e, ui) {
	
			},
			drag : function(e, ui) {
				$(this).css('right', 'auto');
			},
			stop : function(e, ui) {
	
				var pos = $(this).offset().left,
					viewport = $(window).width(),
					left = pos <= (viewport / 2);
	
				if (left) {
					$(this).animate({
						left:50
					});
				} else {
					$(this).animate({
						left: viewport - this.offsetWidth - 100
					}, function() {
						$(this).css({
							left : "auto",
							right : 100
						})
					});
				}
	
			}
		});
	}

	/* fixed prepaid left menu */

	var fixedMenu = $('.floating-nav-holder'),
		getLastList = $(fixedMenu).find('.floating-nav-list li:last').addClass('float-nav-lastList'),
		getHref = $(fixedMenu).find('ul > li > a');


	console.log(getHref.length);


	function showFloat() {

		if ($(window).scrollTop() > 1289) {

			fixedMenu.fadeIn(); // show left side menu
			

		} else if ($(window).scrollTop() <= 1289) {
			
			fixedMenu.fadeOut(); // hide left side menu

		}

	}

	$(window).scroll(showFloat);

	function goToByScroll(id){
	      // Remove "link" from the ID
	    id = id.replace("link", "");
	      // Scroll
	    $('html,body').animate({
	        scrollTop: $("#"+id).offset().top},
	        'slow');

	}

	$('.categories-drop > li > a').click(function(e) { 
	      // Prevent a page reload when a link is pressed
	    e.preventDefault(); 
	      // Call the scroll function
	    goToByScroll($(this).attr("id")); 

	});	

	/* SET FOCUS FOR EMAIL ADDRESS INPUT */

	// var toClearMe = $('#subscribe-news-letter #subscriber-email-box')

	$('.email-textbox').focus(function() {

		$(this).val('');

	});

	$('.email-textbox').blur(function() {
		
		$(this).val('name@domain.com');;

	});

/*------- COMPARISON SCRIPTS ---------*/

	//CHECK TABLE WIDTH ON LOAD
	var tableWidth = $('#comparison-table').width(),
		containerWidth = $('.comparison-box').width(),
		numOfItems = $('#comparison-table tbody').find('tr').eq(0).find('td').length,
		addModelWidth = $('.add-model').width(),
		tdWidth = 245;
	checkTableWidth();

	//ADD ITEM CLICK
	$('.add-model-button').click(function(){
		if (numOfItems > 2){
			if (numOfItems > 1) {
				if (addModelWidth > 60){
					addModelWidth = addModelWidth - tdWidth;
					$('.add-model').animate({
						'width' : addModelWidth
					},500);
				}
			}
		}
		return false;
	})

	//REMOVE ITEM FROM COMPARISON TABLE
	$('#comparison-table tbody tr td').delegate('.remove-item-button', 'click', function(){
		var thisItemIndex = $(this).parent('td').attr('data-index');
    	$('#comparison-table tbody tr').find('td[data-index="'+thisItemIndex+'"]').css('z-index',1).animate({
    		left: -245,
    		opacity: 0
    	}, 500, function() { 
    		$(this).remove(); 
    	});
    	tableWidth = tableWidth - tdWidth;
    	numOfItems = numOfItems - 1;
    	checkTableWidth();
    	return false;
	})

	function checkTableWidth(){
		if(tableWidth < (containerWidth-60)){
			$('.add-model').animate({
				'width' : containerWidth - tableWidth
			},500);
		}
	}

/*---------------- POP-UP SCRIPTS ------------------*/
	getPopUps();

	function getPopUps(){
	    $.ajax({
	        url: "pop-ups.html",
	        cache: true
	    }).done(function( html ) {
	        $("body").prepend(html);
	    });
	}

	//click view cart
	$('body').delegate('#view-cart','click', function(){
		showPopUpViewCart($('.cart-view'));
		return false;
	});

	$('body').delegate('#checkout','click', function(){
		$('.pop-up-cart .cart-view').hide();
		$('.pop-up-cart .billing-info-view').show();
		return false;
	});

	$('body').delegate('#billing-next','click', function(){
		if(validateForm($('.billing-info-view'))){
			return false;
		}else{
			$('.pop-up-cart .shipping-info-view').show();
			$('.pop-up-cart .billing-info-view').hide();

			unit = $('.pop-up-cart .billing-info-view').find('input.unit').val();
			baranggay = $('.pop-up-cart .billing-info-view').find('input.baranggay').val();
			province = $('.pop-up-cart .billing-info-view').find('input.province').val();
			street = $('.pop-up-cart .billing-info-view').find('input.street').val();
			city = $('.pop-up-cart .billing-info-view').find('input.city').val();
			zip = $('.pop-up-cart .billing-info-view').find('input.zip').val();

			if(useBillingAddress == true){

				shippingUnit = $('.pop-up-cart .shipping-info-view').find('input.unit');
				shippingBaranngay = $('.pop-up-cart .shipping-info-view').find('input.baranggay');
				shippingProvince = $('.pop-up-cart .shipping-info-view').find('input.province');
				shippingStreet = $('.pop-up-cart .shipping-info-view').find('input.street');
				shippingCity = $('.pop-up-cart .shipping-info-view').find('input.city');
				shippingZip = $('.pop-up-cart .shipping-info-view').find('input.zip');

				$('.pop-up-cart .shipping-info-view').find('#use-billing2').prop('checked', true);
				useBillingAddress2 = true;

				shippingUnit.val(unit).attr('readonly','readonly');
				shippingBaranngay.val(baranggay).attr('readonly','readonly');
				shippingProvince.val(province).attr('readonly','readonly');
				shippingStreet.val(street).attr('readonly','readonly');
				shippingCity.val(city).attr('readonly','readonly');
				shippingZip.val(zip).attr('readonly','readonly');

			}else{

				$('.pop-up-cart .shipping-info-view').find('#use-billing2').prop('checked', false);
				useBillingAddress2 = false;
				shippingUnit.val('').removeAttr('readonly');
				shippingBaranngay.val('').removeAttr('readonly');
				shippingProvince.val('').removeAttr('readonly');
				shippingStreet.val('').removeAttr('readonly');
				shippingCity.val('').removeAttr('readonly');
				shippingZip.val('').removeAttr('readonly');

			}
		}
	});

	$('body').delegate('#use-billing','change', function(){
		if($(this).is(':checked')){
			useBillingAddress = true;
		}else{
			useBillingAddress = false;
		}
	});

	$('body').delegate('#use-billing2','change', function(){
		if($(this).is(':checked')){
			useBillingAddress2 = true;
			shippingUnit.val(unit).attr('readonly','readonly');
			shippingBaranngay.val(baranggay).attr('readonly','readonly');
			shippingProvince.val(province).attr('readonly','readonly');
			shippingStreet.val(street).attr('readonly','readonly');
			shippingCity.val(city).attr('readonly','readonly');
			shippingZip.val(zip).attr('readonly','readonly');
		}else{
			useBillingAddress2 = false;
			shippingUnit.val('').removeAttr('readonly');
			shippingBaranngay.val('').removeAttr('readonly');
			shippingProvince.val('').removeAttr('readonly');
			shippingStreet.val('').removeAttr('readonly');
			shippingCity.val('').removeAttr('readonly');
			shippingZip.val('').removeAttr('readonly');
		}
	});

	$('body').delegate('#shipping-next','click', function(){
		if(validateForm($('.shipping-info-view'))){
			return false;
		}else{
			$('.pop-up-cart .shipping-info-view').hide();
			$('.pop-up-cart .payment-view').show();
		}
	});
	/*--------------SUBMIT PAYMENT FORM --------------------*/

	$('body').delegate('#payment-submit','click', function(){
		if(validateForm($('.payment-view'))){
			return false;
		};
	});

	/*------------------AFTER SUBMITTING---------------------

	ON SUCCESS CALL showPopUpViewCart($('.payment-success-view'));
	ON ERROR SHOW showPopUpViewCart($('.payment-error-view'));

	------------------------------------------------------------*/

	$('body').delegate('.pop-up-back','click', function(){
		returnToPrev($(this).attr('data-view'), $(this).attr('data-prev'));
		return false;
	});

	$('body').delegate('.payment-view .card-icon','click', function(){
		if($(this).hasClass('selected')){
			return false;
		}else{
			$(this).siblings('a.card-icon').removeClass('selected');
			$(this).addClass('selected');
		}
	});

	function showPopUpViewCart(view){
		$('.body-overlay').fadeIn(500);
		$('.pop-up-cart').fadeIn(500);
		view.show();
		computeTotal();
	}

	function returnToPrev(thisDiv, prevDiv){
		$(".pop-up-cart ." + thisDiv).hide();
		$(".pop-up-cart ." + prevDiv).show();
	}

	/*------- LOGIN -------*/

	$('body').delegate('#login','click', function(){
		$('.body-overlay').fadeIn(500);
		$('.pop-up-login').fadeIn(500);
		return false;
	});

	$('body').delegate('.pop-up-close','click', function(){
		$('.pop-up-login').fadeOut(200);
		$('.pop-up-cart').fadeOut(200);
		$('.body-overlay').fadeOut(200);
		$('.pop-up-cart .cart-view').hide();
		$('.pop-up-cart .billing-info-view').hide();
		$('.pop-up-cart .shipping-info-view').hide();
		$('.pop-up-cart .payment-view').hide();
		$('.pop-up-cart .payment-success-view').hide();
		$('.pop-up-cart .payment-error-view').hide();
		return false;
	});

	$('body').delegate('.body-overlay','click', function(e){
		e.preventDefault();
		$('.pop-up-login').fadeOut(200);
		$('.pop-up-cart').fadeOut(200);
		$('.pop-up-cart .cart-view').hide();
		$('.pop-up-cart .billing-info-view').hide();
		$('.pop-up-cart .shipping-info-view').hide();
		$('.pop-up-cart .payment-view').hide();
		$('.pop-up-cart .payment-success-view').hide();
		$('.pop-up-cart .payment-error-view').hide();
		$(this).fadeOut(200);
		return false;
	});

/*----- VALIDATE LOGIN FORM -------*/

$('body').delegate('#login-form #submit-login', 'click', function(){
	
	if(validateForm($('#login-form'))){
		return false;
	}
});

/*---- VALIDATE SHOPPING CART -----*/

function validateForm(form){
	required = form.find('.required');
	emailField = form.find('.check-email');
	emailaddressVal = form.find('.check-email').val();
	pass = form.find('input[type=password]');
	isBlank = false;
	isInvalid = false;
	formInvalid = false;

	if(required.length > 0){
	    $(required).each(function(e) {	
	    	if($(this).val() == ""){
	    		isBlank = true;
	    		$(this).parent('fieldset').addClass('invalid');
	    		$(this).next('span').text("Please enter your " + $(this).attr('data-field'));
	    	}else{
	    		$(this).parent('fieldset').removeClass('invalid');
	    	}

	    });
	}

	if((emailField.length > 0)){
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if(!emailReg.test(emailaddressVal)) {
        	isInvalid = true;
        	emailField.parent('fieldset').addClass('invalid');
        	emailField.next('span').text("Please enter a valid email address");
        }
    }

	if((isBlank == true) || (isInvalid == true)){
        formInvalid = true;
        return formInvalid;
    }else{
    	formInvalid = false;
    	return formInvalid;
    }
}

/*-------- SHOPPING CART EVENTS ----------*/
$('body').delegate('.cart-view #empty-cart', 'click', function(){
	console.log('hohoho');
	var listItems = $('.cart-view').find('ul.item-list').find('li');
	listItems.each(function(){
		$(this).slideUp(200, function() { 
			$(this).remove(); 
			computeTotal();
		});
	});
	return false;
});

$('body').delegate('.cart-view .remove', 'click', function(){
	var thisList = $(this).parent('div').parent('div').parent('li');
    thisList.slideUp(200, function() { 
    	$(this).remove(); 
    	computeTotal();
    });
    return false;
});

$('body').delegate('.cart-view .quantity', 'change', function(){
	var thisPrice = $(this).parent('div').children('div.price').find('span.price-each').attr('data-each-price');
	var thisQuantity = parseFloat($(this).find('option:selected').val());
	var newTotal = thisPrice * thisQuantity;
	$(this).parent('div').children('div.price').find('span.price-total').attr('data-total-price',newTotal);
    $(this).parent('div').children('div.price').find('span.price-total').text("P " + numberWithCommas(newTotal));
    computeTotal();
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function computeTotal(){
	var listItems = $('.cart-view').find('ul.item-list').find('li');
		subtotal = 0,
		salesTax = 0,
		shippingFee = parseFloat($('.cart-view .total-container').find('span.shipping').attr('data-shipping'));
	listItems.each(function(){
		subtotal = subtotal + parseFloat($(this).find('div.price').find('span.price-total').attr('data-total-price'));
	});
	salesTax = subtotal * 0.12;
	$('.cart-view .total-container').find('span.sub-total').text("P " + numberWithCommas(subtotal.toFixed(2)));
	$('.cart-view .total-container').find('span.sales-tax').text("P " + numberWithCommas(salesTax.toFixed(2)));
	$('.cart-view .total-container').find('span.total').text("P " + numberWithCommas((salesTax + subtotal + shippingFee).toFixed(2)));
	console.log(subtotal);	
}

function changeQuantity(){

}

$("a[href='#back-to-top']").click(function(){
	$("html, body").animate({scrollTop: 0}, "slow");
});



});