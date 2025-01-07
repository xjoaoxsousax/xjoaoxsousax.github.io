fetch('https://api.carrismetropolitana.pt/gtfs/routes')
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Exibe as rotas no console
    // Aqui podemos começar a filtrar e mostrar a linha no mapa
  })
  .catch(error => {
    console.error('Erro ao acessar a API:', error);
  });
