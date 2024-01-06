import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

import productRoutes from "./routes/product";
import authRoutes from "./routes/user";
import protectedRoute from "./routes/user";

mongoose.connect(
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@star-wars-api.esry0eo.mongodb.net/?retryWrites=true&w=majority`
);

const port = 3030;
const app = express();

app.use(express.json());
app.use("/product", productRoutes);
app.use("/user", authRoutes);
app.use("/", protectedRoute);


app.listen(port, () => {
	console.log(`Listening on: http://localhost:${port}`);
});
