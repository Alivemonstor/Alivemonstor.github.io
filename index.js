$(document).ready(function(){
	var i = 0;
	var txt = 'Hi, I\'m Jayden, Welcome To My Website';
	var speed = 70;
	setTimeout(typeWriter, speed);

	function typeWriter() {
	  if (i < txt.length) {
	    document.getElementById("typing").innerHTML += txt.charAt(i);
	    i++;
	    setTimeout(typeWriter, speed);
	  }
	}
})




let slideIndex = 0;
$(document).ready(function(){
	showSlides();
})

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