// Easing
jQuery.extend(jQuery.easing, {

  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },

});
(function ($) {

	var ticker, sticky;

	// Ticker
	ticker = (function () {

	  var timer, first, delay;

	  function tickerThem(el) {

	    resetTicker();

	    delay = 4000;

	    timer = setInterval(function () {

	      first = $('ul', el).children('li').eq(0);

	      first.animate({
	        marginTop: -(18)
	      }, 300, 'easeInBack', function () {
	        first.detach().css('marginTop', '0').appendTo($('ul', el));
	      });


	    }, delay);

	    $('ul', el).unbind('mouseenter mouseleave').hover(function () {
	      clearInterval(timer);
	    }, function () {
	      tickerThem(el);
	    });

	  }

	  function resetTicker() {
	    clearInterval(timer);
	  }

	  return {
	    roll: tickerThem
	  };

	}());

	sticky = (function (){
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

	}());

	// Start Breaking News ticker
	if ($('#project_tagline').length !== 0) {
		ticker.roll('#project_tagline');
	}

	if ($('#project_tagline_mobile').length != 0) {
		ticker.roll('#project_tagline_mobile');
	}
}(jQuery));