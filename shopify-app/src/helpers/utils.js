import axios from 'axios';

const url = 'https://shopify-backend-12121.herokuapp.com'

  
export function newInv(name, image, price, qty, discount) { 
	let req = {
		name: name, 
		image: image,
		price: price,
		qty: qty,
		discount: discount
	};
	const apiUrl = url + '/api/inventory';
	return axios.post(apiUrl, req);
}

export function buyInventory(id) { 
	const apiUrl = url + '/api/buy/' + id;
	return axios.post(apiUrl);
}

export function deleteInv(id) { 
	const apiUrl = url + '/api/delete/' + id;
	return axios.post(apiUrl);
}

export function updateInv(id, price, qty, discount) { 
	let req = {
		price: price,
		qty: qty,
		discount: discount
	};

	const apiUrl = url + '/api/inventory/' + id;
	return axios.put(apiUrl, req);
}

