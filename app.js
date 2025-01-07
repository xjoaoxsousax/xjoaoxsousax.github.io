async function carregarParagens() {
    const response = await fetch('https://xjoaoxsousax.github.io/stops.txt');
    if (!response.ok) {
        alert('Erro ao carregar paragens');
        return;
    }
    
    const stopsTxt = await response.text();
    const paragens = parseCSV(stopsTxt);
    
    paragens.forEach(stop => {
        console.log(`Paragem: ${stop.stop_name} | Latitude: ${stop.stop_lat} | Longitude: ${stop.stop_lon}`);
    });
}

// Função de CSV para Objeto (já usada para routes.txt)
function parseCSV(csvText) {
    const linhas = csvText.split('\n').map(row => row.split(','));
    const headers = linhas.shift();
    return linhas.map(linha => {
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = linha[index];
        });
        return obj;
    });
}

// Carregar paragens ao iniciar
carregarParagens();
