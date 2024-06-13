let showcaseItems = {
    "al-treasurehunt" : {
        "name": "al-treasurehunt",
        "link": "https://github.com/Alivemonstor/al-treasurehunt",
        "shortdesc": "FiveM Treasurehunt System",
        "description": "A treasure hunt script made for the FiveM platform. This script allows you to create treasure hunts for players to find and earn rewards.",
        "image": "imgs/treasure.png"
    },
    "al-reputation" : {
        "name": "al-reputation",
        "link": "https://www.youtube.com/watch?v=LnpSPi2QfeQ",
        "shortdesc": "FiveM Reputation System",
        "description": "A reputation system made for the FiveM platform. This script allows players to gain reputation by completing tasks and missions.",
        "image": "imgs/reputation.png"
    },
    "Custom Inventory" : {
        "name": "ps-inventory",
        "link": "https://github.com/Alivemonstor/ps-inventory",
        "description": "A custom inventory system made for the FiveM platform. This script allows players to store items in their inventory.",
        "shortdesc": "FiveM Inventory System",
        "image": "imgs/inv.png"
    },
}

$(document).ready(function(){
    var showcase = $(".showcasecontainer");
    let length = Object.keys(showcaseItems).length;
    for (let i = 0; i < length; i++) {
        showcase.append(`
        <div class="Showcase" id=${i}>
            <div class="Showcaseimg">
                <a href=${showcaseItems[Object.keys(showcaseItems)[i]].link}>
                    <img src=${showcaseItems[Object.keys(showcaseItems)[i]].image} alt="Image">
                    <div class="Showcasetext">
                        <h3 class="Title">${showcaseItems[Object.keys(showcaseItems)[i]].name}</h3>
                        <p>${showcaseItems[Object.keys(showcaseItems)[i]].shortdesc}</p>
                    </div>
                </a>
            </div>
        </div>`)
    }
    $(".Showcasemainelement").append(showcase);

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

    var vpH = $(window).height(),
        st = $(window).scrollTop(),
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (evalType === "above") return ((y < (vpH + st)));
}