fetch('js/products.json')
	.then(response => response.json())
	.then(data => {
		let products = data;
		let cart = document.getElementById('cart');

		showCart();
		
		function showCart() {
			let html = '';
			let total = 0;
			for (key in products) {
				let cost = products[key].cost * products[key].quantity;
				total += cost;
				html += `
					<div id="${key}" class="cart">
						<div class="img">
							<img src="${products[key].image}">
						</div>
						<div class="description">
							<h2>${products[key].name}</h2>
							<p>${products[key].description}</p>
						</div>
						<div class="cart-count__wrapper">
							<button class="minus" data-atr="${key}">-</button>
							<div class="cart-count__current">
								<input type="number" value="${products[key].quantity}" readonly>
							</div>
							<button class="plus" data-atr="${key}">+</button>
						</div>
						<div class="cart-wrapper">
							<img class="delete" src="img/delete.svg" alt="" data-atr="${key}">
							<span>${cost}.00 €</span >
						</div>
					</div>
				`
			}

			cart.innerHTML = html;

			document.getElementById('total').innerHTML = `${total}.00 €`;
			document.querySelectorAll('.plus').forEach(i => i.addEventListener('click', add));
			document.querySelectorAll('.minus').forEach(i => i.addEventListener('click', remove));
			document.querySelectorAll('.delete').forEach(i => i.addEventListener('click', del));
			document.getElementById('buy').addEventListener('click', buy);
		};

		function buy() {
			let buyData = {};
			Object.keys(products).forEach(i => {
				buyData[i] = {
					cost: products[i].cost,
					quantity: products[i].quantity,
				}
			})
			localStorage.setItem('cart', JSON.stringify(buyData))

		}

		function add() {
			let btnAtr = this.getAttribute('data-atr');
			if (products[btnAtr].quantity <= 50) products[btnAtr].quantity++;
			showCart();
		};

		function remove() {
			let btnAtr = this.getAttribute('data-atr');
			if (products[btnAtr].quantity > 1) products[btnAtr].quantity--;
			showCart();
		};

		function del() {
			let del = this.getAttribute('data-atr');
			delete products[del];
			showCart();
		};

	
	});






