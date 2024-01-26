let slideIndex = 0;

$(document).ready(function(){
	showSlides();

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

function showSlides() {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} // if slideindex is greater than slides.length then slideindex = 1
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); 
}

