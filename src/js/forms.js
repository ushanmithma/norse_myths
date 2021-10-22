
const showPW = document.querySelector('.showPW');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('#loginBtn');

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

username.addEventListener('input', (event) => {
    if (validateEmail(username.value.trim())) {
        password.removeAttribute('disabled');
        loginBtn.removeAttribute('disabled');
        loginBtn.classList.add('activate');
    } else {
        password.setAttribute('disabled', true);
        loginBtn.setAttribute('disabled', true);
        loginBtn.classList.remove('activate');
    }
});

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