let theme=localStorage.getItem("theme");const darkModeToggle=document.querySelector("#darkModeToggle");let switchToDarkTheme=()=>{document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"),!1===darkModeToggle.checked&&(darkModeToggle.checked=!0)},switchToLightTheme=()=>{document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"),!0===darkModeToggle.checked&&(darkModeToggle.checked=!1)};window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&switchToDarkTheme(),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{(e.matches?switchToDarkTheme:switchToLightTheme)()}),"dark"===theme?switchToDarkTheme():"light"===theme&&switchToLightTheme(),darkModeToggle.addEventListener("change",()=>{(darkModeToggle.checked?switchToDarkTheme:switchToLightTheme)()});const showPW=document.querySelector(".showPW"),username=document.querySelector("#username"),password=document.querySelector("#password"),loginBtn=document.querySelector("#loginBtn");function validateEmail(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}username.addEventListener("input",e=>{validateEmail(username.value.trim())?(password.removeAttribute("disabled"),loginBtn.removeAttribute("disabled"),loginBtn.classList.add("activate")):(password.setAttribute("disabled",!0),loginBtn.setAttribute("disabled",!0),loginBtn.classList.remove("activate"))}),showPW.addEventListener("click",e=>{const t=document.querySelector(e.target.dataset.target);"password"===t.type?(t.type="text",e.target.textContent="visibility"):(t.type="password",e.target.textContent="visibility_off")});