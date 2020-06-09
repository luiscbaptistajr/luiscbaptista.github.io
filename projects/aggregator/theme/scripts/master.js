/**!
 * PANGAKO SA'YO PROMISE LOCKS
 * ABS-CBN Corporation 2015
 */

var resizeableImage = function(image_target) {
	// Some variable and settings
	var $container,
		orig_src = new Image(),
	  	image_target = $(image_target).get(0),
	  	event_state = {},
	  	constrain = false,
	  	min_width = 60, // Change as required
	  	min_height = 60,
	  	max_width = 470, // Change as required
	  	max_height = 470,
	  	resize_canvas = document.createElement('canvas');

	init = function(){

		// When resizing, we will always use this copy of the original as the base
		orig_src.src=image_target.src;

		// $(image_target).empty();

		// if(!$(image_target).parent('.resize-container').length) {
		// 	// Wrap the image with the container and add resize handles
		// 	$(image_target).wrap('<div class="resize-container"></div>')
		// 		.before('<span class="resize-handle resize-handle-nw"></span>')
		// 		.before('<span class="resize-handle resize-handle-ne"></span>')
		// 		.after('<span class="resize-handle resize-handle-se"></span>')
		// 		.after('<span class="resize-handle resize-handle-sw"></span>');
		// }

		if(!$(image_target).parent('.resize-container').length) {
			// Wrap the image with the container and add resize handles
			$(image_target).wrap('<div class="resize-container"></div>');
		}
		// Assign the container to a variable
		$container =  $(image_target).parent('.resize-container');

		// Add events
		$container.on('mousedown touchstart', '.resize-handle', startResize);
			$container.on('mousedown touchstart', 'img', startMoving);
			$('.js-crop').on('click', crop);
	};

	startResize = function(e){
		e.preventDefault();
		e.stopPropagation();
		saveEventState(e);
		$(document).on('mousemove touchmove', resizing);
		$(document).on('mouseup touchend', endResize);
	};

	endResize = function(e){
		e.preventDefault();
		$(document).off('mouseup touchend', endResize);
		$(document).off('mousemove touchmove', resizing);
	};

	saveEventState = function(e){
		// Save the initial event details and container state
		event_state.container_width = $container.width();
		event_state.container_height = $container.height();
		event_state.container_left = $container.offset().left; 
		event_state.container_top = $container.offset().top;
		event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
		event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

		// This is a fix for mobile safari
		// For some reason it does not allow a direct copy of the touches property
		if(typeof e.originalEvent.touches !== 'undefined'){
			event_state.touches = [];
			$.each(e.originalEvent.touches, function(i, ob){
			  event_state.touches[i] = {};
			  event_state.touches[i].clientX = 0+ob.clientX;
			  event_state.touches[i].clientY = 0+ob.clientY;
			});
		}
		event_state.evnt = e;
	};

	resizing = function(e){
		var mouse={},width,height,left,top,offset=$container.offset();
		mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
		mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

		// Position image differently depending on the corner dragged and constraints
		if( $(event_state.evnt.target).hasClass('resize-handle-se') ){
			width = mouse.x - event_state.container_left;
			height = mouse.y  - event_state.container_top;
			left = event_state.container_left;
			top = event_state.container_top;
		} else if($(event_state.evnt.target).hasClass('resize-handle-sw') ){
			width = event_state.container_width - (mouse.x - event_state.container_left);
			height = mouse.y  - event_state.container_top;
			left = mouse.x;
			top = event_state.container_top;
		} else if($(event_state.evnt.target).hasClass('resize-handle-nw') ){
			width = event_state.container_width - (mouse.x - event_state.container_left);
			height = event_state.container_height - (mouse.y - event_state.container_top);
			left = mouse.x;
			top = mouse.y;
			if(constrain || e.shiftKey){
				top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
			}
		} else if($(event_state.evnt.target).hasClass('resize-handle-ne') ){
			width = mouse.x - event_state.container_left;
			height = event_state.container_height - (mouse.y - event_state.container_top);
			left = event_state.container_left;
			top = mouse.y;
			if(constrain || e.shiftKey){
				top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
			}
		}

		// Optionally maintain aspect ratio
		if(constrain || e.shiftKey){
			height = width / orig_src.width * orig_src.height;
		}

		if(width > min_width && height > min_height && width < max_width && height < max_height){
			// To improve performance you might limit how often resizeImage() is called
			resizeImage(width, height);  
			// Without this Firefox will not re-calculate the the image dimensions until drag end
			$container.offset({'left': left, 'top': top});
		}
	}

	resizeImage = function(width, height){
		resize_canvas.width = width;
		resize_canvas.height = height;
		resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);   
		$(image_target).attr('src', resize_canvas.toDataURL("image/png"));  
	};

	startMoving = function(e){
		e.preventDefault();
		e.stopPropagation();
		saveEventState(e);
		$(document).on('mousemove touchmove', moving);
		$(document).on('mouseup touchend', endMoving);
	};

	endMoving = function(e){
		e.preventDefault();
		$(document).off('mouseup touchend', endMoving);
		$(document).off('mousemove touchmove', moving);
	};

	moving = function(e){
		var  mouse={}, touches;
		e.preventDefault();
		e.stopPropagation();

		touches = e.originalEvent.touches;

		mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft(); 
		mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
		$container.offset({
			'left': mouse.x - ( event_state.mouse_x - event_state.container_left ),
			'top': mouse.y - ( event_state.mouse_y - event_state.container_top ) 
		});
		// Watch for pinch zoom gesture while moving
		if(event_state.touches && event_state.touches.length > 1 && touches.length > 1){
			var width = event_state.container_width, height = event_state.container_height;
			var a = event_state.touches[0].clientX - event_state.touches[1].clientX;
			a = a * a; 
			var b = event_state.touches[0].clientY - event_state.touches[1].clientY;
			b = b * b; 
			var dist1 = Math.sqrt( a + b );

			a = e.originalEvent.touches[0].clientX - touches[1].clientX;
			a = a * a; 
			b = e.originalEvent.touches[0].clientY - touches[1].clientY;
			b = b * b; 
			var dist2 = Math.sqrt( a + b );

			var ratio = dist2 /dist1;

			width = width * ratio;
			height = height * ratio;
			// To improve performance you might limit how often resizeImage() is called
			resizeImage(width, height);
		}
	};

	crop = function(){
		//Find the part of the image that is inside the crop box
		var crop_canvas,
		    left = $('.overlay').offset().left - $container.offset().left,
		    top =  $('.overlay').offset().top - $container.offset().top,
		    width = $('.overlay').width(),
		    height = $('.overlay').height();
			
		crop_canvas = document.createElement('canvas');
		crop_canvas.width = width;
		crop_canvas.height = height;

		crop_canvas.getContext('2d').drawImage(image_target, left, top, width, height, 0, 0, width, height);
		window.open(crop_canvas.toDataURL("image/png"));
	}

	zoom = function() {

	    // Zoom in/out & Drag
		$('.image-tools a').on('click', function(e) {
			e.preventDefault();
			
			if (orig_src) {

			// 	if ($(this).hasClass('icon-zin')) {
			// 		orig_src.clientX += 0.1;
			// 		orig_src.clientY += 0.1;
			// 		// console.log('zoom in');
			// 	}
			// 	else if ($(this).hasClass('icon-zout')) {
			// 		// image_target.scaleX -= 0.1;
			// 		// image_target.scaleY -= 0.1;
			// 		console.log('zoom out');
			// 	}
			// 	else if ($(this).hasClass('icon-fit')) {
			// 		// image_target.set({
			// 		// 	left: 0,
			// 		// 	top: 0,
			// 		// 	scaleY: canvas.height / image_target.width,
			// 		// 	scaleX: canvas.width / image_target.width
			// 		// });
			// 		console.log('fit');
			// 	}
				
			// 	// image_target.setCoords();
			// 	// canvas.renderAll();

			};

			console.log('xoooom');


		});
	};

	init();
};

