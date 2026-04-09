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
    let motos = JSON.parse(localStorage.getItem('motocicletas')) || [];
    let modelo = motos.map(p => p.modelo);
    let cantidades = motos.map(p => p.cantidad);

    if (grafica) {
        grafica.destroy();
    }

    grafica = new Chart(ctx, {
type: 'pie',
        data: {
            labels: modelo,
            datasets: [{
                label: 'Cantidad por Motocicleta',
                data: cantidades,
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

function mostrarPersonasRegistradas() {
    let usuarios = JSON.parse(localStorage.getItem('userData')) || [];
    let tablaUsuarios = document.getElementById('tablaUsuarios');
    
    if (tablaUsuarios) {
        tablaUsuarios.innerHTML = '';
        if (usuarios.length === 0) {
            tablaUsuarios.innerHTML = '<tr><td colspan="2" class="text-center">No hay usuarios registrados</td></tr>';
        } else {
            usuarios.forEach((user, index) => {
                tablaUsuarios.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${user.username}</td>
                    </tr>
                `;
            });
        }
    }
}

function generarReporteCompleto() {
    let personas = JSON.parse(localStorage.getItem('motocicletas')) || [];
    let usuarios = JSON.parse(localStorage.getItem('userData')) || [];
    
    
    let totalMotos = personas.reduce((sum, p) => sum + parseInt(p.cantidad || 0), 0);
    let totalPrecio = personas.reduce((sum, p) => sum + (parseFloat(p.precio || 0) * parseInt(p.cantidad || 0)), 0);
    let numUsers = usuarios.length;
    let marcas = [...new Set(personas.map(p => p.marca).filter(m => m))].join(', ');
    
    document.getElementById('resumenReporte').innerHTML = `
        <div class="col-md-6">
            <h6><strong>Usuarios Registrados:</strong> ${numUsers}</h6>
        </div>
        <div class="col-md-6">
            <h6><strong>Total Motocicletas:</strong> ${totalMotos}</h6>
        </div>
        <div class="col-md-6">
            <h6><strong>Precio Total Aprox:</strong> $${totalPrecio.toLocaleString('es-ES')}</h6>
        </div>
        <div class="col-md-6">
            <h6><strong>Marcas:</strong> ${marcas || 'Ninguna'}</h6>
        </div>
    `;
    

    let tbody = document.querySelector('#tablaReporte tbody');
    tbody.innerHTML = '';
    
    if (personas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No hay motocicletas registradas</td></tr>';
    } else {
        personas.forEach((p, index) => {
            let subtotal = parseFloat(p.precio || 0) * parseInt(p.cantidad || 0);
            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>$${parseFloat(p.precio || 0).toLocaleString('es-ES')}</td>
                    <td>${p.cantidad || 0}</td>
                    <td>${p.placa || ''}</td>
                    <td>${p.marca || ''}</td>
                    <td>${p.modelo || ''}</td>
                    <td>$${subtotal.toLocaleString('es-ES')}</td>
                </tr>
            `;
        });
    }
}

function reporte() {
    let personas = JSON.parse(localStorage.getItem('motocicletas')) || [];
    let users = JSON.parse(localStorage.getItem('userData')) || [];
    
    let totalMotos = personas.reduce((sum, p) => sum + parseInt(p.cantidad || 0), 0);
    let totalPrecio = personas.reduce((sum, p) => sum + (parseFloat(p.precio || 0) * parseInt(p.cantidad || 0)), 0);
    let numUsers = users.length;
    let marcas = [...new Set(personas.map(p => p.marca).filter(m => m))].join(', ');
    
    let detalleRows = '';
    if (personas.length === 0) {
        detalleRows = '<tr><td colspan="8" class="text-center">No hay motocicletas registradas</td></tr>';
    } else {
        personas.forEach((p, index) => {
            let subtotal = parseFloat(p.precio || 0) * parseInt(p.cantidad || 0);
            detalleRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>$${parseFloat(p.precio || 0).toLocaleString('es-ES')}</td>
                    <td>${p.cantidad || 0}</td>
                    <td>${p.placa || ''}</td>
                    <td>${p.marca || ''}</td>
                    <td>${p.modelo || ''}</td>
                    <td>$${subtotal.toLocaleString('es-ES')}</td>
                </tr>
            `;
        });
    }

    let content = `
        <div class="row mb-3">
            <div class="col-md-6">
                <h6><strong>Usuarios Registrados:</strong> ${numUsers}</h6>
            </div>
            <div class="col-md-6">
                <h6><strong>Total Motocicletas:</strong> ${totalMotos}</h6>
            </div>
            <div class="col-md-6">
                <h6><strong>Precio Total Aprox:</strong> $${totalPrecio.toLocaleString('es-ES')}</h6>
            </div>
            <div class="col-md-6">
                <h6><strong>Marcas:</strong> ${marcas || 'Ninguna'}</h6>
        </div>

        <hr>

        <h6><strong>Detalle Completo por Motocicleta:</strong></h6>
        <div class="table-responsive">
            <table class="table table-bordered table-sm">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>${detalleRows}</tbody>
            </table>
        </div>
    `;
    
    document.getElementById('reporteContent').innerHTML = content;
    let modal = new bootstrap.Modal(document.getElementById('reporteModal'));
    modal.show();
}

function generarReporte() {
    reporte();
}
