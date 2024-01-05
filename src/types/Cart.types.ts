export interface ICartItem {
	name: string;
	image_url: string;
	price: number;
	quantity: number;
}

export interface ICart {
	products: Array<ICartItem>;
	total?: number;
}
