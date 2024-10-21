const btnAdmin = document.getElementById("btn-admin");


btnAdmin.addEventListener("click", () => {
    document.cookie = 'jwt=; Path=/; Expires=Thu, 18 Jan 2020 00:00:00 GMT'
    document.location.href = ("/")
})