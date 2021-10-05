
let theme = localStorage.getItem('theme');
const darkModeToggle = document.querySelector('#darkModeToggle');

let switchToDarkTheme = () => {
	document.documentElement.setAttribute('data-theme', 'dark');
	localStorage.setItem('theme', 'dark');
	
	if (darkModeToggle.checked === false) {
		darkModeToggle.checked = true;
	}
}

let switchToLightTheme = () => {
	document.documentElement.setAttribute('data-theme', 'light');
	localStorage.setItem('theme', 'light');
	
	if (darkModeToggle.checked === true) {
		darkModeToggle.checked = false;
	}
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	switchToDarkTheme();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
	(event.matches) ? switchToDarkTheme() : switchToLightTheme();
});

if (theme === 'dark') {
	switchToDarkTheme();
} else if (theme === 'light') {
	switchToLightTheme();
}

darkModeToggle.addEventListener('change', () => {
	(darkModeToggle.checked) ? switchToDarkTheme() : switchToLightTheme();
});