var PSY = (function(){
 	'use strict';

 	var $lightboxify = $('.popup-block'),
 		pageData,
 		data, 
 		dataLength,
 		startIndex = 0,
 		endIndex = 0;

 	// FUNCTION FOR ALL LIGHTBOX
 	function lightboxify() {
		$('.show-lbox').on('click',function(e){
			e.preventDefault();
			var windowHeight 		= $(window).height(),
				data_post_src 		= $(this).find('img').attr("src"),
	        	data_post_alt		= $(this).find('img').attr("alt"),
	        	data_prof_name		= $(this).find('img').attr("data-profname"),
	        	data_prof_img		= $(this).find('img').attr('data-profimg'),
	        	data_likes			= $(this).find('img').attr('data-likes'),
	        	data_text 			= data_post_alt;
	        	
	        // console.log(data_src);

    		var img_lightbox = '<div id="popbox">' +
	          	'<div class="back-overlay"><p class="lightbox-close">x</p></div>' +
	          	'<div class="content">' +
	          		'<div class="main-image">'+
	          			'<img src="' + data_post_src + '" alt="'+ data_post_alt +'" />' + 
	          			
	          		'</div>' +
	          		'<div class="details">' +
	          			'<div class="profile">' +
	          				'<img src="'+data_prof_img+'" alt="'+data_prof_name+'" />' + 
	          				'<span class="name">"'+data_prof_name+'"</span>' +
	          				'<p><small class="star-count">'+data_likes+' witnesses</small></p>' +
	          				'<p class="caption-wrapper">'+ data_text +'</p>' +
	          			'</div>' +
	          		'</div>' +	
	          	'</div>' +
	        '</div>';

	        $('body').append($(img_lightbox));
	        // $('#popbox').show();

			// FADEIN LIGHTBOX
			if ($(window).width() <= 640) {
				$('#popbox').show();
			} else {
				// if(!$lightboxify.length) return;
				console.log(lightboxify.length)
				$('#popbox').fadeIn(function(){
					var pop_height 		= $('#popbox .content').outerHeight(),
						pop_width		= $('#popbox .content').width(),
						left_side		= Math.ceil(($(window).width() - pop_width) / 2),
						btn_close_pos	= pop_width + left_side,
						pop_top			= (windowHeight - pop_height) / 2,
						img_height		= $('.main-image img').height() - 20;

					console.log(pop_width, $(window).width(), left_side);
					
					$('body').css({'overflow':'hidden'});
					$('#popbox .lightbox-close').css({'left': btn_close_pos + 10});

				  	if(windowHeight > pop_height) {
			  		  	$('#popbox .content, #popbox .lightbox-close').animate({ "top": "+=" + pop_top + "px" }, 600).delay(400);
				  	} else {
				  		$('#popbox .content, #popbox .lightbox-close').show();
				  	}

			  		$('#popbox .details').css({'height':img_height, 'overflow-y': 'auto'});
				});	
			}
			
			$('.lightbox-close, .back-overlay, .link-close').click(function(e) {
				e.preventDefault();
			    closeBox();
			});

		}); 		
 	}

 	function closeBox() {
 		$('#popbox').fadeOut(function(){
 			$('body').css({'overflow-y':'scroll'});
 			$('#popbox').animate({ "top": "0" }, 900).delay(400);
 			$(this).remove();
 		});
 	}

 	// FUNCTION OF GETTING THE JSON FILE
 	function detectPage() {
 		endIndex = 11;
 		getContent('theme/data/data.json');
 		// getContent('https://users.dialogfeed.com/en/snippet/promise-locks.json?api_key=a7f425e79b00474b0578d747ad0351dd');
 	}

 	/* GET CONTENTS */
 	function getContent(file) {
 		$.ajax({
 			type: 'GET',
 			url: file,
 			async: false,
 			cache: false,
 			global: false,
 			jsonpCallback: 'jsonCallback',
 			contentType: "application/json",
 			dataType: 'json',
 			success: function(data)
 			{
 				pageData = data;
 				console.log('success');
 				dataLength = pageData.news_feed.posts.post.length;
 				console.log(dataLength);

 				if(dataLength < endIndex){
 					endIndex = dataLength - 1;
 				}

 				dataLoadSlice(startIndex, endIndex);
 			},
 			error: function(e)
 			{
 			   	console.log('error');
 			}
 			
 		});
 	}

 	/* SLICE DATA */
 	function dataLoadSlice(start, end){
 		var i;
 		for (i = start; i <= end; i++) {
 			// console.log(i);
 			var thisHTML =  '<li>' +
 				'<div class="gallery-list-inner">' +
 					'<div class="information-block">' +
 						'<span class="icon-promise"><a href="'+pageData.news_feed.posts.post[i].author.url+'"><img src="'+pageData.news_feed.posts.post[i].author.picture_url+'" alt="'+pageData.news_feed.posts.post[i].author.name+'" /></a></span>' +
 						'<h4 class="promise-title">'+pageData.news_feed.posts.post[i].source.source_name+'</h4>' +
 						'<p class="couple-name">'+pageData.news_feed.posts.post[i].author.name+'</p>' +
 					'</div>' +
 					'<div class="img-couple show-lbox">' +
 						'<img src="'+pageData.news_feed.posts.post[i].content.content_picture+'" data-likes="'+pageData.news_feed.posts.post[i].likes+'" alt="'+pageData.news_feed.posts.post[i].content.content_body+'" data-profname="'+pageData.news_feed.posts.post[i].author.name+'" data-profimg="'+pageData.news_feed.posts.post[i].author.picture_url+'" />' +
 					'</div>' +
 					'<div class="information-bottom-block">' +
 						'<small class="witness-block flexy center">' +
 							'<span class="heart"></span>' +
 							'<span class="count">'+pageData.news_feed.posts.post[i].likes+'</span>' +
 							'<span class="witness">&nbsp;witnesses</span>' +
 						'</small>' +	
 					'</div>' +
 				'</div>' +
 			'</li>';

 			$('.content-gallery ul').append(thisHTML);
 			thisHTML = $('.content-gallery ul li').eq(i);
 		}
 	}

 	$('.load-more').click(function(){
 		// e.preventDefault();
 		var numArticleLength = $('.content-gallery ul').find('li').length;
 		if (numArticleLength == dataLength) {
 			$('.content-load').hide();
 			return false;
 		}else {
 			var getLoad = 4;
 			startIndex = endIndex + 1;
 			endIndex = endIndex + getLoad;
 			if (endIndex > dataLength){
 				endIndex = dataLength - 1;
 			}
 			dataLoadSlice(startIndex, endIndex);
 		}
 		// lightboxify();
 	});

 	function init() {
 		detectPage();
 		lightboxify();
 	}

 	return {
 		init:init
 	};

 }());
 jQuery(document).ready(function($) { PSY.init(); });