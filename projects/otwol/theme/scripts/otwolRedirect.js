/*! cookies.js - (https://developer.mozilla.org/en-US/docs/Web/API/document.cookie) */
var docCookies={getItem:function(a){return a?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(a,f,b,c,d){if(!a||/^(?:expires|max\-age|path|domain|secure)$/i.test(a))return!1;var e="";b&&(e="; expires="+b.toUTCString());document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(f)+e+(d?"; domain="+d:"")+(c?"; path="+c:"");return!0}};
/*!
 * OTWOL mobile redirect
 * ABS-CBN Corporation
 */
(function () { 
	var linkTags = document.getElementsByTagName('link'),
	isMobile = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(navigator.userAgent);
 
	var exp = new Date();
	exp.setTime(exp.getTime()+(30*60*1000));
	docCookies.setItem('8DAB478-BE1A-4F50-8358', 'true', exp, '/');
	var loc = document.location;
  // ADDITIONAL VARIABLE
  var path = loc.pathname.split('index.html')[0];
  var pathIndex = loc.pathname.split('/mobile')[0]; 

	console.log(loc); 
  
	function detectmob() {
		if(!isMobile && $(window).width() < 1024){
			console.log("mobile"); 
	  		if ( $("body").hasClass("mobile") ) {
	  			return false;
	  			console.log("mobile false"); 
	  		} else {
          document.location = loc.protocol + '//' + loc.host + path + 'mobile/';
	  		}
		} else if (!isMobile && $(window).width() > 1024) {
  			console.log("desktop");
		  	if ( $("body").hasClass("mobile") ) {
          document.location = loc.protocol + '//' + loc.host + pathIndex + '/index.html';
  			} else {
  				console.log("desktop false"); 
  				return false;
  			}
		//Additional code for mobile device	
		} else if (isMobile) {
        if ( $("body").hasClass("mobile") ) {
        	console.log("mobile true"); 
        	return false;
        } else { 
          document.location = loc.protocol + '//' + loc.host + path + 'mobile/';
        	return false;
        }
		} else {  
  			console.log("mobile orig");
  			return false;
		}
	}

	detectmob();

	$(window).resize(function(){
		detectmob();
	});

}());