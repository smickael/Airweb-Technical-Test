export interface Product {
	id: string;
	label: string;
	description: string;
	price: number;
	category_id: string;
	thumbnail_url: string | null;
}

export interface Category {
	id: string;
	index: number;
	label: string;
	description: string;
}
