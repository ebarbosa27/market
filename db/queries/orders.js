import db from "#db/client";

export async function createOrder({ date, note, userId }) {
  const sql = `
  INSERT INTO orders 
    (date, note, user_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [order],
  } = await db.query(sql, [date, note, userId]);
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
