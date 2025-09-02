DROP TABLE IF EXISTS orders_products;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users; 

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE orders (
  id serial PRIMARY KEY,
  date date NOT NULL,
  note text,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  price decimal NOT NULL
);

CREATE TABLE orders_products (
  id serial PRIMARY KEY,
  quantity int NOT NULL,

  order_id int NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id int NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE(order_id, product_id)
);