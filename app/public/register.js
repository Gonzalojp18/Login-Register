const mensajeError = document.getElementsByClassName("hidd")[0];
console.log(mensajeError)
const form = document.getElementById("form-register");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // console.log(e.target.querySelector('#user').value)
    // console.log(e.target.querySelector('#email').value)
    // console.log(e.target.querySelector('#password').value)
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: e.target.querySelector('#user').value,
                email: e.target.querySelector('#email').value,
                password: e.target.querySelector('#password').value
            })
        });
        if (!res.ok) return mensajeError.classList.toggle('mensaje-error', false);
        const data = await res.json();
        if(data.redirect){
            window.location.href = data.redirect;
        }
});
