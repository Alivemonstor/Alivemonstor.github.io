let dvdclass = document.getElementsByClassName('infosection');
let interval_id;
let x_incr = 1;
let y_incr = 1;
let slideIndex = 0;

$(document).ready(function(){
	// showSlides();
	setInterval(frameBounce, 5);

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


function handle_collision() {
  	let dvd_height = dvdclass.infoblock.offsetHeight;
  	let dvd_width = dvdclass.infoblock.offsetWidth;
  	let left = dvdclass.infoblock.offsetLeft;
  	let top = dvdclass.infoblock.offsetTop;
  	let win_height = document.getElementsByClassName('background-info').backgroundinfo.offsetHeight;
  	let win_width = document.getElementsByClassName('background-info').backgroundinfo.offsetWidth;
	
  	if (left <= 0 || left + dvd_width >= win_width) {
  	  x_incr = ~x_incr + 1;
  	}
  	if (top <= 0 || top + dvd_height >= win_height) {
  	  y_incr = ~y_incr + 1;
  	}
}

function frameBounce() {
	let dvd_height = dvdclass.infoblock.offsetHeight;
  	let dvd_width = dvdclass.infoblock.offsetWidth;
  	let left = dvdclass.infoblock.offsetLeft;
  	let top = dvdclass.infoblock.offsetTop;
  	handle_collision();
  	dvdclass.infoblock.style.top = top + y_incr;
  	dvdclass.infoblock.style.left = left + x_incr;
}


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

