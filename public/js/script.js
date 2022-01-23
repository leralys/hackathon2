const badge = document.querySelector('#cart-not-empty');
console.log(badge);

if (localStorage.getItem('cart') == null) {
    badge.style.display = 'none';
} else {
    badge.style.display = 'block';
}