import axios from 'axios';
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

const bucket = 'shopify-challenge-287908.appspot.com'

export async function uploadFile(filename) {
	await storage.bucket(bucket).upload(filename);
	console.log(`${filename} uploaded to ${bucket}.`);
}
  
export function newInv(name, image, price, qty, discount) { 
	let req = {
		name: name, 
		image: image,
		price: price,
		qty: qty,
		discount: discount
	};
	const apiUrl = 'http://127.0.0.1:5000/api/inventory';
	return axios.post(apiUrl, req);
}

export function buyInventory(id) { 
	const apiUrl = 'http://127.0.0.1:5000/api/buy/' + id;
	return axios.post(apiUrl);
}

export function deleteInv(id) { 
	const apiUrl = 'http://127.0.0.1:5000/api/delete/' + id;
	return axios.post(apiUrl);
}

export function updateInv(id, price, qty, discount) { 
	let req = {
		price: price,
		qty: qty,
		discount: discount
	};

	const apiUrl = 'http://127.0.0.1:5000/api/inventory/' + id;
	return axios.put(apiUrl, req);
}

