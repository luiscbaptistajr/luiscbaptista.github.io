/*!
 * ABS-CBN News article page
 * ABS-CBN Corporation 2016
 */

var NEWS = (function($){
	'use strict';

	// GLOBAL VARIABLE
	var timer			= setInterval(tickerfy, 5000),
		ticker_list		= $('#ticker li').length,
		$ul 			= $("<ul></ul>"),
		sticky_timer	= '';

	function data_load(start, end) {
		var newData = $('.item-content-block');
		$('#content').cleverInfiniteScroll({
			contentsWrapperSelector: '#content',
			contentSelector: '.item-content-block',
			nextSelector: '#next',
			loadImage: 'loader.gif',
			offset: $(window).height()
		});

		$(window).on("scroll", onScroll);
	}

	function onScroll(event){
		var items = $('.item-content-block');
		var current_pos = $(this).scrollTop();

		items.each(function(){
			var top = $(this).offset().top,
				bottom = top + $(this).outerHeight();

			if (current_pos >= top && current_pos <= bottom) {
				clearInterval(sticky_timer);
				sticky_timer = setTimeout(function(){
					repair_sticky(items);	
				}, 100);
				
			}
		});


	}


	// FUNCTIONS
	function tickerfy() {
		$('#ticker li:first').fadeOut(function() {
	        $(this).appendTo($('#ticker')).fadeIn(8000);
	    });

		// CALL THE TICKER
	    ticker_stop();
	}

	function ticker_hoverfy() {
		$('#ticker').on({
			mouseenter: function(){
				clearInterval(timer);
			},
			mouseleave: function(){
				timer = setInterval(tickerfy, 3000);
			}
		});
	}

	function ticker_stop() {
		if(ticker_list == 1){clearInterval(timer);}
		return;
	}

	function ticker_closefy() {
		$('#btn-close').click(function(e){
			e.preventDefault();
			$('.ticker-block').fadeOut(function(){
				clearInterval(timer);
				$(this).remove();
			});
		});
	}

	function tabsify() {
		$('body').on('click', '.tabs li', function(e){

			e.preventDefault();
			var tab_id = $(this).attr('data-tab');
			// console.log(tab_id)

			$('.tabs li').removeClass('current');
			$('.tabs-inner').removeClass('current');

			$(this).addClass('current');
			$("#"+tab_id).addClass('current');
		})
	}

	function repair_sticky($el) {

		console.log(OBR);
		$.getScript('http://widgets.outbrain.com/outbrain.js');

		(function()  {
			var reset_scroll;

			$(function() {
			  return $("[data-sticky_column]").stick_in_parent({
			    parent: "[data-sticky_parent]"
			  });
			});

			reset_scroll = function() {
			  var scroller;
			  scroller = $("body,html");
			  scroller.stop(true);
			  if ($(window).scrollTop() !== 0) {
			    scroller.animate({
			      scrollTop: 0
			    }, "fast");
			  }
			  return scroller;
			};

			window.scroll_it = function() {
			  var max;
			  max = $(document).height() - $(window).height();
			  return reset_scroll().animate({
			    scrollTop: max
			  }, max * 3).delay(100).animate({
			    scrollTop: 0
			  }, max * 3);
			};

			window.scroll_it_wobble = function() {
			  var max, third;
			  max = $(document).height() - $(window).height();
			  third = Math.floor(max / 3);
			  return reset_scroll().animate({
			    scrollTop: third * 2
			  }, max * 3).delay(100).animate({
			    scrollTop: third
			  }, max * 3).delay(100).animate({
			    scrollTop: max
			  }, max * 3).delay(100).animate({
			    scrollTop: 0
			  }, max * 3);
			};

			$(window).on("resize", (function(_this) {
			  return function(e) {
			    return $(document.body).trigger("sticky_kit:recalc");
			  };
			})(this));

		})();


	}


	// INITIALIZER
	function init() {
		data_load();
		tickerfy();
		ticker_hoverfy();
		ticker_closefy();
		tabsify();
	}

	return {
		init:init
	};
}(jQuery));
jQuery(document).ready(function($) { NEWS.init(); });