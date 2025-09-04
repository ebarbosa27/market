import db from "#db/client";

export async function createOrder({ date, userId, note }) {
  const sql = `
  INSERT INTO orders 
    (date, user_id, note)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [order],
  } = await db.query(sql, [date, userId, note]);
  return order;
}

export async function createOrderProduct({ orderId, productId, quantity }) {
  const sql = `
  INSERT INTO orders_products 
    (order_id, product_id, quantity)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [orderProduct],
  } = await db.query(sql, [orderId, productId, quantity]);
  return orderProduct;
}

export async function getOrderByUserId(userId) {
  const sql = `SELECT * FROM orders WHERE user_id = $1`;
  const { rows: orders } = await db.query(sql, [userId]);
  return orders;
}

export async function getOrderById(id) {
  const sql = `SELECT * FROM orders WHERE id = $1`;
  const {
    rows: [order],
  } = await db.query(sql, [id]);
  return order;
}

export async function getProductsByOrderId(orderId) {
  const sql = `
  SELECT 
    products.* 
  FROM 
    orders 
    JOIN orders_products ON orders_products.order_id = orders.id 
    JOIN products ON products.id = orders_products.product_id
  WHERE 
    orders.id = $1
  `;
  const { rows: orders } = await db.query(sql, [orderId]);
  return orders;
}
