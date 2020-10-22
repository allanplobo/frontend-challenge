const getURL = "https://br.ongame.net/api/challenge/items/";
const postURL = "https://br.ongame.net/api/challenge/item/redeem/";
var items = [];

var xhttp = new XMLHttpRequest();

function openConfirmModal(id, image, name) {
    let darkBackground = document.getElementById('darkBackground');
    darkBackground.style.display = 'block';

    let modalDiv = document.getElementById('modal');
    modalDiv.style.display = 'flex';

    let modalTitle = document.createElement('h1');
    modalTitle.innerHTML = 'DESEJA RESGATAR?'
    modalDiv.appendChild(modalTitle);

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
        confirmRedeem(parseInt(id));
    }, false);
    modalConfirmButton.classList.add('confirm-button');
    modalConfirmButton.id = 'modalConfirmButton';
    modalConfirmButton.innerHTML = 'SIM';
    modalButtonsDiv.appendChild(modalConfirmButton);

    let modalDenyButton = document.createElement('button');
    modalDenyButton.id = 'denyButton';
    modalDenyButton.addEventListener("click", () => {
        denyRedeem();
    }, false);
    modalDenyButton.classList.add('deny-button');
    modalDenyButton.id = 'modalDenyButton';
    modalDenyButton.innerHTML = 'NÃO';
    modalButtonsDiv.appendChild(modalDenyButton);

}

function confirmRedeem(id) {

    let modalDiv = document.getElementById('modal');
    let darkBackground = document.getElementById('darkBackground');

    let message = {
        item_id: id
    }

    const jsonItem = JSON.stringify(message);

    xhttp.open("POST", postURL, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = () => {
        const itemRedeemed = items.find(x => x.id === id);
        if (!itemRedeemed) {
            itemRedeemed.redeemed = true;
            this.buildItems();
        } else {
            document.getElementById('errorModal').style.display = 'block';
        }
    }

    xhttp.send(jsonItem);

    modalDiv.innerHTML = '';
    modalDiv.style.display = 'none';
    darkBackground.style.display = 'none';
}

function denyRedeem() {
    let modalDiv = document.getElementById('modal');
    let darkBackground = document.getElementById('darkBackground');

    darkBackground.style.display = 'none';
    modalDiv.innerHTML = '';
    modalDiv.style.display = 'none';

}

function confirmError() {
    let errorModal = document.getElementById('errorModal');
    errorModal.style.display = 'none';
}

function buildItems() {
    let rewardsDiv = document.getElementById('rewardsDiv');
    rewardsDiv.innerHTML = '';

    for (let item of items) {
        let percentage = item.percentage;
        let newItems = document.createElement('div');
        newItems.classList.add('item');
        newItems.id = item.id;

        // DIV IMAGE + Childs
        let newItemImageDiv = document.createElement('div');
        newItemImageDiv.classList.add('image');

        let newItemsImage = document.createElement('img');
        newItemsImage.src = item.image;
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
        newItemName.innerHTML = item.name;
        newNameButtonDiv.appendChild(newItemName);

        if (item.redeemed) {
            let doneDiv = document.createElement('div');
            doneDiv.classList.add('redeemed');
            let newredeemedButton = document.createElement('p');
            let newDoneIcon = document.createElement('img');
            newDoneIcon.style.width = '24px';

            newDoneIcon.src = './assets/img/done.svg';
            newDoneIcon.alt = 'done icon';
            newredeemedButton.innerHTML = "ITEM RESGATADO";

            newNameButtonDiv.appendChild(doneDiv);
            doneDiv.appendChild(newDoneIcon);
            doneDiv.appendChild(newredeemedButton);
        } else if (item.percentage < 100) {
            let newRedeemButton = document.createElement('button');
            let newProgressBar = document.createElement('span');

            newRedeemButton.innerHTML = 'RESGATAR';
            newRedeemButton.id = 'resgatarButton';
            newNameButtonDiv.appendChild(newRedeemButton);

            newProgressBar.classList.add('progress-bar');
            newProgressBar.style.width = percentage + "%";
            newDescriptionDiv.appendChild(newProgressBar);

        } else {
            let newCanRedeemButton = document.createElement('button');
            let newProgressBar = document.createElement('span');


            newCanRedeemButton.innerHTML = 'RESGATAR';
            newCanRedeemButton.classList.add('can-reddem-button');
            newCanRedeemButton.onclick = 'openConfirmModal()';
            newCanRedeemButton.addEventListener("click", () => {
                openConfirmModal(newItems.id, newItemsImage.src, newItemName.innerHTML)
            }, false);
            newNameButtonDiv.appendChild(newCanRedeemButton);

            newProgressBar.classList.add('progress-bar');
            newProgressBar.style.width = percentage + "%";
            newProgressBar.classList.add('can-reddem-progress-bar');
            newDescriptionDiv.appendChild(newProgressBar);

        }

        rewardsDiv.appendChild(newItems);
        newItems.appendChild(newItemImageDiv);
        newItems.appendChild(newDescriptionDiv);

    }
}

xhttp.open("GET", getURL, true);
xhttp.onload = (e) => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        items = JSON.parse(xhttp.responseText);
        this.buildItems();
    } else {
        console.log('error');
    }
}

xhttp.send();