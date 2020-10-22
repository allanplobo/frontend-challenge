const urlItems = "https://br.ongame.net/api/challenge/items/";
var rewardsDiv = document.getElementById('rewardsDiv');

var xhttp = new XMLHttpRequest();
xhttp.open("GET", urlItems, true);
xhttp.onload = function(e) {
    if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
            console.log(xhttp.responseText);
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

                // SUPERIOR DIV OF DESCRIPTION
                let newNameButtonDiv = document.createElement('div');
                newNameButtonDiv.classList.add('name-button');
                newDescriptionDiv.appendChild(newNameButtonDiv)

                let newItemName = document.createElement('p');
                newItemName.classList.add('item-name');
                newItemName.innerHTML = items[item].name;
                newNameButtonDiv.appendChild(newItemName);

                // BUTTON + PROGRESS BAR
                if (items[item].percentage < 100 && !items[item].redeemed) {
                    let newReedemButton = document.createElement('button');
                    let newProgressBar = document.createElement('span');

                    newReedemButton.innerHTML = 'RESGATAR';
                    newNameButtonDiv.appendChild(newReedemButton);

                    newProgressBar.classList.add('progress-bar');
                    newProgressBar.style.width = percentage + "%";
                    newDescriptionDiv.appendChild(newProgressBar);

                } else if (items[item].percentage == 100 && !items[item].redeemed) {
                    let newCanReedemButton = document.createElement('button');
                    let newProgressBar = document.createElement('span');


                    newCanReedemButton.innerHTML = 'RESGATAR';
                    newCanReedemButton.classList.add('can-reddem-button');
                    newNameButtonDiv.appendChild(newCanReedemButton);

                    newProgressBar.classList.add('progress-bar');
                    newProgressBar.style.width = percentage + "%";
                    newProgressBar.classList.add('can-reddem-progress-bar');
                    newDescriptionDiv.appendChild(newProgressBar);


                } else {
                    let doneDiv = document.createElement('div');
                    doneDiv.style = 'display: flex; align-items: center;'
                    let newReedemedButton = document.createElement('p');
                    let newDoneIcon = document.createElement('img');
                    newDoneIcon.style.width = '24px';

                    newDoneIcon.src = './assets/img/done.svg';
                    newDoneIcon.alt = 'done icon';
                    newReedemedButton.innerHTML = "ITEM RESGATADO";

                    newNameButtonDiv.appendChild(doneDiv);
                    doneDiv.appendChild(newDoneIcon);
                    doneDiv.appendChild(newReedemedButton);
                }

                // PROGRESS BAR 
                if (!items[item].redeemed) {

                }
                if (items[item].percentage == 100 && !items[item].redeemed) {

                }

                rewardsDiv.appendChild(newItems);
                newItems.appendChild(newItemImageDiv);
                newItems.appendChild(newDescriptionDiv);

            }

            console.log(items);
        } else {
            console.log('erroy');
        }
    }
}
xhttp.send();