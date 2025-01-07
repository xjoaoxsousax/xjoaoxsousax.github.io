// Inicializar o mapa com a biblioteca Leaflet
const map = L.map('map').setView([38.7169, -9.1395], 12);  // Posição inicial em Lisboa

// Adicionar o layer do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Função para buscar a linha com base no número inserido
function searchLine() {
  const lineNumber = document.getElementById('lineSearch').value.trim();

  if (!lineNumber) {
    alert('Por favor, insira um número de linha!');
    return;
  }

  // Consultar a API da Carris para obter a rota
  fetch(`https://api.carrismetropolitana.pt/gtfs/routes?route_id=${lineNumber}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        alert('Nenhuma linha encontrada para esse número.');
        return;
      }

      // Limpar o mapa antes de desenhar a nova rota
      map.eachLayer(function (layer) {
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });

      // Desenhar a rota no mapa
      data.forEach(route => {
        const latLngs = route.shape.map(stop => [stop.lat, stop.lon]);

        // Desenhar a linha no mapa com a cor amarela
        const routeLayer = L.polyline(latLngs, { color: 'yellow' }).addTo(map);
        map.fitBounds(routeLayer.getBounds());  // Ajustar o mapa para a extensão da linha
      });
    })
    .catch(error => {
      console.error('Erro ao buscar a linha:', error);
      alert('Ocorreu um erro ao tentar buscar a linha.');
    });
}
