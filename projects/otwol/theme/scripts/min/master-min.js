var pages={indexCover:0,oneCover:1,twoBehind:2,threeBehind:3,fourInside:4,fiveInside:5,sixJoin:6,sevenJoin:7};!function($){$.QueryString=function(e){if(""===e)return{};for(var t={},i=0;i<e.length;++i){var a=e[i].split("=");2===a.length&&(t[a[0]]=decodeURIComponent(a[1].replace(/\+/g," ")))}return t}(window.location.search.substr(1).split("&"));var e=function(){"use strict";function e(){$(".item-block > li").each(function(){var e=$(this).index()+1;(1===e||10===e||14===e)&&$(this).addClass("large"),(4===e||8===e||15===e)&&$(this).addClass("med")}),$(".toggle-nav").click(function(e){$(this).toggleClass("active"),$(".menu ul").toggleClass("active"),e.preventDefault()})}e(),$(".item-block").packery({itemSelector:"li"})}(),t=function(){"use strict";function e(){t()}function t(){var e=$(".flipbook");return 0===e.width()||0===e.height()?void setTimeout(t,10):($(".flipbook .double").scissor(),$(".flipbook").turn({elevation:400,gradients:!0,autoCenter:!1,page:$.QueryString.page}),$("#behind").on("click",function(e){return e.preventDefault(),$(".flipbook").turn("page",pages.threeBehind),$(".menu-item").children().removeClass("active"),$(this).addClass("active"),!1}),$("#inside").on("click",function(e,t,i){return e.preventDefault(),$(".flipbook").turn("page",pages.fiveInside),$(".menu-item").children().removeClass("active"),$(this).addClass("active"),!1}),$("#join").on("click",function(e){return e.preventDefault(),$(".flipbook").turn("page",pages.sevenJoin),$(".menu-item").children().removeClass("active"),$(this).addClass("active"),!1}),$(".flipbook").bind("turned",function(e,t,i){return history.pushState({},"","http://localhost/2015/OTWOL/staging/index.html?page="+t),$.each(pages,function(e,i){t===pages.indexCover||t===pages.oneCover?$(".menu-item").children().removeClass("active"):t===pages.twoBehind||t===pages.threeBehind?($(".menu-item").children().removeClass("active"),$("#behind").addClass("active")):t===pages.fourInside||t===pages.fiveInside?($(".menu-item").children().removeClass("active"),$("#inside").addClass("active")):(t===pages.sixJoin||t===pages.sevenJoin)&&($(".menu-item").children().removeClass("active"),$("#join").addClass("active"))}),!1}),$("nav.pagination .next").on("click",function(e){return e.preventDefault(),$(".flipbook").turn("next"),!1}),void $("nav.pagination .previous").on("click",function(e){return e.preventDefault(),$(".flipbook").turn("previous"),!1}))}return yepnope({test:Modernizr.csstransforms,yep:["theme/scripts/lib/turn.min.js"],nope:["theme/scripts/lib/turn.html4.min.js"],both:["theme/scripts/lib/scissor.min.js","theme/styles/demo.css"],complete:t}),{init:e}}(),i=function(){var e=$("body").find(".text-substring-150");$(e).each(function(){$(this).text().length>150&&$(this).text($(this).text().substring(0,150)+"...")})}(),a=function(){$("#photo-file").change(function(e){var t=$(this).val().replace(/C:\\fakepath\\/i,"");$('<div id=""></div>photo-text').attr("value",t)})}(),n=function(){var e=$("textarea#text-answer"),t=$(".char-count").text(e.val().length),i=250;e.keydown(function(t){t.which<32||(e.val().length==i?t.preventDefault():e.val().length>i&&(e.val()=e.val().substring(0,i)))}),e.keyup(function(){t.text(e.val().length)})}(),o=function(){$(".show-lb, #link-mechanics").click(function(e){e.preventDefault();var t=$(window).height(),i=$(this).attr("href"),a=$(".mechanics-wrapper").html();data_text=$(this).attr("data-text"),data_alt=$(this).attr("alt"),img_html=$('<img src="'+i+'" alt="'+data_alt+'" />'),vid_html=$('<iframe src="'+i+'" frameborder="0" allowfullscreen></iframe>');var n='<div id="popbox" class="lb-otwol"><div class="back-overlay"><p class="lightbox-close">x</p></div><div class="content"><img class="main-image" src="'+i+'" alt="'+data_alt+'" /><div class="details"><p class="caption-wrapper">'+data_text+'</p><p class="social-wrapper"><a href="#facebook" id="share-fb">Facebook</a><a href="#twitter" id="share-tw">Twitter</a></p></div></div></div>',o='<div id="popbox" class="lb-otwol"><div class="back-overlay"><p class="lightbox-close">x</p></div><div class="content"><iframe class="main-video" src="'+i+'" frameborder="0" allowfullscreen></iframe><div class="details"><p class="caption-wrapper">'+data_text+'</p><p class="social-wrapper"><a href="#facebook" id="share-fb">Facebook</a><a href="#twitter" id="share-tw">Twitter</a></p></div></div></div>',s='<div id="popbox" class="lb-otwol"><div class="back-overlay"><p class="lightbox-close">x</p></div><div class="content"><div class="mechanics-wrapper">'+a+"</div></div></div>";$(this).hasClass("image")?$("#popbox").length>0?$(".content").html(img_html):($("body").append($(n)),$("#popbox").fadeIn(function(){var e=$(".main-image").height(),i=(t-e)/2;$("body").css({overflow:"hidden"}),$("#popbox .content, #popbox .lightbox-close").animate({top:"+="+i+"px"},600).delay(400),console.log(t,e)})):$(this).hasClass("link-mechanics")?($("body").append($(s)),$("#popbox").fadeIn(function(){$("body").css({overflow:"hidden"}),$(".mechanics-wrapper").css({height:t})})):$("#popbox").length>0?$(".content").html(vid_html):($("body").append($(o)),$("#popbox").fadeIn(function(){var e=$(".main-video").height(),i=(t-e)/2;$("body").css({overflow:"hidden"}),$("#popbox .content, #popbox .lightbox-close").animate({top:"+="+i+"px"},600).delay(400),console.log(t,e)})),$(".lightbox-close, .back-overlay, .link-close").click(function(e){e.preventDefault(),$("#popbox").fadeOut(function(){$("body").css({overflow:"scroll"}),$("#popbox").animate({top:"0"},900).delay(400),$(this).remove()})})})}();return $("body").hasClass("mobile")?!1:void 0}(jQuery);