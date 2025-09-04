import express from "express";
const router = express.Router();
export default router;

import requireUser from "../middleware/requireUser";
import { getProductById, getProducts, getOrdersByProductId } from "../db/queries/products";

router.route("/").get(async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

router.param("id", async (req, res, next, id) => {
  const product = await getProductById(id);
  if (!product) return res.status(404).send("Product does not exists.");

  req.product = product;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.product);
});

router.use(requireUser);

router.route("/:id/orders").get(async (req, res) => {
  const productId = req.product.id;
  const userId = req.user.id;

  const orders = await getOrdersByProductId(productId, userId);
  if (orders.length <= 0) res.status(404).send("Orders do not exists.");

  res.send(orders);
});
