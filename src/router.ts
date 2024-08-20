import express from "express";
import * as userController from "./controllers/userController";
import * as recipesController from "./controllers/recipesController";

export const router = express.Router();

router.post("/recipes", recipesController.create);
router.delete("/recipes/:id", recipesController.deleteRecipe);
router.get("/recipes/user/:id", recipesController.getRecipeByUserId);
router.get("/recipes", recipesController.getAll);

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);


