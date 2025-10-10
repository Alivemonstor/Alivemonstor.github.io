let colours = {
    common: "#ffffff",
    uncommon: "#00ff00",
    rare: "#0000ff",
    epic: "#dbbe02",
    couple: "#ff00ff",
    location: "#ffff00",
    gang: "#ff0000",
    businesses: "#00ffff",
};

let stats = {
    0: { name: "Health", icon: "fa-solid fa-heart", color: "red" },
    1: { name: "Damage", icon: "fa-solid fa-skull", color: "gray" },
    2: { name: "Armor", icon: "fa-solid fa-shield", color: "#8b6060" },
};

$(document).ready(() => {
    window.addEventListener('message', (event) => {
        const { open, data } = event.data;
        InteractUI(open, data);
    });
});

function InteractUI(open, data) {
    const $body = $("body");
    const $cardParent = $(".card-parent");

    if (!open) {
        $cardParent.css('animation', 'slideDown 0.5s');
        $body.fadeOut(500); 
        return;
    }

    $cardParent.css('animation', 'slideUp 0.5s');

    OpenTradingCard(data).then(() => {
        setTimeout(() => {
            $body.fadeIn(500); 
        }, 100);
    });
}

function OpenTradingCard(data) {
    return new Promise((resolve) => {
        if (!data || !data.stats) {
            console.log("Invalid data received for trading card:", data);
            resolve(); 
            return;
        }

        const $profileName = $('#profile-name');
        const $profileDescription = $('#profile-description');
        const $cardImage = $('.card-image');
        const $infoWrapper = $('.info-wrapper');
        const root = document.documentElement;

        root.style.setProperty('--color-card', colours[data.rarity] || "#ffffff");
        $profileName.text(data.name || "Unknown");
        $profileDescription.text(data.description || "No description available.");

        const img = new Image();
        img.onload = () => {
            $cardImage.attr('src', img.src); 
            resolve(); 
        };
        img.onerror = () => {
            console.log("Failed to load image:", data.image);
            $cardImage.attr('src', "images/logo.png"); 
            resolve();
        };
        img.src = data.image || "images/logo.png";

        $infoWrapper.empty(); 
        Object.keys(stats).forEach((key) => {
            const statValue = data.stats[key] || "N/A";
            const { icon, color } = stats[key];
            $infoWrapper.append(`
                <span class="profile-stats" id="${key}">
                    <i class="${icon || "fas-fa store"}" style="color: ${color || "red"};"></i>: ${statValue || 1}
                </span>
            `);
        });
    });
}

$(document).on('keydown', (event) => {
    if (event.key === "Escape") {
        InteractUI(false, {});
        $.post("https://nerp_tradingcards/CloseCard");
    }
});