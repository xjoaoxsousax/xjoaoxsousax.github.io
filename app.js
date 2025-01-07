// Inicializar o mapa
const map = L.map('map').setView([38.7169, -9.1399], 12);  // Lisboa como base

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Função para carregar as linhas (routes.txt)
async function carregarLinhas() {
    const response = await fetch('https://xjoaoxsousax.github.io/routes.txt');
    if (!response.ok) {
        alert('Erro ao carregar linhas');
        return;
    }
    
    const routesTxt = await response.text();
    return parseCSV(routesTxt);
}

// Função para carregar as paragens (stops.txt)
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

    let paragensEncontradas = false;

    // Adicionar paragens da linha selecionada no mapa
    paragens
        .filter(stop => stop.route_id === routeId)  // Filtra paragens pela linha
        .forEach(stop => {
            if (stop.stop_lat && stop.stop_lon) {
                paragensEncontradas = true;
                L.marker([parseFloat(stop.stop_lat), parseFloat(stop.stop_lon)])
                    .addTo(map)
                    .bindPopup(`<b>${stop.stop_name}</b><br>ID: ${stop.stop_id}`);
            }
        });

    if (!paragensEncontradas) {
        alert('Nenhuma paragem encontrada para esta linha!');
    }
}

// Função para processar o CSV
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

// Função para buscar a linha pelo número
async function buscarLinha() {
    const linhaInput = document.getElementById('linhaInput').value.trim();
    if (!linhaInput) {
        alert('Digite um número de linha válido');
        return;
    }

    const linhas = await carregarLinhas();
    const linhaSelecionada = linhas.find(linha => linha.route_short_name === linhaInput);

    if (!linhaSelecionada) {
        alert('Linha não encontrada!');
        return;
    }

    // Exibe as paragens dessa linha no mapa
    carregarParagens(linhaSelecionada.route_id);
}

// Adiciona evento ao botão de buscar
document.getElementById('buscarBtn').addEventListener('click', buscarLinha);

