let personas = JSON.parse(localStorage.getItem('clientes')) || [];

function guardar() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let placa = document.getElementById("placa").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;

    if (nombre === "" || precio === "" || placa === "" || modelo === "" || marca === "") {
        alert("Todos los campos son obligatorios");
    } else {
        let persona = {
            nombre: nombre,
            precio: precio,
            placa: placa,
            marca: marca,
            modelo: modelo
        };

        personas.push(persona);
        localStorage.setItem('clientes', JSON.stringify(personas));
        limpiar();
        mostrar();
    }
}

function mostrar() {
    personas = JSON.parse(localStorage.getItem('clientes')) || [];
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    for (let i = 0; i < personas.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${personas[i].nombre}</td>
                <td>$${personas[i].precio}</td>
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
    document.getElementById("nombre").value = personas[i].nombre;
    document.getElementById("precio").value = personas[i].precio;
    document.getElementById("placa").value = personas[i].placa;
    document.getElementById("marca").value = personas[i].marca;
    document.getElementById("modelo").value = personas[i].modelo;
  
    document.getElementById("indice").value = i;
}

function actualizar() {
    let i = document.getElementById("indice").value;
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let placa = document.getElementById("placa").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;

    if (nombre === "" || precio === "" || placa === "" || marca === "" || modelo === "") {
        alert("No se pueden dejar campos vacíos");
    } else {
        personas[i].nombre = nombre;
        personas[i].precio = precio;
        personas[i].placa = placa;
        personas[i].marca = marca;
        personas[i].modelo = modelo;

        localStorage.setItem('clientes', JSON.stringify(personas));
        limpiar();
        mostrar();
    }
}

function eliminar(i) {
    if (confirm("¿Desea eliminar el registro?")) {
        personas.splice(i, 1);
        localStorage.setItem('clientes', JSON.stringify(personas));
        mostrar();
    }
}

function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("indice").value = "";
}
