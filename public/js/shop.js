// GLOBAL VARIABLES
const increaseBtns = document.querySelectorAll('#increase-quantity');
const decreaseBtns = document.querySelectorAll('#decrease-quantity');
const addCartAll = document.querySelectorAll('.add-to-cart');
let cart;

//product class to save to the cart
class Product {
    constructor(name, quantity) {
        this.product_name = name;
        this.quantity = quantity;
    }
}

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

//checks if we have already tasks in the local storage, if not - creates a new cart array
const checkLocalStorage = () => {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        cart = [];
    }
}

// resets inputs
function resetInputs() {
    const clearInputs = document.querySelectorAll('.reset-me');
    clearInputs.forEach(el => el.value = '1');
}

// saves product to a local storage
const addToLocalCart = function (e) {
    e.preventDefault();
    let str = this.children[0].children[0].innerText;
    let ind = str.indexOf('₪');
    let quant = this.lastElementChild.children[0].children[1].value;
    let product = new Product(str.slice(0, ind), quant);
    checkLocalStorage();
    cart.push(product);
    resetInputs();
    localStorage.setItem('cart', JSON.stringify(cart));
};

// event listeners for quantity choosers and for card-forms
const addListeners = (() => {
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', increaseQuant)
    });
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', decreaseQuant)
    });
    addCartAll.forEach(form => {
        form.addEventListener('submit', addToLocalCart);
    })
})();
