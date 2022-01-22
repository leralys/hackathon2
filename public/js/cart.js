// increase number of products
const increaseQuant = function () {
    let numBox = this.nextElementSibling;
    let num = Number(numBox.value);
    num++;
    numBox.value = num;
}
// decrease number of products
const decreaseQuant = function () {
    let numBox = this.previousElementSibling;
    let num = Number(numBox.value);
    if (num == 1) return;
    num--;
    numBox.value = num;
}


const appendCart = () => {
    products = JSON.parse(localStorage.getItem('cart'));
    products.forEach(el => {
        let myGrid = document.querySelector('.my-grid');
        let card = document.createElement('div');
        let img = document.createElement('img');
        let cardBody = document.createElement('div');
        let titleContainer = document.createElement('div');
        let h5 = document.createElement('h5');
        let btnToolbar = document.createElement('div');
        let group = document.createElement('span');
        let btnIncrease = document.createElement('button');
        let number = document.createElement('input');
        let btnDecrease = document.createElement('button');
        let btnDeleteEl = document.createElement('button');
        card.classList.add('card');
        img.src = '../assets/products' + el.src;
        img.classList.add('card-img-top');
        img.alt = el.product_name;
        cardBody.classList.add('add-to-cart', 'card-body', 'flex-column', 'd-flex', 'justify-content-between');
        titleContainer.classList.add('mb-3');
        h5.id = el.product_id;
        h5.classList.add('card-title', 'product-name');
        h5.innerText = el.product_name;
        btnToolbar.classList.add('btn-toolbar');
        group.classList.add('btn-group', 'border', 'rounded', 'border-1', 'me-3');
        btnIncrease.id = 'increase-quantity';
        btnIncrease.classList.add('btn');
        btnIncrease.innerText = '-';
        number.readOnly = true;
        number.id = 'quantity';
        number.classList.add('border', 'border-1', 'border-top-0', 'border-bottom-0', 'reset-me');
        number.type = 'number';
        number.value = el.quantity;
        number.min = '1';
        number.name = 'quantity';
        btnDecrease.id = 'decrease-quantity';
        btnDecrease.classList.add('btn');
        btnDecrease.innerText = '+';
        btnDeleteEl.classList.add('btn', 'btn-info', 'text-nowrap', 'rounded-pill', 'px-4');
        btnDeleteEl.innerText = 'Delete';
        group.append(btnIncrease, number, btnDecrease);
        btnToolbar.append(group, btnDeleteEl);
        titleContainer.append(h5);
        cardBody.append(titleContainer, btnToolbar);
        card.append(img, cardBody);
        myGrid.append(card);
    });
}




// initialization - show cart if we have it
const checkLocalStorage = (() => {
    if (localStorage.getItem('cart') == null) {
        document.body.style.display = 'flex';
        document.body.style.width = '100%';
        document.body.style.height = '100vh';
        document.body.style.flexDirection = 'column';
        document.body.style.justifyContent = 'space-between';
        return;
    } else {
        document.querySelector('h1').remove();
        appendCart();
    }
})();
