fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('produits');
    products.forEach(p => {
      const div = document.createElement('div');
      div.className = 'produit';
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h2>${p.name}</h2>
        <p>${p.price.toFixed(2)}€</p>
        <button 
          class="snipcart-add-item"
          data-item-id="${p.id}"
          data-item-name="${p.name}"
          data-item-price="${p.price}"
          data-item-url="/"
          data-item-description="${p.description}">
          Ajouter au panier
        </button>
      `;
      container.appendChild(div);
    });
  });
