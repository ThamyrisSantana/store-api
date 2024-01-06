import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

interface DecodedToken {
	userId: string;
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
	const token = req.header("Authorization");

	if (!token) {
		return res.status(401).json({ error: "Access denied" });
	}

	try {
		const decoded = jwt.verify(token, "your-secret-key") as DecodedToken;
		req.userId = decoded.userId;

		next();
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			return res.status(401).json({ error: "Invalid token" });
		}

		res.status(401).json({ error: "Invalid token" });
	}
}

export default verifyToken;
