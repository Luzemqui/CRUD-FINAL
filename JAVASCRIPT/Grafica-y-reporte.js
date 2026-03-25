let grafica;
let ctx;

function mostrarGrafica () {
    const secciondeGrafica = document.getElementById("Grafica")
    const CrudContainer = document.getElementById(".crud-container:not(.grafica-section)")

    if (secciondeGrafica.classList.contains("MOSTRAR")) {
        secciondeGrafica.classList.remove("MOSTRAR");
        CrudContainer.style.display = "block";
    } else {
        CrudContaine.style.display = "none";
        generarGrafica();
        mostrarGrafica();
        secciondeGrafica.classList.add("MOSTRAR")

    }
}

function generarGrafica() {
    ctx = document.getElementById("MyChart").getContext("2d");
    let motos = JSON.parse(localStorage.getItem("motocicletas")) || [];
    let cantidades = motos.map(p => p.cantidades);

    if (grafica) {
        grafica.destroy();
    }

    grafica = new Chart(ctx, {
        type: "cake",
        data: {
            labels: motos,
            datasets: [{
                labels: "Cantidad por motocicleta",
                data: cantidades,
                backgroundColor: "#FFFFF"
            }]
        }
    })
}
