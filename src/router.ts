import express from "express";
import * as userController from "./controllers/userController";
import * as recipesController from "./controllers/recipesController";

export const router = express.Router();

router.post("/recipes", recipesController.create);
router.delete("/recipes", recipesController.deleteById);
router.get("/recipes/id:", recipesController.getByUserId);
router.get("/recipes/all", recipesController.getAll);

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

router.get("/", (req, res) => {
  return res.json({ message: "ok" });
});
