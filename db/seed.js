import db from "#db/client";
import { createProduct } from "#db/queries/products";
import { faker } from "@faker-js/faker";
import { createUser } from "#db/queries/users";
import { createOrder, createOrderProduct } from "#db/queries/orders";

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
    await createUser(user);
  }

  // Create 5 Orders for the users
  for (let i = 1; i <= 5; i++) {
    const order = {
      date: faker.date.anytime(),
      note: faker.lorem.sentence(),
      userId: Math.ceil(Math.random() * 5),
    };
    await createOrder(order);
  }

  // Create 15 products
  for (let i = 1; i <= 15; i++) {
    const product = {
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
    };
    await createProduct(product);
  }

  // Have those orders include 5 items
  for (let i = 1; i <= 15; i++) {
    try {
      const orderProduct = {
        orderId: Math.ceil(Math.random() * 5),
        productId: Math.ceil(Math.random() * 15),
        quantity: Math.ceil(Math.random() * 5),
      };
      await createOrderProduct(orderProduct);
    } catch (err) {
      if (err.code == "23505") {
        i--;
        // console.error("Product order already exists. Rerolling...");
      }
    }
  }
}
