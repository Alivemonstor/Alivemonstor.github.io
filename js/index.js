let blockclass = document.getElementsByClassName('infosection');
let interval_id;
let x_incr = 1;
let y_incr = 1;
let slideIndex = 0;

$(document).ready(function(){
	setInterval(frameBounce, 5);

	if (!checkVisible($('.topnav'))) {
		$('.movingnav').css("display", "block")
		$('.topnav').css("display", "none")
	} else {
		$('.topnav').css("display", "block")
		$('.movingnav').css("display", "none")
	}


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




