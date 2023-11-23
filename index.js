$(document).ready(function(){
	var i = 0;
	var txt = 'Hi, I\'m Jayden Mobley';
	var speed = 50;
	setTimeout(typeWriter, speed);

	function typeWriter() {
		console.log("madeit")
	  if (i < txt.length) {
	    document.getElementById("typing").innerHTML += txt.charAt(i);
	    i++;
	    setTimeout(typeWriter, speed);
	  }
	}
})


