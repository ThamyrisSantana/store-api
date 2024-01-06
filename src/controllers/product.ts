import { Product } from "../model/product";

import type { IProduct } from "../types/Product.types";
import type { Request, Response } from "express";

export async function getProducts(req: Request, res: Response) {
	try {
		const products = await Product.find();

		return res.send({ products, numberOfItems: products.length });
	} catch (error) {
		return res.status(500).json({ error });
	}
}

export async function getProduct(req: Request, res: Response) {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(403).json({
				message: "Product not found",
			});
		}

		return res.send(product);
	} catch (error) {
		return res.status(500).json({ error });
	}
}

export async function createProduct(req: Request, res: Response) {
	try {
		const newProduct = new Product<IProduct>({
			name: req.body.name,
			description: req.body.description,
			image_url: req.body.image_url,
			price: req.body.price,
			rating: req.body.rating,
			isHighlighted: req.body.isHighlighted,
		});

		await newProduct.save();

		return res.send(newProduct);
	} catch (error) {
		return res.status(500).json({ error: error });
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.title,
				description: req.body.description,
				image_url: req.body.image_url,
				price: req.body.price,
				rating: req.body.rating,
				isHighlighted: req.body.isHighlighted,
			},
			{ new: true }
		);

		return res.send(product);
	} catch (error) {
		return res.status(500).json({ error });
	}
}

export async function removeProduct(req: Request, res: Response) {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);

		return res.send(product);
	} catch (error) {
		return res.status(500).json({ error });
	}
}
