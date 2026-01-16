let interval_id;
let typingSpeed = 70;
let typingindex = 0;
let typingList = [
    "Hi, I'm Jayden",
    "Welcome to my portfolio",
];
let txt = typingList[Math.floor(Math.random() * typingList.length)];

let projects = [
    {
        title: "FiveM Server Development",
        description: "FiveM Server Development - My current work consists of creating immersive experiences for players on the server District 10 RP.",
        detailedDescription: `
            <p>My current work consists of creating immersive experiences for players on the server District 10 RP, owned by popular twitch streamer fanum. On a day to day basis, I work on various features and improvements to enhance gameplay and user experience as the Lead Developer.</p>
            <h6>Key Features:</h6>
            <ul>
                <li>Custom job systems</li>
                <li>Interactive UI elements</li>
                <li>Optimized server performance</li>
                <li>Bug fixes and quality of life improvements</li>
                <li>Leading a team of developers</li>
            </ul>
            <h6>Technologies Used:</h6>
            <p>Lua, JavaScript, HTML/CSS, MySQL, ESX Framework, Github Source Control</p>
        `,
        image: "assets/images/d10.png",
        type: "fivem",
        links: [
            { "Website": "https://www.district10rp.com/" },
            { "Discord": "https://discord.gg/district10" },
        ]
    },
    {
        title: "Bar Simulator Gameplay Mechanics Demo ",
        description: "A bar simulator demo showcasing gameplay mechanics.",
        detailedDescription: `
            <p>A bar simulator demo developed to showcase various gameplay mechanics learned during my studies.</p>
            <h6>Key Features:</h6>
            <ul>
                <li>Player interaction with bar elements</li>
                <li>Basic inventory system</li>
                <li>Simple AI customer behavior</li>
            </ul>
            <h6>Technologies Used:</h6>
            <p>Unreal Engine 5, C++, Blueprints</p>
        `,
        image: "assets/images/barsimulator.png",
        type: "university",
        links: [
            { "Video Playlist": "https://youtube.com/playlist?list=PL459_3aNMMNYOiBdXBgCXhJlKi4s1HTbQ&si=KcS-D0BitwTafCuZ" }
        ]
    },
    {
        title: "Unreal Engine 5 Lua Wrapper",
        description: "A Script wrapper to integrate Lua scripting into Unreal Engine 5 projects.",
        detailedDescription: `
            <p>A Plugin to integrate Lua scripting into Unreal Engine 5 projects, enabling more flexible and dynamic game development.</p>
            <h6>Key Features:</h6>
            <ul>
                <li>Seamless integration with Unreal Engine 5</li>
                <li>Support for Lua scripting language</li>
                <li>Easy to use API for game developers</li>
            </ul>
            <h6>Technologies Used:</h6>
            <p>Unreal Engine 5, C++, Lua</p>
        `,
        image: "assets/images/lua.png",
        type: "university",
        links: [
            { "Showcase Coming Soon": "" }
        ]   
    },
    {
        title: "FiveM Shop and Boss Menu UI",
        description: "A user interface for in-game shop and managing boss actions.",
        detailedDescription: `
            <p>A modern, responsive UI for in-game shop and managing boss actions in FiveM, built to enhance the gameplay experience.</p>
            <h6>Key Features:</h6>
            <ul>
                <li>Responsive design</li>
                <li>Easy to use interface</li>
                <li>Integration with ESX</li>
            </ul>
            <h6>Technologies Used:</h6>
            <p>Lua, JavaScript, HTML/CSS, MySQL, ESX Framework</p>
        `,
        image: "assets/images/bossmenu.png",
        type: "fivem",
        links: [
            { "Live Demo": "bossmenu/index.html" },
        ]
    },
    {
        title: "Portfolio Website",
        description: "Portfolio website showcasing my development skills.",
        detailedDescription: `
            <p>A modern, portfolio website built to showcase my development projects and skills.</p>
            <h6>Key Features:</h6>
            <ul>
                <li>Fully responsive design</li>
                <li>Interactive project filtering</li>
                <li>Smooth scrolling navigation</li>
            </ul>
            <h6>Technologies Used:</h6>
            <p>HTML/CSS, JavaScript, Bootstrap, jQuery</p>
        `,
        image: "assets/images/portfolio.png",
        type: "university",
        links: [
            { "Live Website": "https://alivemonstor.dev" },
            { "GitHub Repository": "https://github.com/Alivemonstor/Alivemonstor.github.io" }
        ]
    },
    {
        title: "FiveM Cutscene Trader",
        description: "FiveM cinematic cutscene trader with group features.",
        detailedDescription: `
            <p>An immersive trading system featuring cinematic cutscenes and group functionality for enhanced roleplay.</p>
            <h6>Key Features:</h6>
            <ul>
                <li>Cinematic camera work during trades</li>
                <li>Group trading mechanics</li>
                <li>Custom NPC interactions</li>
                <li>Dynamic pricing system</li>
                <li>Anti-exploit protection</li>
            </ul>
            <h6>Technologies Used:</h6>
            <p>Lua, JavaScript, HTML/CSS, ESX/QBCore Framework</p>
        `,
        image: "assets/images/al-trader.png",
        type: "fivem",
        links: [
            { "QBCore Github Branch": "https://github.com/Alivemonstor/al-trader" },
            { "ESX Github Branch": "https://github.com/Alivemonstor/al-trader/tree/ESX" },
            { "Video Demo": "https://www.youtube.com/watch?v=ugtSrhDbva4" }
        ]
    },
    {
        title: "CPP Blackjack Game",
        description: "A simple blackjack game implemented in C++.",
        detailedDescription: `
            <p>A modern, console-based blackjack game built to improve my C++ programming skills was developed as a first year university project.</p>
            <h6>Key Features:</h6>
            <ul>
                <li>Console-based gameplay</li>
                <li>Basic betting system</li>
                <li>Simple AI dealer</li>
            </ul>
            <h6>Technologies Used:</h6>
            <p>C++</p>
        `,
        image: "assets/images/BlackJack.png",
        type: "university",
        links: [
            { "GitHub Repository": "https://github.com/Alivemonstor/BlackJack-CPP" }
        ]
    },
    {
        title: "FiveM Trading Cards System",
        description: "A FiveM resource for creating and managing trading cards.",
        detailedDescription: `
            <p>A comprehensive system for implementing trading cards within FiveM, allowing players to collect, trade, and showcase their cards.</p>
            <h6>Key Features:</h6>
            <ul>
                <li>Card collection and management</li>
                <li>Trading system between players</li>
                <li>Card showcasing in player profiles</li>
            </ul>
            <h6>Technologies Used:</h6>
            <p>Lua, JavaScript, HTML/CSS, MySQL</p>
        `,
        image: "assets/images/tradingcard.png",
        type: "fivem",
        links: [
            { "Live Demo": "tradingcards/index.html" }
        ]
    },
];

