$(document).ready(function () {

    $('.navLoc').click(function () {
    	$('.subNavLoc').slideToggle('medium');
    	$('.subNavMuseums').hide();
        $('.subNavResults').fadeOut();
        
    });

	$('.navMus').click(function () {
    	$('.subNavMuseums').slideToggle('medium');
    	$('.subNavLoc').hide();
        $('.subNavResults').fadeOut();
    });

    // $('.subNavLoc ul li, .subNavMuseums ul li').mouseenter(function(){
    //     $('.subNavResults').css({'display': 'block'});
    // });

    $('.subNavLoc ul li, .subNavMuseums ul li').click(
        function(){
            
            $('.subNavResults')
                .stop(true, true)
                .fadeIn();
                
        // }, function() {

        //     // $('.subNavResults')
        //     //     .stop(true, true)
        //     //     .fadeOut('fast');

        //     $('.subNavResults')
        //         .stop(true, true)
        //         .fadeOut('fast');            

        // // return false;
                    
    });


    // $('.subNavLoc ul li, .subNavMuseums ul li').hover(
    //     function() {
    //         MenuOpenCloseErgoTimer (
    //             300,
    //             function(node) {
    //                 $('.subNavResults')
    //                 .stop(true, true)
    //                 .fadeIn('fast')
    //                 .addClass('open')
    //                 .find('.subNavResults')
    //                 .show();
    //             },
    //             this
                
    //         );
                
    //     }, 

    //     function() {
    //         MenuOpenCloseErgoTimer (
    //             200,

    //             function() {
    //                 $('.subNavResults')
    //                 .stop(true, true)
    //                 .fadeOut('fast');
    //                 .removeClass("open")
    //                 .find('ul')
    //                 .hide();

    //             }
    //         );

        // return false;
                    
    // });

    

    $('.subNavLoc ul li, .subNavMuseums ul li').click(function(){

        $(this).addClass('selected').siblings().removeClass('selected');
        // $('.subNavResults').stop().show();

        return false;

    });

    $('#slides > li:gt(0)').hide();

    setInterval(function(){
        $('#slides > li:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slides');
    }, 3000);


});