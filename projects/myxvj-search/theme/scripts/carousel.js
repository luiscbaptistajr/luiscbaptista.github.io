(function($) {

	var get_ul = $('.carousel-photo ul'),
		get_list = $(get_ul).find('li'),
		smallImages = $(get_list).find('a'),
		imageHover = $('.photo-holder'),
		numOfPages = $(get_list).size(),
		navNext = $('.navigate-me .nav-next'),
		navPrev = $('.navigate-me .nav-prev'),
		animating = false,
		item_width,
		getItemFirst,
		getItemLast,
		viewCount,
		imageSelected;

	var getListLength = get_list.size();

	if (getListLength <= 5) {
		get_ul.css({'width':'620px','left':0});
		get_ul.find('li:last').css({'margin-right': 0});
		$('.carousel-photo .navigate-me p').css({'margin':0,'float':'right'})
		navNext.hide();
		navPrev.hide();
	} else {
		$('.carousel-photo ul li:first').before($('.carousel-photo ul li:last'));
	}

	//go to function alter image
	$(smallImages).click(alterImage);

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

	/* GENERATE AUTO DATA ATTRIBUTE FOR EACH LIST */
	$(get_list).each(function(i){
		$(this).attr('data-count', i + 1);
		imageSelected = $('.carousel-photo ul li.selected').data('count');
		$('.count').text(imageSelected);
	});

	function selectNext() {

		var $imageSelected = $('.carousel-photo ul li.selected');

		animating = true;

		if($imageSelected.length == 0) $imageSelected = $('.carousel-photo ul li:last');

		var	$nextSelected = $imageSelected.next().length ? $imageSelected.next() : $('.carousel-photo ul li:first'),
			getNextPage = $imageSelected.next().data('count');

		
		var	getImg = $nextSelected.find('a'),
			getSrc = getImg.attr('href'),
			item_width = $('.carousel-photo ul li').outerWidth() + 7,
			left_indent = parseInt($('.carousel-photo ul').css('left')) - item_width;
			
		$('.count').text(getNextPage);

		$nextSelected.addClass('selected');
		$imageSelected.removeClass('selected');

		$('#main-photo').attr({src:getSrc});

		$('.carousel-photo ul:not(:animated)').animate({'left' : left_indent},500,function(){  
            //get the first list item and put it after the last list item (that's how the infinite effects is made) '  
            $('.carousel-photo ul li:last').after($('.carousel-photo ul li:first'));  

            //and get the left indent to the default -125px  
            $('.carousel-photo ul').css({'left' : '-125px'});

            animating = false;

        });


		return false;

	}

	function selectPrev() {

		var $imageSelected = $('.carousel-photo ul li.selected');
		var $prevSelected = $imageSelected.prev();

		animating = true;

		if($imageSelected.length == 0) $imageSelected = $('.carousel-photo ul li:last');

		var	$nextSelected = $imageSelected.next().length ? $imageSelected.next() : $('.carousel-photo ul li:first'),
			getPrevPage = $prevSelected.data('count');

		$('.count').text(getPrevPage);

		var	getImg = $prevSelected.find('a'),
			getSrc = getImg.attr('href'),
			getLink = getImg.data("link"),
			getAlt = getImg.attr("alt"),
			item_width = $('.carousel-photo ul li').outerWidth() + 7,
			left_indent = parseInt($('.carousel-photo ul').css('left')) + item_width;		
			

		$prevSelected.addClass('selected');
		$imageSelected.removeClass('selected');


		$('#main-photo').attr({src:getSrc});

		$('.carousel-photo ul:not(:animated)').animate({'left' : left_indent},500,function(){  
            //get the first list item and put it after the last list item (that's how the infinite effects is made) '  
            $('.carousel-photo ul li:first').before($('.carousel-photo ul li:last'));  

            //and get the left indent to the default -125px  
            $('.carousel-photo ul').css({'left' : '-125px'});  

            animating = false;
        });	

		return false;

	}
		
	function alterImage() {
		
		var mainSource = $(this).attr("href"),
			getCurrentPage = $(this).parent().data('count');

		$("#main-photo").attr({ src: mainSource });
		$(this).parent().addClass("selected").siblings().removeClass('selected');
		
		$('.count').text(getCurrentPage);

		return false;
	}

	//change the total number of thumbnails
	$('.total-thumbs').text(numOfPages);

})(jQuery);