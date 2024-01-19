let blockclass = document.getElementsByClassName('infosection');
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
  let height = blockclass.infoblock.offsetHeight;
  let width = blockclass.infoblock.offsetWidth;
  let left = blockclass.infoblock.offsetLeft;
  let top = blockclass.infoblock.offsetTop;
  let win_height = document.getElementsByClassName('background-info').backgroundinfo.offsetHeight;
  let win_width = document.getElementsByClassName('background-info').backgroundinfo.offsetWidth;

  if (left <= 0 || left + width >= win_width) {
    x_incr = ~x_incr + 1;
  }
  if (top <= 30 || top + height >= win_height) {
    y_incr = ~y_incr + 1;
  }
}

function frameBounce() {
	let height = blockclass.infoblock.offsetHeight;
  let width = blockclass.infoblock.offsetWidth;
  let left = blockclass.infoblock.offsetLeft;
  let top = blockclass.infoblock.offsetTop;
  handle_collision();
  blockclass.infoblock.style.top = top + y_incr;
  blockclass.infoblock.style.left = left + x_incr;
}


// function CheckScrollHeight() {
// 	let scrollheight = document.getElementsByClassName()
// }


