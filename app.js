const map = L.map('map').setView([38.74, -9.19], 12); // Centro de Lisboa

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let routeLayer; // Layer para desenhar a linha no mapa

// Função para carregar as linhas na dropdown
async function carregarLinhas() {
    const response = await fetch('https://api.carrismetropolitana.pt/gtfs/routes');
    const data = await response.json();
    
    const select = document.getElementById('linhaSelect');
    data.forEach(route => {
        const option = document.createElement('option');
        option.value = route.route_id;
        option.textContent = `${route.route_short_name} - ${route.route_long_name}`;
        select.appendChild(option);
    });
}

// Função para buscar e desenhar a rota selecionada
async function desenharRota(routeId) {
    if (routeLayer) {
        map.removeLayer(routeLayer); // Remove rota anterior
    }

    const response = await fetch(`https://api.carrismetropolitana.pt/gtfs/trips?route_id=${routeId}`);
    const data = await response.json();

    if (data && data.length > 0) {
        const coordinates = data[0].shape.map(coord => [coord.lat, coord.lon]);

        routeLayer = L.polyline(coordinates, {
            color: 'blue',
            weight: 5
        }).addTo(map);

        map.fitBounds(routeLayer.getBounds());
    } else {
        alert('Nenhuma rota encontrada para esta linha.');
    }
}

// Evento para detectar a mudança na seleção
document.getElementById('linhaSelect').addEventListener('change', (event) => {
    const linhaSelecionada = event.target.value;
    if (linhaSelecionada) {
        desenharRota(linhaSelecionada);
    }
});

// Carregar linhas ao iniciar
carregarLinhas();
