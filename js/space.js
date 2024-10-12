document.getElementById('btnBuscar').addEventListener('click', buscarImagenes);

function buscarImagenes() {
  const query = document.getElementById('inputBuscar').value;
  
  if (!query.trim()) {
    alert("Por favor ingresa un término de búsqueda");
    return;
  }

  const url = `https://images-api.nasa.gov/search?q=${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      mostrarResultados(data.collection.items);
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
}

function mostrarResultados(items) {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = ''; // Limpiar resultados anteriores
  
  if (items.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
    return;
  }

  const row = document.createElement('div');
  row.classList.add('row');

  items.forEach(item => {
    const data = item.data[0];
    const link = item.links ? item.links[0].href : '';

    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-4'); // Columnas de 4u por fila

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card', 'h-100');

    tarjeta.innerHTML = `
      <img src="${link}" class="card-img-top" alt="${data.title}" style="max-height: 200px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text" style="overflow: hidden; max-height: 100px;">${data.description || 'No description available'}</p>
        <p class="card-text"><small class="text-muted">Fecha: ${new Date(data.date_created).toLocaleDateString()}</small></p>
      </div>
    `;

    col.appendChild(tarjeta);
    row.appendChild(col);
  });

  contenedor.appendChild(row);
}
