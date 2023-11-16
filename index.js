let previoustab = "home"

function moveNavigation(param) {
	if (param != previoustab) {
		document.getElementById(param).classList.add("active")
		document.getElementById("me"+param).style.display = "block"
		document.getElementById(previoustab).classList.remove("active")
		document.getElementById("me"+previoustab).style.display = "none"
		previoustab = param	
	}
}