import axios from 'axios';

const url = 'https://shopify-backend-12121.herokuapp.com'
const api_Key = '3a883f1e-54e0-4c9e-b5e0-1c56096214de'
  
export function newInv(name, image, price, qty, discount) { 
	let req = {
		name: name, 
		image: image,
		price: price,
		qty: qty,
		discount: discount,
		api_key: api_Key
	};
	const apiUrl = url + '/api/inventory';
	return axios.post(apiUrl, req);
}

export function buyInventory(id) { 
	let req = {
		api_key: api_Key
	}
	const apiUrl = url + '/api/sales/' + id;
	return axios.post(apiUrl, req);
}

export function deleteInv(id) { 
	let req = {
		api_key: api_Key
	}
	const apiUrl = url + '/api/inventory/' + id;
	return axios.delete(apiUrl, req);
}

export function updateInv(id, price, qty, discount) { 
	let req = {
		price: price,
		qty: qty,
		discount: discount,
		api_key: api_Key
	};

	const apiUrl = url + '/api/inventory/' + id;
	return axios.put(apiUrl, req);
}

