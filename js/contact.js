$(document).ready(function(){
    if (!checkVisible($('.topnav'))) {
		$('.movingnav').css("display", "block")
		$('.topnav').css("display", "none")
	} else {
		$('.topnav').css("display", "block")
		$('.movingnav').css("display", "none")
	}


})


$(window).on( "scroll", function() {
	if (!checkVisible($('.topnav'))) {
		$('.movingnav').css("display", "block")
		$('.movingnav').css("animation-name", "fadein")
		$('.movingnav').css("animation-duration", "0.5s")
		$('.topnav').css("display", "none")
	} else {
		$('.topnav').css("display", "block")
		$('.topnav').css("animation-name", "fadein")
		$('.topnav').css("animation-duration", "0.5s")
		$('.movingnav').css("display", "none")
	}
});