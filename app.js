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

  // Consultar as rotas disponíveis na API
  fetch('https://api.carrismetropolitana.pt/gtfs/routes')
    .then(response => response.json())
    .then(data => {
      // Procurar a linha solicitada
      const route = data.find(route => route.route_short_name == lineNumber);

      if (!route) {
        alert('Nenhuma linha encontrada para esse número.');
        return;
      }

      // Consultar as formas de deslocamento dessa linha
      fetch(`https://api.carrismetropolitana.pt/gtfs/shapes?route_id=${route.route_id}`)
        .then(response => response.json())
        .then(shapeData => {
          if (shapeData.length === 0) {
            alert('Não foi possível encontrar a forma da linha.');
            return;
          }

          // Limpar o mapa antes de desenhar a nova rota
          map.eachLayer(function (layer) {
            if (layer instanceof L.Polyline) {
              map.removeLayer(layer);
            }
          });

          // Desenhar a rota no mapa
          const latLngs = shapeData.map(stop => [stop.shape_pt_lat, stop.shape_pt_lon]);

          // Desenhar a linha no mapa com a cor amarela
          const routeLayer = L.polyline(latLngs, { color: 'yellow' }).addTo(map);
          map.fitBounds(routeLayer.getBounds());  // Ajustar o mapa para a extensão da linha
        })
        .catch(error => {
          console.error('Erro ao buscar a forma da linha:', error);
          alert('Ocorreu um erro ao tentar buscar os dados da linha.');
        });
    })
    .catch(error => {
      console.error('Erro ao buscar as rotas:', error);
      alert('Ocorreu um erro ao tentar buscar as rotas.');
    });
}

