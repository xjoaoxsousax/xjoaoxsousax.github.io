<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rotas de Transporte</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Rotas de Transporte</h1>
    </header>

    <div id="seletor-linha">
        <label for="linha">Escolha uma linha:</label>
        <select id="linha">
            <!-- As opções serão preenchidas via JavaScript -->
        </select>
    </div>

    <div id="informacoes-linha">
        <h2>Informações da Linha</h2>
        <p id="informacoes">Selecione uma linha para ver as informações.</p>
    </div>

    <div id="estimativas">
        <h2>Estimativas de Chegada</h2>
        <ul id="estimativas-lista">
            <!-- As estimativas serão preenchidas via JavaScript -->
        </ul>
    </div>

    <div id="mapa"></div>

    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
    <script src="script.js"></script>
</body>
</html>

