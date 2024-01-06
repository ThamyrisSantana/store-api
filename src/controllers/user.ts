import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { User } from "../model/user";

export async function createAccount(req: Request, res: Response) {
	try {
		const hasUser = await User.findOne({ email: req.body.email });

		if (hasUser) {
			return res.status(403).json({
				message: "Email already used",
			});
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const isAdmin = req.body.isAdmin ?? false;
		const userId = uuidv4();

		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			isAdmin,
			userId,
		});

		await user.save();
		res.status(201).json({ user });
	} catch (error) {
		res.status(500).json({ error });
	}
}

export async function login(req: Request, res: Response) {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(401).json({ message: "User not found." });
		}

		const passwordMatch = await bcrypt.compare(req.body.password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ message: "Password incorrect." });
		}

		const token = jwt.sign({ userId: user._id }, "your-secret-key", {
			expiresIn: "1h",
		});

		res.set("userSessionToken", token);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: "Login failed" });
	}
}

export async function getProfile(req: Request, res: Response) {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(403).json({
				message: "User not found",
			});
		} else {
			return res.status(200).json(user);
		}
	} catch (error) {
		return res.status(401).json(error);
	}
}
