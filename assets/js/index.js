var urlItems = "https://br.ongame.net/api/challenge/items/";
var rewardsDiv = document.getElementById('rewardsDiv');

var xhttp = new XMLHttpRequest();
xhttp.open("GET", urlItems, false);
xhttp.send();

var items = JSON.parse(xhttp.responseText);

for (var item in items) {
    let percentage = items[item].percentage;
    let newItems = document.createElement('div');
    newItems.classList.add('item');
    newItems.id = items[item].id;

    // DIV IMAGE + Childs
    let newItemImageDiv = document.createElement('div');
    newItemImageDiv.classList.add('image');

    let newItemsImage = document.createElement('img');
    newItemsImage.src = items[item].image;
    newItemsImage.style.width = "100%";
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

    // BUTTON
    if (!items[item].redeemed) {
        let newButtonReedem = document.createElement('button');
        newButtonReedem.innerHTML = 'RESGATAR';
        newNameButtonDiv.appendChild(newButtonReedem);
    } else {
        let newButtonReedemed = document.createElement('p');
        newButtonReedemed.innerHTML = "ITEM RESGATADO";
        newNameButtonDiv.appendChild(newButtonReedemed);
    }

    // PROGRESS BAR 
    if (!items[item].redeemed) {
        let newProgressBar = document.createElement('span');
        newProgressBar.classList.add('progress-bar');
        newProgressBar.style.width = percentage + "%";
        newDescriptionDiv.appendChild(newProgressBar);
    }

    rewardsDiv.appendChild(newItems);
    newItems.appendChild(newItemImageDiv);
    newItems.appendChild(newDescriptionDiv);

}

console.log(items);