// Produits simulés
const products = [
  { id: 1, name: "T-shirt classique", price: 19.99, img: "https://via.placeholder.com/200?text=T-shirt" },
  { id: 2, name: "Casquette", price: 14.99, img: "https://via.placeholder.com/200?text=Casquette" },
  { id: 3, name: "Sweat à capuche", price: 39.99, img: "https://via.placeholder.com/200?text=Sweat" },
  { id: 4, name: "Chaussures", price: 59.99, img: "https://via.placeholder.com/200?text=Chaussures" }
];

let cart = [];

function displayProducts() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = \`
      <img src="\${p.img}" alt="\${p.name}" />
      <h2>\${p.name}</h2>
      <p>Prix : \${p.price.toFixed(2)} €</p>
      <button onclick="addToCart(\${p.id})">Ajouter au panier</button>
    \`;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }
  displayCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  displayCart();
}

function displayCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = \`
      \${item.name} x \${item.quantity} - \${(item.price * item.quantity).toFixed(2)} €
      <button onclick="removeFromCart(\${item.id})">Supprimer</button>
    \`;
    container.appendChild(li);
  });
  const totalEl = document.getElementById("cart-total");
  if (totalEl) totalEl.textContent = "Total : " + total.toFixed(2) + " €";
}

// Authentification
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const pseudo = document.getElementById("reg-pseudo").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    localStorage.setItem("user", JSON.stringify({ pseudo, email, password }));
    document.getElementById("message").textContent = "Inscription réussie !";
    registerForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("log-email").value;
    const password = document.getElementById("log-password").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      document.getElementById("auth-forms").style.display = "none";
      document.getElementById("welcome").style.display = "block";
      document.getElementById("user-pseudo").textContent = user.pseudo;
    } else {
      document.getElementById("message").textContent = "Identifiants incorrects.";
    }
  });

  document.getElementById("logout-btn").addEventListener("click", function() {
    document.getElementById("auth-forms").style.display = "block";
    document.getElementById("welcome").style.display = "none";
  });
}

// Initialisation
displayProducts();
displayCart();
