// for cart quickview
$('.cart-quickview > p a').click(function(e) {

    var cart = $(this).parent().siblings("section");

    cart.slideToggle();

    $('.collapse', cart).click(function() {
        cart.slideUp()

        $(this).off("click");
    });

    e.preventDefault();

});

// for removing items
$('.remove-item').click(function(e) {

    $(this).parent().remove();

    totalAmt();

    e.preventDefault();

});

function totalAmt() {

    var amt = $('.price .number'),
    total = $(".total .number"),
    amtNum = 0;

    $.each(amt, function(i, a) {
        a = $(a).text().replace("Php ", "");
        amtNum += parseFloat(a);
    });

    total.text("Php " + amtNum.toFixed(2));

}


totalAmt();


// for tabs
$('.tabs a').click(function() {
    $(this).parent().addClass('active').siblings().removeClass('active');
});

// for filters

$('.filters #price, .filters #feature').show();

$('.filters h4 a').click(function(e) {
    $("+ ul", $(this).parent()).slideToggle().siblings('ul').slideUp();
    e.preventDefault();
});
