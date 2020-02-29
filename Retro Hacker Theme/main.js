const minimizeCard = function() {
	const body = this.closest(".minimizable").querySelector(".card-body");
	if (this.classList.contains("fa-plus")) {
		body.style.setProperty("height", (body.scrollHeight + 20) + "px");
		body.classList.remove("collapsed");
		setTimeout(function() {body.style.setProperty("height", "");}, 300);
	}
	else {
		body.style.setProperty("height", body.scrollHeight + "px");
		body.classList.add("collapsed");
		setTimeout(() => {body.style.setProperty("height", "");}, 10);
	}
	this.classList.toggle('fa-minus');
	this.classList.toggle('fa-plus');
};

const setupSite = function() {
	const navigation = document.getElementById("navigation");
	const stickyNavTop = navigation.offsetTop;

	const stickyNav = function() {
		const scrollTop = document.documentElement.scrollTop;
		if (scrollTop > stickyNavTop) document.body.classList.add("stickynav");
		else document.body.classList.remove("stickynav");
	};

	stickyNav();
	window.addEventListener("scroll", stickyNav, {passive: true});

	const menuButton = document.getElementById("menuButton");
	menuButton.addEventListener("click", function() {
		if (navigation.classList.contains("expanded")) navigation.classList.remove("expanded");
		else navigation.classList.add("expanded");
	});

	const unexpandMenu = function(e) {
		if (!e.target.closest("#menuButton")) navigation.classList.remove("expanded");
	}
	document.body.addEventListener("click", unexpandMenu);
	document.body.addEventListener("touchstart", unexpandMenu, {passive: true});

	const minimizeButtons = document.getElementsByClassName("button-minimize");
	for (let i = 0; i < minimizeButtons.length; i++) minimizeButtons[i].addEventListener("click", minimizeCard);


	const toTopButton = document.getElementById("toTop");
	toTopButton.addEventListener("click", function() {
		window.scroll({top: document.body.offsetTop, left: document.body.offsetLeft, behavior: "smooth"});
	});
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupSite);
else setupSite();