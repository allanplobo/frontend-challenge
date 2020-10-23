const getURL = "https://br.ongame.net/api/challenge/items/";
const postURL = "https://br.ongame.net/api/challenge/item/redeem/";

var isReady = false;
var items = [];
let loadingDiv = document.getElementById('loading');


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
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", postURL, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onreadystatechange = () => {

        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status !== 200) {
                document.getElementById('errorModal').style.display = 'flex';
                return;
            }

            const response = JSON.parse(xhttp.responseText);

            if (!(response && response.success)) {
                document.getElementById('errorModal').style.display = 'flex';
                return;
            }

            const item = items.find(x => x.id === id);
            if (item) {
                item.redeemed = true;
                this.buildItems();
            }

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
        newItemsImage.title = item.name;
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
            let newRedeemedButton = document.createElement('p');
            let newDoneIcon = document.createElement('img');
            newDoneIcon.style.width = '24px';

            newDoneIcon.src = './assets/img/done.svg';
            newDoneIcon.alt = 'done icon';
            newRedeemedButton.innerHTML = "ITEM RESGATADO";

            newNameButtonDiv.appendChild(doneDiv);
            doneDiv.appendChild(newDoneIcon);
            doneDiv.appendChild(newRedeemedButton);
        } else if (item.percentage < 100) {
            let newRedeemButton = document.createElement('button');
            let newProgressBar = document.createElement('span');

            newRedeemButton.innerHTML = 'RESGATAR';
            newRedeemButton.id = 'resgatarButton';
            newNameButtonDiv.appendChild(newRedeemButton);

            newProgressBar.classList.add('progress-bar');
            setTimeout(() => {
                newProgressBar.style.width = percentage + "%";
            }, 200);

            newDescriptionDiv.appendChild(newProgressBar);

        } else {
            let newCanRedeemButton = document.createElement('button');
            let newProgressBar = document.createElement('span');


            newCanRedeemButton.innerHTML = 'RESGATAR';
            setTimeout(() => {
                newCanRedeemButton.classList.add('can-redeem-button');
                newCanRedeemButton.title = 'Resgatar Premiação'
                newProgressBar.classList.remove('progress-bar');
                newProgressBar.classList.add('can-redeem-progress-bar');
            }, 1400);

            newCanRedeemButton.onclick = 'openConfirmModal()';
            newCanRedeemButton.addEventListener("click", () => {
                openConfirmModal(newItems.id, newItemsImage.src, newItemName.innerHTML)
            }, false);
            newNameButtonDiv.appendChild(newCanRedeemButton);

            newProgressBar.classList.add('progress-bar');
            setTimeout(() => {
                newProgressBar.style.width = percentage + "%";
            }, 100);
            newDescriptionDiv.appendChild(newProgressBar);


        }

        rewardsDiv.appendChild(newItems);
        newItems.appendChild(newItemImageDiv);
        newItems.appendChild(newDescriptionDiv);

    }

    isReady = true;
}

function init() {
    const xhttp = new XMLHttpRequest();
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
}

function removeLoadingWhenReady() {
    if (!isReady) {
        setTimeout(() => {
            removeLoadingWhenReady()
        }, 50);
    } else {
        let loadingDiv = document.getElementById('loading');
        loadingDiv.remove();
    }
}

init();
removeLoadingWhenReady();

let contentDiv = document.getElementById('contentDiv');
contentDiv.style.display = 'flex';