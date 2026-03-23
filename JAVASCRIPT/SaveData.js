let usuarios = JSON.parse(localStorage.getItem("userData")) || []
let admin = JSON.parse(localStorage.getItem("adminData")) || {usernme: "ADMIN", password: "ADMIN"};

function saveData() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (username === "" || password === "") {
        alert("Todos los datos son obligatorios");
        return;
    }
    if 
            (confirmPassword !== password) {
        alert("Las contraseñas no coinciden");
        return;
    }
    let nuevoU = {username, password};

    if (username === admin.username) {
        alert("El usuario no puede ser ADMIN o admin");
        return;
    }
    if (usuarios.some(u => u.username === username)) {
        alert("El nombre de usuario ya existe");
        return;
    }

    usuarios.push({username, password});
    localStorage.setItem("userdata", JSON.stringify("usuarios"));
    alert("Usuario registrado exitosamente");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm-password").value = "";
}

function Login() {
    let usuarios = JSON.parse(localStorage.getItem("userData")) || [];
    let password = document.getElementById("password").value;

    if (!usuarios || !password) {
        alert("Por favor, ingrese su nombre de usuario y contraseña");
        return;
    }

    let user = usuarios.find(u => u.username === username && u.password === password);
    if (!user) {
        alert("Nombre de usuario o contraseña incorrectos");
        return;
    }

    alert("Inicio de sesión exitoso");
}

function adminLogin() {
    let admin = document.getElementById("username").value.trim
    let adminP = document.getElementById("password").value;

    if (admin === "" || adminP === "") {
        alert("Todos los datos son obligatorios");
        return;
    } 

    if (admin === admin.username && adminP === admin.password) {
        alert("Inicio de sesión exitoso");
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "CRUD.html";
    } else {
        alert("Usuario o contraseña incorrectos.")
    }
}

function OutAdmin() {
    localStorage.removeItem("adminLoggedIn");
    alert("Cierre de sesión exitoso");
    window.location.href = "Principal.html";
}