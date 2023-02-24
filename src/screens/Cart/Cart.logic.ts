import axios from "axios";
import { Product } from "../../@types";

export type Order = {
	quantity: number;
	product: Product;
};

async function product(id: string): Promise<Product> {
	const response = await axios.get<Product>(
		`https://test-feed.airweb.workers.dev/products/${id}`
	);
	return response.data;
}

export async function processOrder(
	cartContent: {
		id: string;
		quantity: number;
	}[]
): Promise<Order[]> {
	const orders: Order[] = [];
	for (const content of cartContent) {
		const value = await product(content.id);
		orders.push({ quantity: content.quantity, product: value });
	}
	return orders;
}
