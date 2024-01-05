import { Schema, model } from "mongoose";

import type { IProduct } from "../types/Product.types";

const productSchema = new Schema<IProduct>({
	name: { type: String, required: true },
	description: { type: String, require: true },
	image_url: { type: String, require: true },
	price: { type: Number, require: true },
	rating: { type: Number, require: true },
	isHighlighted: { type: Boolean, require: true },
});

export const Product = model<IProduct>("Product", productSchema);
