(function($) {

	var get_ul = $('.carousel-video .vid-thumbnails'),
		get_list = $(get_ul).find('figure'),
		smallImages = $(get_list).find('a'),
		navNext = $('.vid-next'),
		navPrev = $('.vid-prev'),
		animating = false,
		item_width,
		getItemFirst,
		getItemLast,
		viewCount,
		imageSelected,
		getVidPlayer = null;

	var getFigLength = get_list.size();

	if (getFigLength <= 2) {
		get_ul.css({'width':'620px','left':0});
		navNext.remove();
		navPrev.remove();
	} else {
		$('.carousel-video .vid-thumbnails figure:first').before($('.carousel-video .vid-thumbnails figure:last'));
	}

	$('.carousel-video').show();

	$('.hide-thumbs').click(function(){
		$('.vid-thumbnails,.vid-next,.vid-prev').slideToggle('fast', function(){
			$('.hide-thumbs').text($(this).is(':visible') ? 'HIDE THUMBNAILS':'SHOW THUMBNAILS');
		});

	});

	//go to function alter image
	$(smallImages).click(alterImage);

	console.log(getFigLength);

	$(navNext).click(function(){
		
		if(!animating) {
			selectNext();	
		}

		return false;

	});

	$(navPrev).click(function() {

		if(!animating) {
			selectPrev();	
		} 

		return false;

	});
	
	function selectNext() {

		console.log(smallImages.length);

		var $imageSelected = $('.carousel-video .vid-thumbnails figure.selected');

		animating = true;

		if($imageSelected.length == 0) $imageSelected = $('.carousel-video .vid-thumbnails figure:last');

		var	$nextSelected = $imageSelected.next().length ? $imageSelected.next() : $('.carousel-video .vid-thumbnails figure:first');

		
		var	item_width = $('.carousel-video .vid-thumbnails figure').outerWidth(),
			left_indent = parseInt($('.carousel-video .vid-thumbnails').css('left')) - item_width;
			
		$nextSelected.addClass('selected');
		$imageSelected.removeClass('selected');

		$('.carousel-video .vid-thumbnails:not(:animated)').animate({'left' : left_indent},500,function(){  
            //get the first list item and put it after the last list item (that's how the infinite effects is made) '  
            $('.carousel-video .vid-thumbnails figure:last').after($('.carousel-video .vid-thumbnails figure:first'));  

            //and get the left indent to the default -125px  
            $('.carousel-video .vid-thumbnails').css({'left' : '-265px'});

            animating = false;

        });


		return false;

	}

	function selectPrev() {

		var $imageSelected = $('.carousel-video .vid-thumbnails figure.selected');
		var $prevSelected = $imageSelected.prev();

		animating = true;

		if($imageSelected.length == 0) $imageSelected = $('.carousel-video .vid-thumbnails figure:last');

		var	$nextSelected = $imageSelected.next().length ? $imageSelected.next() : $('.carousel-video .vid-thumbnails figure:first');

		var	item_width = $('.carousel-photo ul li').outerWidth(),
			left_indent = parseInt($('.carousel-photo ul').css('left')) + item_width;		
			

		$prevSelected.addClass('selected');
		$imageSelected.removeClass('selected');

		$('.carousel-video .vid-thumbnails:not(:animated)').animate({'left' : left_indent},500,function(){  
            //get the first list item and put it after the last list item (that's how the infinite effects is made) '  
            $('.carousel-video .vid-thumbnails figure:first').before($('.carousel-video .vid-thumbnails figure:last'));  

            //and get the left indent to the default -125px  
            $('.carousel-video .vid-thumbnails').css({'left' : '-265px'});  

            animating = false;
        });	

		return false;

	}
	
	getVidPlayer = $('#main-video object.BrightcoveExperience');
	
		
	function alterImage() {
		
		var mainSource = $(this).attr("href");

		$('#main-video object.BrightcoveExperience').remove();

		getVidPlayer.find('param[name*=videoPlayer]').attr({ value: mainSource })
		getVidPlayer.prependTo($('#main-video'));
		brightcove.createExperiences();
		$(this).parent().addClass("selected").siblings().removeClass('selected');

		return false;
	}

})(jQuery);