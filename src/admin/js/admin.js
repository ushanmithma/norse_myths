
// Dark Mode Toggle

let theme = localStorage.getItem('theme');
const darkModeToggle = document.querySelector('#darkModeToggle');

let switchToDarkTheme = () => {
	document.documentElement.setAttribute('data-theme', 'dark');
	localStorage.setItem('theme', 'dark');
	
	if (darkModeToggle != undefined || darkModeToggle != null) {
		if (darkModeToggle.checked === false) {
			darkModeToggle.checked = true;
		}
	}
}

let switchToLightTheme = () => {
	document.documentElement.setAttribute('data-theme', 'light');
	localStorage.setItem('theme', 'light');
}

if (theme === 'dark') {
	switchToDarkTheme();
}

if (darkModeToggle != undefined || darkModeToggle != null) {
	darkModeToggle.addEventListener('change', () => {
		if (darkModeToggle.checked) {
			switchToDarkTheme();
		} else {
			switchToLightTheme();
		}
	});
}

// Accordion - aside sub menu controller

var accordion = document.querySelectorAll(".accordion");

for (var i = 0; i < accordion.length; i++) {
	accordion[i].addEventListener("click", function(event) {
		event.preventDefault();
		var subMenu = this.nextElementSibling;
		if (subMenu.style.maxHeight) {
			subMenu.style.maxHeight = null;
		} else {
			subMenu.style.maxHeight = subMenu.scrollHeight + "px";
			subMenu.style.display = "flex";
			subMenu.style.flexDirection = "column";
		}
	});
}

// Dropdown Toggle Menu

const dropdownBtns = document.querySelectorAll('.dropdown-btn');

dropdownBtns.forEach(button => {
	button.addEventListener("click", () => {
		let dropdown = document.querySelector(button.dataset.toggle);
		dropdown.classList.toggle('active');
		if (button === document.querySelector('#bellIcon')) {
			removeNotificationDot(button);
		}
	});
});

window.addEventListener("click", function(e) {
	dropdownBtns.forEach(button => {
		let dropdown = document.querySelector(button.dataset.toggle);
		if (!e.target.matches('.dropdown-btn') && dropdown.classList.contains('active')) {
			dropdown.classList.remove('active');
		}
	});
});

function removeNotificationDot(element) {
	element.classList.remove('alert-dot');
}

// Responsive menu control

const menuIcon = document.querySelector('.menu-icon');
const sidemenu = document.querySelector('.sidemenu');
const header = document.querySelector('header');
const main = document.querySelector('main');

if (menuIcon != undefined || menuIcon != null) {
	menuIcon.addEventListener("click", function() {
		sidemenu.classList.toggle('active');
		header.classList.toggle('active');
		main.classList.toggle('active');
	});
}

// Login page

const showPW = document.querySelector('.showPW');

showPW.addEventListener('click', (event) => {
    const PWinput = document.querySelector(event.target.dataset.target);
    if (PWinput.type === "password") {
        PWinput.type = "text";
        event.target.textContent = "visibility";
    } else {
        PWinput.type = "password";
        event.target.textContent = "visibility_off";
    }
});