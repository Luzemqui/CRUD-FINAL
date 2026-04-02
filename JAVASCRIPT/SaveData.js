let users = JSON.parse(localStorage.getItem('users')) || [];
let admin = JSON.parse(localStorage.getItem('admin')) || {username: 'ADMIN', password: 'ADMIN'};

function registerUser() {
  let username = document.getElementById('username').value.trim();
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  if (!username || !password || !confirmPassword) {
    alert('Todos los campos son obligatorios');
    return;
  }

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  if (users.some(u => u.username === username)) {
    alert('El usuario ya existe');
    return;
  }

  if (username === "ADMIN") {
    alert('El nombre de usuario no puede ser "ADMIN"');
    return;
  }

  users.push({username, password});
  localStorage.setItem('users', JSON.stringify(users));
  alert('Usuario registrado correctamente');
  window.location.href = 'login.html';
}

function loginUser() {
  let username = document.getElementById('loginUsername').value.trim();
  let password = document.getElementById('loginPassword').value;

  if (!username || !password) {
    alert('Usuario y contraseña requeridos');
    return;
  }

  let user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('userSession', JSON.stringify({type: 'user', username}));
    alert('Login exitoso');
    window.location.href = 'Principal.html';
  } else {
    alert('Credenciales inválidas');
  }
}

if (personas.getElementById("ADMIN")) {
    
    function guardar() {

        let apellido = document.getElementById("apellido").value;
        let edad = document.getElementById("edad").value;
        let placa = document.getElementById("placa").value;
        let marca = document.getElementById("marca").value;
        let modelo = document.getElementById("modelo").value;

        if (nombre === "" || apellido === "" || placa === "" || edad === "") {
            alert("Todos los campos son obligatorios");
        } else {

            let persona = {
                apellido: apellido,
                edad: edad,
                placa: placa,
                marca: marca,
                modelo: modelo,

            };

            personas.push(persona);
            limpiar();
            mostrar();
        }
    }

    function mostrar() {
        let tabla = document.getElementById("tabla");
        tabla.innerHTML = "";


        for (let i = 0; i < personas.length; i++) {

            tabla.innerHTML += `
                <tr>
                    <td>${personas[i].apellido}</td>
                    <td>${personas[i].edad}</td>
                    <td>${personas[i].placa}</td>
                    <td>${personas[i].marca}</td>
                    <td>${personas[i].modelo}</td>

                    <td>
                        <button class="btn btn-info btn-sm" onclick="editar(${i})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminar(${i})">Eliminar</button>
                    </td>
                </tr>
            `;
        }
    }

    function editar(i) {
        document.getElementById("apellido").value = personas[i].apellido;
        document.getElementById("edad").value = personas[i].edad;
        document.getElementById("placa").value = personas[i].placa;
        document.getElementById("marca").value = personas[i].marca;
        document.getElementById("modelo").value = personas[i].modelo;
  
        document.getElementById("indice").value = i;
    }

    function actualizar() {

        let i = document.getElementById("indice").value;
        let apellido = document.getElementById("apellido").value;
        let edad = document.getElementById("edad").value;
        let placa = document.getElementById("placa").value;
        let marca = document.getElementById("marca").value;
        let modelo = document.getElementById("modelo").value;
      

        if (apellido === "" || edad  === "" || placa === "" || marca === "" || modelo === "") {
            alert("No se pueden dejar campos vacíos");
        } else {

            personas[i].apellido = apellido;
            personas[i].edad = edad;
            personas[i].placa = placa;
            personas[i].marca = marca;
            personas[i].modelo = modelo;

            limpiar();
            mostrar();          
        }
    }

        function eliminar(i) {

            if (confirm("¿Desea eliminar el registro?")) {
                personas.splice(i, 1);
                mostrar();
            }
        }

    function limpiar() {
        document.getElementById("apellido").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("placa").value = "";
        document.getElementById("marca").value = "";
        document.getElementById("modelo").value = "";


        document.getElementById("indice").value = "";
    }
}
function adminLogin() {
    let username = document.getElementById("AdminUsername").value.trim();
    let password = document.getElementById("AdminPassword").value;

    if (!username || !password) {
        alert("Todos los datos son obligatorios");
        return;
    } 

    if (username === admin.username && password === admin.password) {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "CRUD.html";
    } else {
        alert("Usuario o contraseña incorrectos. Admin: ADMIN / ADMIN");
    }
}

function checkAdminAuth() {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
        alert("Acceso denegado. Redirigiendo al login...");
        window.location.href = "admin-login.html";
    }
}

function logoutAdmin() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "Principal.html";
}