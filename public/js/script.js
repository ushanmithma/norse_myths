let theme=localStorage.getItem("theme");const darkModeToggle=document.querySelector("#darkModeToggle");let switchToDarkTheme=()=>{document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"),!1===darkModeToggle.checked&&(darkModeToggle.checked=!0)},switchToLightTheme=()=>{document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light")};"dark"===theme&&switchToDarkTheme(),darkModeToggle.addEventListener("change",()=>{(darkModeToggle.checked?switchToDarkTheme:switchToLightTheme)()});