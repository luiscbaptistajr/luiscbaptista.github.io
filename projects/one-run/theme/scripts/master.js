$(function(){

	/* REGISTRATION FORM FUNCTION */
 
	$('.register-now').click(function(){
		$('.back-box, .lightbox-wrapper').animate({'opacity':'.50'}, 300, 'linear');
		$('.lightbox-wrapper').animate({'opacity':'1.00'}, 300, 'linear');
		$('.back-box, .lightbox-wrapper').css('display', 'block');
	});

	/* FORM CLOSE FUNCTION */

	/* WHEN USER CLICK THE 'X' BUTTON THE FORM WILL CLOSE */
	$('.close').click(function(){
		close_box(); // CALL THE CLOSE_BOX() FUNCTION
	});

	/******	
	================================================
	WHEN USER CLICK THE BLACK TRANSPARENT BACKGROUND 
	THE POP UP FORM WILL CLOSE 
	================================================
	*******/

	$('.back-box').click(function(){
		close_box(); // CALL THE CLOSE_BOX() FUNCTION
	});	

	/******	
	================================================
	 WHEN CLOSE_BOX HAS BEEN CALLED
	================================================
	*******/

	function close_box()
	{
		$('.back-box, .lightbox-wrapper').animate({'opacity':'0'}, 300, 'linear', function(){
			$('.back-box, .lightbox-wrapper').css('display', 'none');
		});
	}

	/* INITIALIZE VALIDATION */

	initForm();

	function initForm() {

		var errorMsg = $('.registration-copy');


		$('.submit-btn').click(function(e){

			e.preventDefault();
			validate(); // CALL THE VALIDATE FORM FUNCTION

			if($('.box-form .error').length == 0) {
				errorMsg.text("Thank You! You have successfully completed One Run, One Philippines self registration.");
				$('input[type=text], input[type=tel], input[type=checkbox], input[type=radio], input[type=email]').val(""); // REMOVES ALL DATA WHEN ITS SUCCESSFUL
				$('.submit-btn').addClass('btn-disabled').attr("disabled", "disabled"); // ADD CLASS BTN-DISABLED WHEN FORM HAS SUCCESSFULY REGISTERED
			}else {
				errorMsg.text('Check all the required (*) fields and agreement.').addClass('error-type'); // RETURN FAIL IS UNSUCCESSFUL
				return false;
			}

		});
	}

	/* VALIDATE FORM */
	function validate() {
		$('.required').each(function() {
			isRequired($(this)); /* CALL THE FUNCTION ISREQUIRED() TO VALIDATE IF FORM INPUTS ARE CORRECT */
		});
	}

	/* CALLED WHEN FORM INPUT NEED TO VALIDATE */
	function isRequired($obj) {
		if($obj.is('input[type="text"]') || $obj.is('input[type="tel"]') || $obj.is('input[type="email"]') ) {
			if($.trim($obj.val()) == 0 || $obj.attr('required') == $obj.val()) { 
				$obj.addClass('error'); /*ADD CLASS ERROR IF FORM INPUTS ARE INCOMPLETE OR IF INPUT HAS NO INFO DATA*/
			}else { 
				$obj.removeClass('error'); /* REMOVE CLASS ERROR IF THERE'S A DATA */
			}
		}else if($obj.is('select')) {
			if($obj.find('option:selected').index() == 0) {
				$obj.addClass('error'); /*ADD CLASS ERROR IF FORM INPUTS ARE INCOMPLETE OR IF INPUT HAS NO INFO DATA*/
			} else {
				$obj.removeClass('error'); /* REMOVE CLASS ERROR IF THERE'S A DATA */
			}
		}else if($obj.is('input[type="radio"]')) {
			
			var radName = $obj.attr('name');

			if(!$('input[name='+ radName +']:checked').val()) {
				$obj.addClass('error'); /*ADD CLASS ERROR IF FORM INPUTS ARE INCOMPLETE OR IF INPUT HAS NO INFO DATA*/
			} else {
				$obj.removeClass('error'); /* REMOVE CLASS ERROR IF THERE'S A DATA */
			}
		}else if($obj.is('input[type="checkbox"]')) {
			if(!$('input[name="agree"]:checked').val()){
				$obj.addClass('error'); /*ADD CLASS ERROR IF FORM INPUTS ARE INCOMPLETE OR IF INPUT HAS NO INFO DATA*/
			}else {
				$obj.removeClass('error'); /* REMOVE CLASS ERROR IF THERE'S A DATA */
			}
		}

	}

	/* ALTERNATIVE PLACEHOLDER FOR IE */
	function add() {
		if($(this).val() === ''){
		  $(this).val($(this).attr('placeholder')).addClass('placeholder');
		}
	}	

	function remove() {
		if($(this).val() === $(this).attr('placeholder')){
		  $(this).val('').removeClass('placeholder');
		}
	}

	/* Create a dummy element for feature detection */
	if (!('placeholder' in $('<input>')[0])) {

		/* Select the elements that have a placeholder attribute */
		$('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);

		/* Remove the placeholder text before the form is submitted */
		$('form').submit(function(){
		  $(this).find('input[placeholder], textarea[placeholder]').each(remove);
		});
	}

	/* SCROLL LEARN*/	
	$("#link-learn").click(function() {
		$('html, body').animate({
	         scrollTop: $("#learn-more").offset().top
	     }, 1000);
	});

	$("#toTop").click(function(){
		$('html, body').animate({
	         scrollTop: 0
	     }, 1000);
	});


});

/* COUNTDOWN */
$(function(){
	var BigDay = new Date("06 Oct 2013, 06:00:00");
	var msPerDay = 24 * 60 * 60 * 1000 ;
	// var msPerDay = 24 * 60 * 60 * 1000 ;

	window.setInterval(function(){
		// var today = new Date();
		// var timeLeft = (BigDay.getTime() - today.getTime());

		// var e_daysLeft = timeLeft / msPerDay;
		// var daysLeft = Math.floor(e_daysLeft);

		// var e_hrsLeft = (e_daysLeft - daysLeft)*24;
		// var hrsLeft = Math.floor(e_hrsLeft);
		// console.log(e_hrsLeft);
		
		// var e_minsLeft = (e_hrsLeft - hrsLeft)*60;
		// var minsLeft = Math.floor(e_minsLeft);
		
		// var e_secsLeft = (e_minsLeft - minsLeft)*60;
		// var secsLeft = Math.floor(e_secsLeft);
		
		// var timeString = '<div class="count days"><div class="value">' + daysLeft + '</div><div class="text">Days</div></div>' + 
		// 				 '<div class="count hours"><div class="value">' + hrsLeft + '</div><div class="text">Hours</div></div>' +
		// 				 '<div class="count mins"><div class="value">' + minsLeft + '</div><div class="text">Minutes</div></div>' + 
		// 				 '<div class="count secs"><div class="value">' + secsLeft + '</div><div class="text">Seconds</div></div>';

		var timeString = '<div class="count days"><div class="value">' + 0 + '</div><div class="text">Days</div></div>' + 
						 '<div class="count hours"><div class="value">' + 0 + '</div><div class="text">Hours</div></div>' +
						 '<div class="count mins"><div class="value">' + 0 + '</div><div class="text">Minutes</div></div>' + 
						 '<div class="count secs"><div class="value">' + 0 + '</div><div class="text">Seconds</div></div>';						 
		
		$('.countdown-holder').html(timeString);
	}, 1000);
});

