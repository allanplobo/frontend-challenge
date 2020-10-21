var urlItems = "https://br.ongame.net/api/challenge/items/"; //Sua URL

var xhttp = new XMLHttpRequest();
xhttp.open("GET", urlItems, false);
xhttp.send(); //A execução do script pára aqui até a requisição retornar do servidor

var items = xhttp.responseText

items = JSON.parse(items)

console.log(items);