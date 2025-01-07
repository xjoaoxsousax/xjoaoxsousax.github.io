function searchLine() {
  const line = document.getElementById("lineInput").value.trim();
  
  if (!line) {
    alert("Por favor, insira o número da linha.");
    return;
  }

  const url = "https://api.carrismetropolitana.pt/gtfs/routes";  // Endpoint para as rotas

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Filtra as rotas com base no número da linha
      const filteredRoutes = data.routes.filter(route => route.route_id.includes(line));
      
      if (filteredRoutes.length === 0) {
        alert("Nenhuma rota encontrada para o número da linha informado.");
        return;
      }

      displayRoutes(filteredRoutes);
    })
    .catch(error => {
      console.error("Erro ao buscar as rotas:", error);
      alert("Erro ao buscar as rotas. Tente novamente mais tarde.");
    });
}

function displayRoutes(routes) {
  const routesContainer = document.getElementById("routesContainer");
  routesContainer.innerHTML = '';  // Limpa o container antes de adicionar novas rotas

  routes.forEach(route => {
    const routeElement = document.createElement("div");
    routeElement.textContent = `ID: ${route.route_id} - Nome: ${route.route_long_name}`;
    routesContainer.appendChild(routeElement);
  });
}
