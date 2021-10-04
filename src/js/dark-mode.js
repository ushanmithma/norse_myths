
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
}

if (theme === 'dark') {
	switchToDarkTheme();
}

darkModeToggle.addEventListener('change', () => {
	if (darkModeToggle.checked) {
		switchToDarkTheme();
	} else {
		switchToLightTheme();
	}
});