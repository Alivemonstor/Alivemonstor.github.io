let dvdclass = document.getElementsByClassName('infosection');
let interval_id;
let x_incr = 1;
let y_incr = 1;
let slideIndex = 0;

$(document).ready(function(){
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
  	if (top <= 30 || top + dvd_height >= win_height) {
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


function CheckScrollHeight() {
	let scrollheight = document.getElementsByClassName()
}


