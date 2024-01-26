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


function checkVisible( elm, evalType ) {
    evalType = evalType || "visible";

    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (evalType === "above") return ((y < (vpH + st)));
}
