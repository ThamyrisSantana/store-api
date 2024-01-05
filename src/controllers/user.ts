import CryptoJS from "crypto-js";
import { Request, Response } from "express";

import { User } from "../model/user";

export async function createAccount(req: Request, res: Response) {
	try {
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: CryptoJS.AES.encrypt(
				req.body.password,
				process.env.PASS_SECRET!
			).toString(),
			isAdmin: req.body.isAdmin,
		});

		await newUser.save();

		return res.send(newUser);
	} catch (error) {
		return res.send(error);
	}
}

export async function login(req: Request, res: Response) {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(401).json("User not found");
		}

		const hashedPassword = CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SECRET!
		);

		const password = hashedPassword.toString();

		if (password !== user.password) {
			return res.status(401).json("Password invalid");
		}

		return res.send(user);
	} catch (error) {
		return res.send(error);
	}
}