let experiences = [
    {
        title: "Freelance FiveM Developer",
        date: "2021 - Present",
        description: "Developing custom scripts and systems for FiveM roleplay servers. Specializing in QBCore and ESX frameworks with complex gameplay mechanics."
    },
    {
        title: "Staffordshire University - Games Development",
        date: "2024 - Present",
        description: "Pursuing a degree in Games Development. Using Unity and Unreal Engine to enhance my skills in programming. Learning advanced game design and development techniques."
    },
    {
        title: "College - Games Development",
        date: "2022 - 2024",
        description: "Studying Games Development and Coding Level 3. Learning 3D modeling, level design, texturing, and advanced programming concepts."
    },
    {
        title: "High School - Computer Science",
        date: "2017 - 2022",
        description: "Studying Computer Science. Learning programming fundamentals, basic practices, and software development."
    },
];

$(document).ready(function () {
    var projectContainer = $("#projects .row");
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        var projectCard = `
            <div class="col-md-4 ${project.type}">
                <div class="card h-100">
                    <img src="${project.image}" class="card-img-top" alt="${project.title}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text flex-grow-1">${project.description}</p>
                            <button class="btn btn-primary btn-sm mt-auto view-details-btn" data-project-index="${i}">View Details</button>
                        </div>
                </div>
            </div >
    `;
        projectContainer.append(projectCard);
    };

    var timelineContainer = $(".timeline");
    for (let i = 0; i < experiences.length; i++) {
        const experience = experiences[i];
        var timelineItem = `
    <div class="timeline-item" >
        <div class="timeline-content">
            <h4>${experience.title}</h4>
            <div class="date">${experience.date}</div>
            <p>${experience.description}</p>
        </div>
            </div >
    `;
        timelineContainer.append(timelineItem);
    };

    $(document).on('click', '.view-details-btn', function () {
        const projectIndex = $(this).data('project-index');
        const project = projects[projectIndex];

        $('#modalprojecttitle').text(project.title);
        $('#modalprojecttype').text(project.type.charAt(0).toUpperCase() + project.type.slice(1));
        $('#modalprojectimage').attr('src', project.image);
        $('#modalprojectdescription').html(project.detailedDescription);

        const linksContainer = $('#modalprojectlinks');
        linksContainer.empty();

        project.links.forEach(linkObj => {
            Object.entries(linkObj).forEach(([text, url]) => {
                const linkButton = `<a href = "${url}" class="btn btn-primary btn-sm" target = "_blank" > ${text}</a > `;
                linksContainer.append(linkButton);
            });
        });

        $('#projectmodal').modal('show');
    });

    setTimeout(typeWriter, typingSpeed);

    $(".dropdown-item").on("click", function (e) {
        switch ($(this).data("filter")) {
            case "all":
                $("#projects .row").children().show();
                break;
            default:
                $("#projects .row").children().hide();
                $("#projects .row").children(`.${$(this).data("filter")} `).show();
        }
    });
});

function typeWriter() {
    if (typingindex < txt.length) {
        document.getElementById("typing").innerHTML += txt.charAt(typingindex);
        typingindex++;
        setTimeout(typeWriter, typingSpeed);
    }
}

$("a.nav-link").on("click", function (e) {
    if (this.hash !== "") {
        e.preventDefault();
        const hash = this.hash;
        $("html, body").animate({ scrollTop: $(hash).offset().top - 60 }, 800);
    }
});
