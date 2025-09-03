import express from "express";
const app = express();
export default app;

import getUserFromToken from "./middleware/getUserFromToken";
import usersRouter from "./api/users";
import productsRouter from "./api/products";

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/products", productsRouter);
