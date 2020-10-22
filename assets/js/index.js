const getURL = "https://br.ongame.net/api/challenge/items/";
const postURL = "https://br.ongame.net/api/challenge/item/redeem/";
var xhttp = new XMLHttpRequest();

function openConfirmModal(id, image, name) {
    let darkBackground = document.getElementById('darkBackground');
    darkBackground.style.display = 'block';

    let modalDiv = document.getElementById('modal');
    modalDiv.style.display = 'flex';

    let modalImageItem = document.createElement('img');
    modalImageItem.src = image;
    modalImageItem.id = 'modalImageItem';
    modalDiv.appendChild(modalImageItem);

    let modalNameItem = document.createElement('p');
    modalNameItem.innerHTML = name;
    modalNameItem.id = 'modalNameItem';
    modalDiv.appendChild(modalNameItem);

    let modalButtonsDiv = document.createElement('div');
    modalButtonsDiv.classList.add('modal-buttons-div');
    modalButtonsDiv.id = 'modalButtonsDiv';
    modalDiv.appendChild(modalButtonsDiv);

    let modalConfirmButton = document.createElement('button');
    modalConfirmButton.id = 'confirmButton';
    modalConfirmButton.addEventListener("click", () => {
        confirmReedem(id);
    }, false);
    modalConfirmButton.classList.add('confirm-button');
    modalConfirmButton.id = 'modalConfirmButton';
    modalConfirmButton.innerHTML = 'SIM';
    modalButtonsDiv.appendChild(modalConfirmButton);

    let modalDenyButton = document.createElement('button');
    modalDenyButton.id = 'denyButton';
    modalDenyButton.addEventListener("click", () => {
        denyReedem();
    }, false);
    modalDenyButton.classList.add('deny-button');
    modalDenyButton.id = 'modalDenyButton';
    modalDenyButton.innerHTML = 'NÃO';
    modalButtonsDiv.appendChild(modalDenyButton);

}

function confirmReedem(id) {
    // let message = {
    //     "item_id": id
    // }

    // const jsonItem = JSON.stringify(message);

    // console.log(jsonItem);

    // xhttp.open("POST", postURL, true);
    // xhttp.setRequestHeader('Content-Type', 'application/json');
    // xhttp.onreadystatechange = () => {
    //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    //         console.log('recebeu');
    //     } else {
    //         console.log('error');
    //     }
    // }

    // xhttp.send(jsonItem);




}

function denyReedem() {
    document.getElementById('errorModal').style.display = 'block';

    let modalDiv = document.getElementById('modal');
    let darkBackground = document.getElementById('darkBackground');

    let modalImageItem = document.getElementById('modalImageItem');
    let modalButtonsDiv = document.getElementById('modalButtonsDiv');
    let modalNameItem = document.getElementById('modalNameItem');

    darkBackground.style.display = 'none';
    modalDiv.style.display = 'none';
    modalButtonsDiv.remove();
    modalImageItem.remove();
    modalNameItem.remove();
}

function confirmError() {
    let errorModal = document.getElementById('errorModal');

    errorModal.style.display = 'none';

}


xhttp.open("GET", getURL, true);
xhttp.onload = (e) => {

    if (xhttp.readyState === 4 && xhttp.status === 200) {

        var items = JSON.parse(xhttp.responseText);
        let rewardsDiv = document.getElementById('rewardsDiv');


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
                newReedemButton.id = 'resgatarButton';
                newNameButtonDiv.appendChild(newReedemButton);

                newProgressBar.classList.add('progress-bar');
                newProgressBar.style.width = percentage + "%";
                newDescriptionDiv.appendChild(newProgressBar);

            } else if (items[item].percentage == 100 && !items[item].redeemed) {
                let newCanReedemButton = document.createElement('button');
                let newProgressBar = document.createElement('span');


                newCanReedemButton.innerHTML = 'RESGATAR';
                newCanReedemButton.classList.add('can-reddem-button');
                newCanReedemButton.onclick = 'openConfirmModal()';
                newCanReedemButton.addEventListener("click", () => {
                    openConfirmModal(newItems.id, newItemsImage.src, newItemName.innerHTML)
                }, false);
                newNameButtonDiv.appendChild(newCanReedemButton);

                newProgressBar.classList.add('progress-bar');
                newProgressBar.style.width = percentage + "%";
                newProgressBar.classList.add('can-reddem-progress-bar');
                newDescriptionDiv.appendChild(newProgressBar);


            } else {
                let doneDiv = document.createElement('div');
                doneDiv.classList.add('reedemed');
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

            rewardsDiv.appendChild(newItems);
            newItems.appendChild(newItemImageDiv);
            newItems.appendChild(newDescriptionDiv);

        }

    } else {
        console.log('error');
    }
}

xhttp.send();