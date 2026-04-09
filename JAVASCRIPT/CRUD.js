let personas = JSON.parse(localStorage.getItem('motocicletas')) || [];

function guardar() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("Precio").value;
    let cantidad = document.getElementById("cantidad").value;
    let placa = document.getElementById("placa").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;

    if (nombre === "" || precio === "" || cantidad === "" || placa === "" || marca === "" || modelo === "") {
        alert("Todos los campos son obligatorios");
    } else {

        let persona = {
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            placa: placa,
            marca: marca,
            modelo: modelo
        };

        personas.push(persona);
        localStorage.setItem('motocicletas', JSON.stringify(personas));
        limpiar();
        mostrar();
    }
}

function mostrar() {
    personas = JSON.parse(localStorage.getItem('motocicletas')) || [];
    let tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    for (let i = 0; i < personas.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${personas[i].nombre}</td>
                <td>$${personas[i].precio}</td>
                <td>${personas[i].cantidad}</td>
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
    document.getElementById("Precio").value = personas[i].precio;
    document.getElementById("cantidad").value = personas[i].cantidad;
    document.getElementById("placa").value = personas[i].placa;
    document.getElementById("marca").value = personas[i].marca;
    document.getElementById("modelo").value = personas[i].modelo;
  
    document.getElementById("indice").value = i;
}

function actualizar() {
    let i = document.getElementById("indice").value;
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("Precio").value;
    let cantidad = document.getElementById("cantidad").value;
    let placa = document.getElementById("placa").value;
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;

    if (nombre === "" || precio === "" || cantidad === "" || placa === "" || marca === "" || modelo === "") {
        alert("No se pueden dejar campos vacíos");
    } else {
        personas[i].precio = precio;
        personas[i].cantidad = cantidad;
        personas[i].placa = placa;
        personas[i].marca = marca;
        personas[i].modelo = modelo;

        localStorage.setItem('motocicletas', JSON.stringify(personas));
        limpiar();
        mostrar();
    }
}

function eliminar(i) {
    if (confirm("¿Desea eliminar el registro?")) {
        personas.splice(i, 1);
        localStorage.setItem('motocicletas', JSON.stringify(personas));
        mostrar();
    }
}

function limpiar() {
    document.getElementById("Precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("indice").value = "";
}
