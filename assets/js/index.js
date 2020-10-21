var urlItems = "https://br.ongame.net/api/challenge/items/"; //Sua URL
var rewardsDiv = document.getElementById('rewardsDiv');

var xhttp = new XMLHttpRequest();
xhttp.open("GET", urlItems, false);
xhttp.send(); //A execução do script pára aqui até a requisição retornar do servidor

var items = JSON.parse(xhttp.responseText);

for (var item in items) {
    let newItems = document.createElement('div');
    newItems.classList.add('item');
    newItems.id = items[item].id;

    // DIV IMAGE + Childs
    let newItemImageDiv = document.createElement('div');
    newItemImageDiv.classList.add('image');

    let newItemsImage = document.createElement('img');
    newItemsImage.src = items[item].image;
    newItemsImage.alt = 'item picture';
    // INSERT IMAGE IN IMAGE DIV
    newItemImageDiv.appendChild(newItemsImage);

    // DIV DESCRIPTION + Childs
    let newDescriptionDiv = document.createElement('div');
    newDescriptionDiv.classList.add('description');

    let newNameButtonDiv = document.createElement('div');
    newNameButtonDiv.classList.add('name-button');
    newDescriptionDiv.appendChild(newNameButtonDiv)

    let newItemName = document.createElement('p');
    newItemName.innerHTML = items[item].name;
    newNameButtonDiv.appendChild(newItemName);

    let newButtonReedem = document.createElement('button');
    newButtonReedem.innerHTML = 'RESGATAR';
    newNameButtonDiv.appendChild(newButtonReedem);

    let newProgressBar = document.createElement('span');
    newProgressBar.classList.add('progress-bar');
    newDescriptionDiv.appendChild(newProgressBar);

    rewardsDiv.appendChild(newItems);
    newItems.appendChild(newItemImageDiv);
    newItems.appendChild(newDescriptionDiv);

}

console.log(items);