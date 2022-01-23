let myCart;

// increase number of products
const increaseQuant = function () {
    let sum;
    let numBox = this.nextElementSibling;
    let num = Number(numBox.value);
    num++;
    numBox.value = num;
    myCart = JSON.parse(localStorage.getItem('cart'));
}
// decrease number of products
const decreaseQuant = function () {
    let numBox = this.previousElementSibling;
    let num = Number(numBox.value);
    if (num == 1) return;
    num--;
    numBox.value = num;
}

//delete product from the cart
function deleteItem() {
    let card = this.parentElement.parentElement.parentElement;
    myCart = myCart.filter(obj => obj.product_id != card.id);
    card.remove();
    localStorage.setItem('cart', JSON.stringify(myCart));
    if (document.querySelectorAll('.card').length == 0) {
        localStorage.clear();
        checkLocalStorage();
        let h1 = document.createElement('h1');
        document.querySelector('h1').style.display = 'block';
        makeBody();
        document.body.append(h1);
    }
}

//delete everything from the cart
function deleteAll() {
    let productCards = document.querySelectorAll('.card');
    productCards.forEach(el => el.remove());
    localStorage.clear();
    document.querySelector('#delete-all-btn').remove();
    checkLocalStorage();
}

// takes everything from the cart and appends products to the page with the same layout as in the /products 
const appendCart = () => {
    myCart = JSON.parse(localStorage.getItem('cart'));
    myCart.forEach(el => {
        let myGrid = document.querySelector('.my-grid');
        let card = document.createElement('div');
        let img = document.createElement('img');
        let cardBody = document.createElement('div');
        let titleContainer = document.createElement('div');
        let h5 = document.createElement('h5');
        let price = document.createElement('span');
        let btnToolbar = document.createElement('div');
        let group = document.createElement('span');
        let btnIncrease = document.createElement('button');
        let number = document.createElement('input');
        let btnDecrease = document.createElement('button');
        let btnDeleteItem = document.createElement('button');
        // styles and attributes
        card.classList.add('card');
        card.id = el.product_id;
        img.src = '../assets/products' + el.src;
        img.classList.add('card-img-top');
        img.alt = el.product_name;
        cardBody.classList.add('add-to-cart', 'card-body', 'flex-column', 'd-flex', 'justify-content-between');
        titleContainer.classList.add('mb-3');
        h5.classList.add('card-title', 'product-name');
        h5.innerText = el.product_name;
        price.classList.add('ms-3', 'price');
        price.innerText = `₪${el.price}/psc`;
        btnToolbar.classList.add('btn-toolbar');
        group.classList.add('btn-group', 'border', 'rounded', 'border-1', 'me-3');
        btnIncrease.id = 'increase-quantity';
        btnIncrease.classList.add('btn');
        btnIncrease.innerText = '+';
        number.readOnly = true;
        number.id = 'quantity';
        number.classList.add('border', 'border-1', 'border-top-0', 'border-bottom-0', 'reset-me');
        number.type = 'number';
        number.value = el.quantity;
        number.min = '1';
        number.name = 'quantity';
        btnDecrease.id = 'decrease-quantity';
        btnDecrease.classList.add('btn');
        btnDecrease.innerText = '-';
        btnDeleteItem.classList.add('btn', 'btn-info', 'text-nowrap', 'rounded-pill', 'px-4');
        btnDeleteItem.innerText = 'Delete';
        // event listeners
        btnIncrease.addEventListener('click', increaseQuant);
        btnDecrease.addEventListener('click', decreaseQuant);
        btnDeleteItem.addEventListener('click', deleteItem);
        //appends
        group.append(btnIncrease, number, btnDecrease);
        btnToolbar.append(group, btnDeleteItem);
        h5.append(price);
        titleContainer.append(h5);
        cardBody.append(titleContainer, btnToolbar);
        card.append(img, cardBody);
        myGrid.append(card);
    });
}

const makeBody = () => {
    document.body.style.display = 'flex';
    document.body.style.width = '100%';
    document.body.style.height = '120vh';
    document.body.style.flexDirection = 'column';
    document.body.style.justifyContent = 'space-between';
}


// initialization - show cart if we have it
const checkLocalStorage = () => {
    if (localStorage.getItem('cart') == null) {
        makeBody();
        document.querySelector('#cart-not-empty').style.display = 'none';
        return;
    } else {
        document.querySelector('h1').style.display = 'none';
        appendCart();
    }
};
// start
checkLocalStorage();