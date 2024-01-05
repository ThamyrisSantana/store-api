import { Router } from "express";

import {
	createProduct,
	getProduct,
	getProducts,
	removeProduct,
	updateProduct,
} from "../controllers/product";

const router = Router();

router.get("/", getProduct);
router.get("/list", getProducts);
router.post("/", createProduct);
router.delete("/:id", removeProduct);
router.put("/:id", updateProduct);

export default router;
