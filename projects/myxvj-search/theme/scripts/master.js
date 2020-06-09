/******	
================================================
 TWITTER SCRIPT
================================================
*******/
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

/******	
================================================
 FACEBOOK SCRIPT
================================================
*******/

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=277888872362871";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function ($) {

	/******	
	================================================
	 GET DATA USING AJAX
	================================================
	*******/

	var pageData,
		data, 
		dataLength,
		startIndex = 0,
		endIndex = 0;

	detectPage();

	function detectPage() {
		if ($('body').attr('id') == 'update'){
			//console.log('update');
			endIndex = 3;
			getContent('theme/data/updates-data.json');
		}else if ($('body').attr('id') == 'auditions'){
			//console.log('auditions');
			endIndex = 7;
			getContent('theme/data/auditions-data.json');
		}else if ($('body').attr('id') == 'episodes'){
			//console.log('episodes');
			endIndex = 5;
			getContent('theme/data/episodes-data.json');
		}else{
			return false;
		}
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
				// console.log('success');
				//console.log(pageData.length);
				dataLength = pageData.length;

				if(dataLength < endIndex){
					endIndex = dataLength - 1;
				}

				dataLoadSlice(startIndex, endIndex);
			},
			error: function(e)
			{
			   	//console.log('error');
			}
			
		});
	}

	/* SLICE DATA */
	function dataLoadSlice(start, end){
		var i;
		for (i = start; i <= end; i++) {

			if ($('body').attr('id') == 'update') {
				thisHTML = '<figure class="figure-620-horizontal"><a class="fig-img-horizontal" href="'+ pageData[i].data_url +'"><img src="'+ pageData[i].data_image +'" alt="'+ pageData[i].data_alt +'"></a><figcaption><h1><a href="'+ pageData[i].data_url +'" class="text-color--b">'+ pageData[i].data_title +'</h1></a><small class="small-12 text-color--e">'+ pageData[i].data_date +'&nbsp;|&nbsp;</small><small class="text-color--e small-12 file-type">'+ pageData[i].file_type+'</small><p class="text-color--f text-el-14">'+ pageData[i].data_caption +'</p></figcaption></figure>';
			} else {
				thisHTML = '<figure class="figure-300-vertical auditions-thumbs"><a href="'+ pageData[i].data_url +'"><img src="'+ pageData[i].data_image +'" alt="'+ pageData[i].data_alt +'"></a><figcaption><h1><a href="'+ pageData[i].data_url +'" class="text-color--b text-substring-60">'+ pageData[i].data_title +'</a></h1><small class="small-12 text-color--e">'+ pageData[i].data_date +'&nbsp;|&nbsp;</small><small class="text-color--e small-12 file-type">'+ pageData[i].file_type+'</small></figcaption></figure>';
			}

			$('.container-gallery').append(thisHTML);
			thisArticle = $('.container-gallery figure').eq(i);

		}
	}

	$('.load-more').click(function(){
		var numArticleLength = $('.container-gallery').find('figure').length;
		if (numArticleLength == dataLength) {
			return false;
		}else {
			if ($('body').attr('id') == 'auditions'){
				//console.log('auditions');
				var getLoad = 6;
			}
			if ($('body').attr('id') == 'episodes'){
				//console.log('episodes');
				var getLoad = 4;
			}
			if ($('body').attr('id') == 'update'){
				//console.log('episodes');
				var getLoad = 5;
			}
			startIndex = endIndex + 1;
			endIndex = endIndex + getLoad;
			if (endIndex > dataLength){
				endIndex = dataLength - 1;
			}
			dataLoadSlice(startIndex, endIndex);
		}
	});


	/******	
	================================================
	 PROFILE SUB MENU
	================================================
	*******/

	$(".nav-sub").hover(function () {
	    $(".sub-profiles").stop().slideDown("fast");
	}, function() {
	    $(".sub-profiles").stop().slideUp("fast");
	});

	/* WHEN USER CLICK THE 'X' BUTTON THE FORM WILL CLOSE */
	$('.header-ads-close').click(function(){
		close_box(); // CALL THE CLOSE_BOX() FUNCTION
	});

	/******	
	================================================
	 WHEN CLOSE_BOX HAS BEEN CALLED
	================================================
	*******/

	function close_box()
	{
		$('.leader-board').animate({'opacity':'0'}, 300, 'linear', function(){
			$(this).css('display', 'none');
		});

	}

	$('.top-12 a').hover(function(){
		$(this).find('.prof-wrapper')
			.toggle("fade")
			.stop(true, true);
	}, function() {
		$(this).find('.prof-wrapper')
			.toggle("fade")
			.stop(true, true);
			
	});


	/******	
	================================================
	 SOCIAL NETWORKING TAB
	================================================
	*******/

	$('ul.tabs').each(function(){
	  // For each set of tabs, we want to keep track of
	  // which tab is active and it's associated content
	  var $active, $content, $links = $(this).find('a');

	  // If the location.hash matches one of the links, use that as the active tab.
	  // If no match is found, use the first link as the initial active tab.
	  $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
	  $active.addClass('active');
	  $content = $($active.attr('href'));

	  // Hide the remaining content
	  $links.not($active).each(function () {
	    $($(this).attr('href')).hide();
	  });

	  // Bind the click event handler
	  $(this).on('click', 'a', function(e){
	    // Make the old tab inactive.
	    $active.removeClass('active');
	    $content.hide();

	    // Update the variables with the new link and content
	    $active = $(this);
	    $content = $($(this).attr('href'));

	    // Make the tab active.
	    $active.addClass('active');
	    $content.show();

	    // Prevent the anchor's default click action
	    e.preventDefault();
	  });
	});

 	/* =============================================================================
	                             SUBSTRING TEXT
	========================================================================== */

 	//SUBSTRING TITLES TO 60 CHARACTERS
	var $substring50 = $('body').find('.text-substring-60');
	$($substring50).each(function(){
		if($(this).text().length > 60){
			$(this).text($(this).text().substring(0, 60) + "...");
		};
	});

	//END SUBTRING 


}(jQuery));