import express from "express";
const router = express.Router();
export default router;

import requireBody from "../middleware/requireBody";
import { createUser, getUserByUsernamePassword } from "../db/queries/users";
import { createToken } from "#utils/jwt";

router.route("/register").post(requireBody(["username", "password"]), async (req, res) => {
  try {
    const user = await createUser(req.body);
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/login").post(requireBody(["username", "password"]), async (req, res) => {
  try {
    const user = await getUserByUsernamePassword(req.body);
    if (!user) res.status(401).send("Invalid credentials");

    const token = createToken({ id: user.id });
    res.send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});
