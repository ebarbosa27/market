import db from "#db/client";

export async function createProduct({ title, description, price }) {
  const sql = `
  INSERT INTO products
    (title, description, price)
  VALUES
    ($1,$2,$3)
  RETURNING *
  `;
  const {
    rows: [product],
  } = await db.query(sql, [title, description, price]);
  return product;
}

export async function getProducts() {
  const sql = `SELECT * FROM products`;
  const { rows: products } = await db.query(sql);
  return products;
}

export async function getProductById(id) {
  const sql = `SELECT * FROM products WHERE id = $1`;
  const {
    rows: [product],
  } = await db.query(sql, [id]);
  return product;
}

// export async function getOrdersByProductId(productId, userId) {
//   const sql = `
//   SELECT
//     orders.*
//   FROM
//     products
//     JOIN orders_products ON orders_products.product_id = products.id
//     JOIN orders ON orders.id = orders_products.order_id
//   WHERE
//     products.id = $1 AND orders.user_id = $2
//   `;
//   const { rows: orders } = await db.query(sql, [productId, userId]);
//   return orders;
// }
