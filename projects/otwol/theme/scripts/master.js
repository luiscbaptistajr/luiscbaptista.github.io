/**!
 * ON THE WINGS OF LOVE
 * ABS-CBN Corporation 2015
 */

// GLOBAL VARIABLE FOR PAGINATION
var pages 	= {
	indexCover: 0, 
	oneCover: 1, 
	twoBehind: 2, 
	threeBehind: 3, 
	fourInside: 4, 
	fiveInside: 5, 
	sixJoin: 6, 
	sevenJoin: 7, 
	eightPassport: 8,
	ninePassport: 9,
	tenLeaderboard: 10,
	elevenLeaderboard: 11,
	twelveMech: 12,
	thirtenMech: 13,
	fiftenTalk: 15,
	sixtenTalk: 16 };

var loc = document.location;

(function($) {

	$.QueryString = (function(a) {
		if (a === "") return {};
		var b = {};
		for (var i = 0; i < a.length; ++i)
		{
			var p=a[i].split('=');
			if (p.length !== 2) continue;
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	})(window.location.search.substr(1).split('&'));

	var LIGHTBOX = (function(){

		$('.show-lb, #link-mechanics, .pinstyle').on('click',function(e){
			e.preventDefault();
			var windowHeight 	= $(window).height();

			var data_src 		= $(this).attr("href"),
            	data_mech       = $('.mechanics-wrapper').html(),
	        	data_text 		= $(this).attr("data-text"),
	        	data_alt		= $(this).attr("alt"),
	        	img_html		= $('<img src="' + data_src + '" alt="'+ data_alt +'" />'),
	        	vid_html		= $('<iframe src="'+ data_src +'" frameborder="0" allowfullscreen></iframe>');


    		var img_lightbox = '<div id="popbox" class="lb-otwol">' +
	          	'<div class="back-overlay"><p class="lightbox-close">x</p></div>' +
	          	'<div class="content">' +
	          		'<div class="main-image">'+
	          			'<img src="' + data_src + '" alt="'+ data_alt +'" />' + 
	          			'<p class="caption-wrapper">'+ data_text +'</p>' +
	          		'</div>' +
	          		'<div class="details">' +
	          			'<div class="profile">' +
	          				'<img src="theme/images/profile_leah-50x50.jpg" alt="Profile Name" />' + 
	          				'<span class="name">Charlen Pascual</span>' +
	          			'</div>' +
	          			'<p class="social-wrapper">' +
	          				'<span>' +
	          					'<a href="" class="star-icon"></a>' +
	          					'<small class="star-count">30</small>' +
	          				'</span>' +
	          				'<a href="#facebook" id="share-fb">Facebook</a>' +
	          			'</p>' +
	          			'<div class="comments-box">'+
	          				'<h2 id="title-comments">Comments</h2>' +
	          				'<div class="fb-comments" data-href="http://developers.facebook.com/docs/plugins/comments/" data-width="492" data-numposts="5"></div>' +
	          			'</div>' +
	          		'</div>' +	
	          	'</div>' +
	        '</div>';

	        var vid_lightbox ='<div id="popbox" class="lb-otwol">' +
		      	'<div class="back-overlay"><p class="lightbox-close">x</p></div>' +
		      	'<div class="content">' +
		      		'<div class="behind-vid">' +
		      			'<iframe class="main-video" src="'+ data_src +'" frameborder="0" allowfullscreen></iframe>' +
		      		'</div>' +
		      		'<div class="details vid">' +
		      			'<div class="profile">' +
		      				'<img src="theme/images/profile_leah-50x50.jpg" alt="Profile Name" />' + 
		      				'<span class="name">Charlen Pascual</span>' +
		      				'<p class="caption-wrapper">'+ data_text +'</p>' +
		      			'</div>' +
		      			'<p class="social-wrapper">' +
		      				'<span>' +
		      					'<a href="" class="star-icon"></a>' +
		      					'<small class="star-count">30</small>' +
		      				'</span>' +
		      				'<a href="#facebook" id="share-fb">Facebook</a>' +
		      			'</p>' +
		      			'<div class="comments-box">'+
		      				'<h2 id="title-comments">Comments</h2>' +
		      				'<div class="fb-comments" data-href="http://developers.facebook.com/docs/plugins/comments/" data-width="492" data-numposts="5"></div>' +
		      			'</div>' +
		      		'</div>' +
		      	'</div>' +
		    '</div>';

            var mech_lightbox = '<div id="popbox" class="lb-otwol">' +
                '<div class="back-overlay">' +
                    '<p class="lightbox-close">x</p>' +                 
                '</div>' +
                '<div class="content"><div class="mechanics-wrapper">' + data_mech + '</div></div>' +
            '</div>';

            // var entry_sent = '<div id="popbox" class="lb-otwol">' +
            //     '<div class="back-overlay">' +
            //         '<p class="lightbox-close">x</p>' +                 
            //     '</div>' +
            //     '<div class="content copy-wrapper">' +
            //     	'<div class="entry-sent">' + 
            //     		'<span class="brand-left"></span>' + 
            //     		'<p class="entry-copy"><strong>Approved!</strong><br/>Nagawa mo ang OTWOLista challenge of the day!<br/> Pwede mo na itong i-view sa OTWOLista gallery.<br/>Share mo na!</p>' + 
            //     		'<span class="brand-right"></span>' +
            //     	'</div>' + 
            //     '</div>' +
            // '</div>';

            // var new_arrive = '<div id="popbox" class="lb-otwol">' +
            //     '<div class="back-overlay">' +
            //         '<p class="lightbox-close">x</p>' +                 
            //     '</div>' +
            //     '<div class="content copy-wrapper new-arrive">' +
            //     	'<div class="alert">' + 
            //     		'<img class="icon-plane" src="theme/images/img-airplane.jpg" alt="New Arrived!" />' + 
            //     		'<p class="entry-copy">You have arrived! <br /><br />Welcome sa official page para sa mga <br />solid On the Wings of Love fan. <br /><br />Game ka na bang patunayan na <br />isa kang Certified OTWOLista?</p>' + 
            //     		'<a href="" class="goto-account"></a>'
            //     	'</div>' + 
            //     '</div>' +
            // '</div>';

            // LIGHTBOX FOR EARN STAMP

            var earn_stamp = '<div id="popbox" class="lb-otwol">' +
                '<div class="back-overlay">' +
                    '<p class="lightbox-close">x</p>' +                 
                '</div>' +
                '<div class="content copy-wrapper earn_stamp_wrapper">' +
                	'<div class="earn_stamp all-stamp">' + 
                		'<h3 class="earn-expression">Naks! You earned a stamp!</h3>' +
                		'<img class="icon-heart" src="theme/images/icon-flyinf-heart.jpg" alt="" />' +
                		'<img class="earn-image" src="theme/images/badges/06tnt.png" alt="" />' +
                		'<div class="copy-wrapper">' +
                			'<p class="earn-title">TNT</p>' +
                			'<p class="earn-text">True na true na ang pagka-hook mo sa On the Wings of Love.</p>' +
                			'<p class="earn-text">Ito na ang start ng journey mo ng pagiging certified OTWOLista!</p>' +
                			'<p class="earn-text earn-share">share mo na!</p>' +
                			'<p><a href="#share-fb" class="share-fb">Share-fb</a></p>' +
                		'</div>' +
                	'</div>' + 
                '</div>' +
            '</div>';

            // LIGHTBOX FOR APPROVE

            // var earn_stamp = '<div id="popbox" class="lb-otwol">' +
            //     '<div class="back-overlay">' +
            //         '<p class="lightbox-close">x</p>' +                 
            //     '</div>' +
            //     '<div class="content copy-wrapper earn_stamp_wrapper">' +
            //     	'<div class="earn_stamp approve error-asset">' + 
            //     		'<p class="entry-title">Approved</p>' +
            //     		'<p class="copy-wrapper">Nagawa mo ang OTWOLista challenge of the day!</p>' +
            //     		'<p class="copy-wrapper">You\'ve earned 250 additional points.</p>' +
            //     		'<p class="copy-wrapper">Share mo na!</p>' +
            //     		'<p><a href="#share-fb" class="share-fb">Share-fb</a></p>' +
            //     	'</div>' + 
            //     '</div>' +
            // '</div>';

            // LIGHTBOX FOR MULTIPLE UPLOAD

            // var earn_stamp = '<div id="popbox" class="lb-otwol">' +
            //     '<div class="back-overlay">' +
            //         '<p class="lightbox-close">x</p>' +                 
            //     '</div>' +
            //     '<div class="content copy-wrapper earn_stamp_wrapper">' +
            //     '<div class="earn_stamp error error-asset">' + 
            //     		'<p class="entry-title">Oops!</p>' +
            //     		'<p class="copy-wrapper">Nakapag-submit ka na <br />ng iyong OTWOLista challenge for the day.</p>' +
            //     		'<p class="copy-wrapper">HUWAG MAG-JIGS MODE. <br />Bukas naman ulit.</p>' +
            //     	'</div>' + 
            //     '</div>' +
            // '</div>';

            // LIGHTBOX FOR MORE 2MB FILE SIZE

            // var earn_stamp = '<div id="popbox" class="lb-otwol">' +
            //     '<div class="back-overlay">' +
            //         '<p class="lightbox-close">x</p>' +                 
            //     '</div>' +
            //     '<div class="content copy-wrapper earn_stamp_wrapper">' +
            //     	'<div class="earn_stamp filesize error-asset">' +
    		    		// '<p class="entry-title">"Hindi lahat <br />nadadaanan sa <br />unang subok."</p>' +
    		    		// '<p class="copy-wrapper">Please check your file size and <br />format and submit again!</p>' +
            //     	'</div>' + 
            //     '</div>' +
            // '</div>';

            // LIGHTBOX FOR ERROR LOAD

            // var earn_stamp = '<div id="popbox" class="lb-otwol">' +
            //     '<div class="back-overlay">' +
            //         '<p class="lightbox-close">x</p>' +                 
            //     '</div>' +
            //     '<div class="content copy-wrapper earn_stamp_wrapper">' +
            //     	'<div class="earn_stamp error-load error-asset">' +
            //     		'<p class="entry-title">"Kung mahal ka, <br />babalikan ka."</p>' +
            //     		'<p class="copy-wrapper">Babalikan ka namin, may error lang. <br />Please try refreshing the page.</p>' +
            //     	'</div>' + 
            //     '</div>' +
            // '</div>';


            // LIGHTBOX FOR BONUS POINTS

            var get_bonus = '<div id="popbox" class="lb-otwol">' +
                '<div class="back-overlay">' +
                    '<p class="lightbox-close">x</p>' +                 
                '</div>' +
                '<div class="content copy-wrapper earn_stamp_wrapper">' +
                	'<div class="earn_stamp bonus-content error-asset">' +
                		'<p class="entry-title">Bonus Points from ABS-CBN Store!</p>' +
                		'<p class="copy-wrapper">Get a special code when you buy OTWOLista Merchandise worth P500 and up! <br />Just input the code below, click submit & instantly see it on your passport.</p>' +
            			'<form action="" class="form-bonus">' +
            				'<input type="text" />' +
            				'<input type="submit" value="">' +
            			'</form>' +
                	'</div>' + 
                '</div>' +
            '</div>';


			// TO CHECK IF THE LIGHTBOX
			if($(this).hasClass('image')) {
				$('body').append($(img_lightbox));
			} else if($(this).hasClass('video')) { 
                $('body').append($(vid_lightbox));
            } else if($(this).hasClass('link-mechanics')) {
				$('body').append($(mech_lightbox));
			} else if ($(this).hasClass('entry-sent')) {
				// $('body').append($(entry_sent));
				// $('body').append($(new_arrive));
				$('body').append($(earn_stamp));
			} else if ($(this).hasClass('get-bonus')) {
				$('body').append($(get_bonus));
			} else {
				return false;
			}

			// FADEIN LIGHTBOX
			if ($(window).width() <= 640) {
				$('#popbox').show();
			} else {
				$('#popbox').fadeIn(function(){
					var pop_height 		= $('#popbox .content').outerHeight(),
						pop_width		= $('#popbox .content').width(),
						left_side		= Math.ceil(($(window).width() - pop_width) / 2),
						btn_close_pos	= pop_width + left_side,
						pop_top			= (windowHeight - pop_height) / 2,
						img_height		= $('.main-image img').height() - 20,
						vid_height		= $('.main-video').height() - 20;

					console.log(pop_width, $(window).width(), left_side);
					
					$('body').css({'overflow':'hidden'});
					$('#popbox .lightbox-close').css({'left': btn_close_pos + 10});

				  	if(windowHeight > pop_height) {
			  		  	$('#popbox .content, #popbox .lightbox-close').animate({ "top": "+=" + pop_top + "px" }, 600).delay(400);
				  	} else {
				  		$('#popbox .content, #popbox .lightbox-close').show();
				  	}

			  		$('#popbox .details').css({'height':img_height, 'overflow-y': 'auto'});
			  		$('#popbox .vid').css({'height':vid_height, 'overflow-y': 'auto'});
				});	
			}
			
			$('.lightbox-close, .back-overlay, .link-close').click(function(e) {
				e.preventDefault();
			    closeBox();
			});

		});

		function closeBox() {
			$('#popbox').fadeOut(function(){
				$('body').css({'overflow-y':'scroll'});
				$('#popbox').animate({ "top": "0" }, 900).delay(400);
				$(this).remove();
			});
		}

		
	}());

	var PACK = (function(){
		'use strict';

		// init Masonry
        var $grid = $('.item-block').masonry({
	        // options...
        });
        
        // layout Masonry after each image loads
        $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
        });

	}());

	var SUBSTRINGS = (function(){
		var $substring300 = $('body').find('text-substring-300'),
			$substring150 = $('body').find('.text-substring-150'),
			$substring15 = $('body').find('text-substring-50');
		
		$($substring300).each(function(){
			if($(this).text().length > 300){
				$(this).text($(this).text().substring(0, 300) + "...");
			};
		});

		$($substring150).each(function(){
			if($(this).text().length > 180){
				$(this).text($(this).text().substring(0, 180) + "...");
			};
		});

		
	}());

	var UPLOADPHOTO = (function(){
		$('#photo-file').change( function(e) {
			var img = URL.createObjectURL(e.target.files[0]);
	        var getFile = $(this).val().replace(/C:\\fakepath\\/i, '');

	        if($('#photo-file').val() != '') {
	        	$('#photo-text').attr('placeholder', getFile);
	        	$('.photo-holder').attr('src', img);
	        } else {
	        	$('.photo-holder').attr('src', 'theme/images/photo-default.jpg');
	        	$('#photo-text').attr('placeholder', 'Add Photo');
	        }
	    });
	}());

	var UPLOADVIDEO = (function() {
		var urlRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
			url = '';

		$('.video-holder').append($('<img src="theme/images/video-default.jpg" alt="Dafault Video" />'));

		$("#video-text").keyup(function(event) {
			console.log("hello");
			$('.video-holder').empty();
			// Check for empty input field
	        if($('#video-text').val() != ''){
	            // Get youtube video's thumbnail url
	            url = $('#video-text').val();
	            // Get the  url and match the regex to get the youtube url id
	            var videoid = url.match(urlRegex);
	            
	            if (videoid&&videoid[7].length==11){
                    // return and append this image to <div id="thumbs">
                    $('.video-holder').append($('<iframe width="88" height="71" src="https://www.youtube.com/embed/'+videoid[7]+'?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=0" frameborder="0" allowfullscreen="false" frameborder="0"></iframe>'));
                    // console.log($('thumbs').length);
                }
	        } else {
	        	$('.video-holder').append($('<img src="theme/images/video-default.jpg" alt="Dafault Video" />'));
	        }
		});
	}());

	var CHARCOUNT = (function(){
		var input = $('textarea#text-answer'),
	        count = $('.char-count').text(input.val().length),
	        max = 250;

	    input.keydown(function(e) {
			if(e.which < 0x20) {
				return;
			}
			if(input.val().length == max) {
				e.preventDefault();

			} 
			else if (input.val().length > max) {
				input.val() = input.val().substring(0, max);
			}
	    });

	    input.keyup(function(){
	    	count.text(input.val().length);
	    });
	}());

    var TURN = (function(){
        'use strict';

        // INITIALIZATION
        function init() {
			loadApp();
        }

     	function loadApp() {

     		var flipbook = $('.flipbook');
 
     	 	// Check if the CSS was already loaded
     		if (flipbook.width()===0 || flipbook.height()===0) {
     			setTimeout(loadApp, 10);
     			return;
     		}

     		$('.flipbook .double').scissor();

     		// Create the flipbook
     		$('.flipbook').turn({
     			width: 1024,
     			height: 707,
     			// Elevation
     			elevation: 400,
     			// Enable gradients
     			gradients: true,
     			// Auto center this flipbook
     			autoCenter: false,
     			// Query page number
     			page: $.QueryString["page"]
     		});

     		$("#behind").on('click', function(e){
     			e.preventDefault();
     			$(".flipbook").turn("page", pages.threeBehind);
     			$('.menu-item').children().removeClass('active');
     			$(this).addClass('active');
     			return false;	
     		});

     		$("#inside").on('click', function(e, page, view){
     			e.preventDefault();
     			$(".flipbook").turn("page", pages.fiveInside);
     			$('.menu-item').children().removeClass('active');
     			$(this).addClass('active');
     			return false;
     		});

     		$("#join").on('click', function(e){
     			e.preventDefault();
     			$(".flipbook").turn("page", pages.sevenJoin);
     			$('.menu-item').children().removeClass('active');
     			$(this).addClass('active');
     			return false;
     		});

     		$("#passport").on('click', function(e){
     			e.preventDefault();
     			$(".flipbook").turn("page", pages.ninePassport);
     			$('.menu-item').children().removeClass('active');
     			$(this).addClass('active');
     			return false;
     		});

			$("#leaderboard").on('click', function(e){
				e.preventDefault();
				$(".flipbook").turn("page", pages.elevenLeaderboard);
				$('.menu-item').children().removeClass('active');
				$(this).addClass('active');
				return false;
			});

			$("#passport").on('click', function(e){
				e.preventDefault();
				$(".flipbook").turn("page", pages.ninePassport);
				$('.menu-item').children().removeClass('active');
				$(this).addClass('active');
				return false;
			});

			$("#mechanics").on('click', function(e){
				e.preventDefault();
				$(".flipbook").turn("page", pages.thirtenMech);
				$('.menu-item').children().removeClass('active');
				$(this).addClass('active');
				return false;
			});  

			$("#otwolistalk").on('click', function(e){
				e.preventDefault();
				$(".flipbook").turn("page", pages.sixtenTalk);
				$('.menu-item').children().removeClass('active');
				$(this).addClass('active');
				return false;
			});  

     		$(".flipbook").bind("turned", function(event, page, view) {
     			history.pushState({}, '', loc.pathname + '?page=' + page);
     			$.each(pages, function(i, val){
     				if (page === pages.indexCover || page === pages.oneCover) {
     					$('.menu-item').children().removeClass('active');
     				} else if(page === pages.twoBehind || page === pages.threeBehind) {
	     				$('.menu-item').children().removeClass('active');
	     				$('#behind').addClass('active');
	     			} else if(page === pages.fourInside || page === pages.fiveInside) {
	     				$('.menu-item').children().removeClass('active');
	     				$('#inside').addClass('active');
	     			} else if (page === pages.sixJoin || page === pages.sevenJoin) {
	     				$('.menu-item').children().removeClass('active');
	     				$('#join').addClass('active');
	     			} else if (page === pages.eightPassport || page === pages.ninePassport) {
	     				$('.menu-item').children().removeClass('active');
	     				$('#passport').addClass('active');
	     			} else if (page === pages.tenLeaderboard || page === pages.elevenLeaderboard) {
	     				$('.menu-item').children().removeClass('active');
	     				$('#leaderboard').addClass('active');
	     			} else if (page === pages.twelveMech || page === pages.thirtenMech) {
	     				$('.menu-item').children().removeClass('active');
	     				$('#mechanics').addClass('active');
	     			} else if (page === pages.fiftenTalk || page === pages.sixtenTalk) {
	     				$('.menu-item').children().removeClass('active');
	     				$('#otwolistalk').addClass('active');
	     			} 
     			}); 

     		}); 
            $("nav.pagination .next").on('click', function(e){
                e.preventDefault();
                $(".flipbook").turn("next");
                return false; 
            });
            $("nav.pagination .previous").on('click', function(e){
                e.preventDefault();
                $(".flipbook").turn("previous");
                return false;
            });

            $('.drawer-section-title').click(function(e) {
                // Grab current anchor value
                var currentAttrValue = $(this).attr('href');
                console.log(currentAttrValue);
         
                if($(e.target).is('.active')) {
                    close_drawer_section();
                }else {
                    close_drawer_section();
                    // Add active class to section title
                    $(this).addClass('active');
                    $('.drawer ' + currentAttrValue).siblings('.active').children('.sprite').addClass('active');
                    // Open up the hidden content panel
                    $('.drawer ' + currentAttrValue).slideDown(300).addClass('open'); 
                }
         
                e.preventDefault();
            });

            function close_drawer_section() {
                $('.drawer .drawer-section-title').removeClass('active');
                $('.drawer .drawer-section-title .sprite').removeClass('active');
                $('.drawer .drawer-section-content').slideUp(300).removeClass('open');
            }

			$(window).bind('keydown', function(e){
				// listen for arrow keys
				if (e.keyCode == 37){
					$(".flipbook").turn('previous');
				}
				else if (e.keyCode==39){
					$(".flipbook").turn('next');
				}
			});

        }

        // Load the HTML4 version if there's not CSS transform
        yepnope({
            test : Modernizr.csstransforms,
            yep: ['theme/scripts/lib/turn.min.js'],
            nope: ['theme/scripts/lib/turn.html4.min.js'],
            both: ['theme/scripts/lib/scissor.min.js', 'theme/styles/demo.css'],
            complete: loadApp
        });

        return {
            init:init
        };
        
    }());

	if ($("body").hasClass("mobile")) {
        return false;
    } else { //if desktop
        TURN;
    } 
})(jQuery);