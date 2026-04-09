let grafica;
let ctx;

function toggleGrafica() {
    const graficaSection = document.getElementById('graficaSection');
    const crudContainer = document.querySelector('.crud-container');
    
    if (graficaSection.classList.contains('show')) {
        graficaSection.classList.remove('show');
        crudContainer.style.display = 'block';
    } else {
        crudContainer.style.display = 'none';
        generarGrafica();
        graficaSection.classList.add('show');
    }
}

function toggleReporte() {
    const reporteSection = document.getElementById('reporteSection');
    const crudContainer = document.querySelector('.crud-container');
    
    if (reporteSection.classList.contains('show')) {
        reporteSection.classList.remove('show');
        crudContainer.style.display = 'block';
    } else {
        crudContainer.style.display = 'none';
        generarReporteCompleto();
        reporteSection.classList.add('show');
    }
}

function generarGrafica() {
    ctx = document.getElementById('myChart').getContext('2d');
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let nombres = clientes.map(p => p.nombre);
    let precios = clientes.map(p => parseFloat(p.precio) || 0);

    if (grafica) {
        grafica.destroy();
    }

    grafica = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: nombres,
            datasets: [{
                label: 'Precio por Cliente',
                data: precios,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                    'rgba(83, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function generarReporteCompleto() {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    
    
    let totalPrecio = clientes.reduce((sum, p) => sum + (parseFloat(p.precio || 0)), 0);
    let marcas = [...new Set(clientes.map(p => p.marca).filter(m => m))].join(', ');
    
    document.getElementById('resumenReporte').innerHTML = `
        <div class="col-md-6">
            <h6><strong>Total Clientes:</strong> ${clientes.length}</h6>
        </div>
        <div class="col-md-6">
            <h6><strong>Precio Total:</strong> $${totalPrecio.toLocaleString('es-ES')}</h6>
        </div>
        <div class="col-md-6">
            <h6><strong>Marcas:</strong> ${marcas || 'Ninguna'}</h6>
        </div>
    `;
    
 
    let tbody = document.querySelector('#tablaReporte tbody');
    tbody.innerHTML = '';
    
    if (clientes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No hay clientes registrados</td></tr>';
    } else {
        clientes.forEach((p, index) => {
            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${p.nombre || ''}</td>
                    <td>$${parseFloat(p.precio || 0).toLocaleString('es-ES')}</td>
                    <td>${p.placa || ''}</td>
                    <td>${p.marca || ''}</td>
                    <td>${p.modelo || ''}</td>
                    <td>$${parseFloat(p.precio || 0).toLocaleString('es-ES')}</td>
                </tr>
            `;
        });
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
