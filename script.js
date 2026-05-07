// MODO NOCHE
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Modo Día ☀️' : 'Modo Noche 🌙';
});

// SALUDO PERSONALIZADO
const babyInput = document.getElementById('input-baby');
const greetingArea = document.getElementById('greeting-area');
babyInput.addEventListener('input', () => {
    greetingArea.innerHTML = babyInput.value ? `<p>✨ ¡Bienvenido/a <b>${babyInput.value}</b>! ✨</p>` : '';
});

// CARRITO
let carrito = [];
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total-price');
const paymentSelect = document.getElementById('payment-method');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = {
            name: button.getAttribute('data-name'),
            price: parseInt(button.getAttribute('data-price'))
        };
        carrito.push(item);
        actualizarCarrito();
    });
});

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    cartCount.innerText = carrito.length;
    cartItemsContainer.innerHTML = '';

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío...</p>';
    } else {
        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>🧶 ${item.name} - $${item.price}</span>
                <button class="btn-remove" onclick="eliminarDelCarrito(${index})">×</button>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    const subtotal = carrito.reduce((acc, p) => acc + p.price, 0);
    subtotalEl.innerText = subtotal;
    const total = paymentSelect.value === 'transfer' ? subtotal * 0.9 : subtotal;
    totalEl.innerText = `Total: $${total.toFixed(0)}`;
}

paymentSelect.addEventListener('change', actualizarCarrito);

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('form-feedback').classList.remove('hidden');
    document.getElementById('form-feedback').innerText = "¡Mensaje enviado!";
    e.target.reset();
});