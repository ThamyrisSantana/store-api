import chalk from "chalk";
import fs from "fs";
import path from "path";

// File name to be created
// eslint-disable-next-line no-undef
const fileName = process.argv[2] || "controller-name";

// Controllers folder path
const fullPath = path.join("src/controllers");

// File content
// eslint-disable-next-line no-undef
const method = process.argv[3] || "get";
const functionName = `${fileName.charAt(0).toUpperCase() + fileName.slice(1)}`;

const content = `
import { Request, Response } from "express";

export async function ${method + functionName}(req: Request, res: Response) {
	try {
		const value = "value";

		return res.send(value);
	} catch (error) {
		res.status(500).json(error);
	}
}
`;

// Create file inside controllers folder
fs.writeFile(
	path.join(fullPath, `${fileName}.ts`),
	content,
	{ recursive: true, encoding: "utf-8" },
	(err) => {
		if (err) {
			console.error(chalk.bold.red("Something went wrong. 😢"));
			console.log(err);
		} else {
			console.log(chalk.bold.green("Success! 🎉"));
		}
	}
);
