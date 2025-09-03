import db from "#db/client";
import { createProduct } from "#db/queries/products";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Create 5 Users
  for (let i = 1; i <= 5; i++) {
    const user = {
      username: faker.internet.username(),
      password: faker.internet.password(),
    };
    // createUser(user)
  }

  // Create 5 Orders for the users
  for (let i = 1; i <= 5; i++) {
    const order = {
      date: faker.date.date(),
      note: faker.lorem.sentence(),
      user_id: Math.ceil(Math.random() * 5),
    };
    // createOrder(order)
  }

  // Create 15 products
  for (let i = 1; i <= 15; i++) {
    const product = {
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
    };
    // createProduct(product);
  }

  // Have those orders include 5 items
  for (let i = 1; i <= 15; i++) {
    const orderProduct = {
      order_id: Math.ceil(Math.random() * 5),
      product_id: Math.ceil(Math.random() * 15),
      quantity: Math.ceil(Math.random() * 5),
    };
    // createOrderProduct(orderProduct)
  }
}
