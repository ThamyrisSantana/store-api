import { Router, Request, Response } from "express";

import verifyToken from "../middleware/authMiddleware";

const router = Router();

router.get("", verifyToken, (req: Request, res: Response) => {
	res.status(200).json({ message: "Protected route accessed" });
});

export default router;
