// Inicializar o mapa
const map = L.map('map').setView([38.7169, -9.1399], 12);  // Lisboa como base

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Carregar linhas do routes.txt
async function carregarLinhas() {
    const response = await fetch('https://xjoaoxsousax.github.io/routes.txt');
    if (!response.ok) {
        alert('Erro ao carregar linhas');
        return;
    }
    
    const routesTxt = await response.text();
    const linhas = parseCSV(routesTxt);

    const select = document.getElementById('linhaSelect');
    linhas.forEach(route => {
        const option = document.createElement('option');
        option.value = route.route_id;
        option.textContent = `${route.route_short_name} - ${route.route_long_name}`;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        const linhaSelecionada = e.target.value;
        if (linhaSelecionada) {
            carregarParagens(linhaSelecionada);
        }
    });
}

// Carregar paragens do stops.txt
async function carregarParagens(routeId) {
    const response = await fetch('https://xjoaoxsousax.github.io/stops.txt');
    if (!response.ok) {
        alert('Erro ao carregar paragens');
        return;
    }
    
    const stopsTxt = await response.text();
    const paragens = parseCSV(stopsTxt);
    
    // Limpar paragens anteriores no mapa
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Adicionar paragens da linha selecionada
    paragens
        .filter(stop => stop.route_id === routeId)  // Filtra por linha
        .forEach(stop => {
            L.marker([stop.stop_lat, stop.stop_lon])
                .addTo(map)
                .bindPopup(`<b>${stop.stop_name}</b><br>ID: ${stop.stop_id}`);
        });
}

// Função para converter CSV para Objeto
function parseCSV(csvText) {
    const linhas = csvText.trim().split('\n').map(row => row.split(','));
    const headers = linhas.shift();
    return linhas.map(linha => {
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = linha[index];
        });
        return obj;
    });
}

// Carregar linhas ao iniciar
carregarLinhas();
