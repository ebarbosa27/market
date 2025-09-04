import express from "express";
const router = express.Router();
export default router;

import requireUser from "../middleware/requireUser";
import requireBody from "../middleware/requireBody";
import {
  createOrder,
  createOrderProduct,
  getOrderById,
  getOrderByUserId,
  getProductsByOrderId,
} from "../db/queries/orders";
import { getProductById } from "#db/queries/products";

router.use(requireUser);

router
  .route("/")
  .post(requireBody(["date"]), async (req, res) => {
    const order = await createOrder({
      date: req.body.date,
      userId: req.user.id,
      note: req.body.note || "",
    });
    res.status(201).send(order);
  })
  .get(async (req, res) => {
    const orders = await getOrderByUserId(req.user.id);
    res.send(orders);
  });

router.param("id", async (req, res, next, id) => {
  const order = await getOrderById(id);
  if (!order) return res.status(404).send("Order does not exists.");
  if (order.user_id !== req.user.id) return res.status(403).send("Forbidden");

  req.order = order;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.order);
});

router
  .route("/:id/products")
  .post(requireBody(["productId", "quantity"]), async (req, res) => {
    const product = await getProductById(req.body.productId);
    if (!product) return res.status(400).send("Product does not exists.");

    const orderProduct = await createOrderProduct({
      orderId: req.order.id,
      productId: req.body.productId,
      quantity: req.body.quantity,
    });
    res.status(201).send(orderProduct);
  })
  .get(async (req, res) => {
    const orders = await getProductsByOrderId(req.order.id);
    res.send(orders);
  });
