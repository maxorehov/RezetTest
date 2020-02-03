const form = document.getElementById('form'),
	btn = form.querySelector('#submit'),
	inputs = form.querySelectorAll('input'),
	buyInfo = JSON.parse(localStorage.getItem('cart')),
	inpName = form.querySelector('#name'),
	inpAddr = form.querySelector('#address'),
	inpPhone = form.querySelector('#phone'),
	select = form.querySelector('#shipping'),
	inpEmail = form.querySelector('#email');

checkTotal();
form.addEventListener('submit', submitFormHandler);
form.addEventListener('input', checkInputs)

function checkTotal() {
	let total = 0;
	for(key in buyInfo) {
		total += (buyInfo[key].cost * buyInfo[key].quantity)
	}
	if (total > 300) {
		select[select.length] = new Option('Free Express Shipping', 'Free Express Shipping', true);
		select.value = 'Free Express Shipping';
		select.disabled = true;
	}
	console.log(buyInfo)
} 

async function submitFormHandler(event) {
	event.preventDefault();
	inputs.forEach(i => {
		buyInfo[i.name] = i.value;
	});
	buyInfo.type = select.value;
	localStorage.clear();
	console.log(buyInfo);
	inputs.forEach(i => {
		i.value = '';
	});
	await createOrder(buyInfo);
	btn.disabled = true;
}

function checkInputs() {
	let name = inpName.value,
		addr = inpAddr.value,
		phone = inpPhone.value,
		email = inpEmail.value,
		reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	
	if (name.length != 0 && addr.length != 0 && reg.test(email) && phone.length != 0 ) {
		btn.disabled = false;
	} else {
		btn.disabled = true;
	}
}

async function createOrder(order) {
	try {
		const url = ''; //Url  
		const request = new Request(url + '/orders.json', {
			method: 'post',
			body: JSON.stringify(order)
		});
		const response = await fetch(request);
		return await response.json();
	} catch (error) {
		console.log(error)
	}
}

//MODAL
const overlay = document.querySelector('.overlay'),
	close = document.querySelector('popup-close');

	btn.addEventListener('click', function() {
		overlay.style.display = 'block';
	})
