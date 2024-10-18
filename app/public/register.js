const form = document.getElementById("form-register");

form.addEventListener("submit", async (e) => {
    try {
        const res = await fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: e.target.children[0].querySelector('#user').value,
                email: e.target.children[1].querySelector('#email').value,
                password: e.target.children[2].querySelector('#password').value
            })
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Registro exitoso:", data);
    } catch (error) {
        console.error("Hubo un problema con la petición:", error);
    }



});
