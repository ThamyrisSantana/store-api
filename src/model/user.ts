import { Schema, model } from "mongoose";

import type { IUser } from "../types/User.types";

const UserSchema = new Schema<IUser>(
	{
		userId: { type: String },
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, unique: true, required: true },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const User = model("User", UserSchema);
