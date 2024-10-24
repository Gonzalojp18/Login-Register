const mensajeError = document.getElementsByClassName("hidd")[0];
const formLogin = document.getElementById("login-form");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = e.target.querySelector("#user").value;
    const password = e.target.querySelector("#password").value;

    console.log(user);
    console.log(password);
    const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: e.target.querySelector('#user').value,
            password: e.target.querySelector('#password').value
        })
    });
    if (!res.ok) return mensajeError.classList.toggle('mensaje-error', false);

    const data = await res.json();
    if(data.redirect){
        window.location.href = data.redirect;
    }

})