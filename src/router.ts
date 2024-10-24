import express from "express";
import * as userController from "./controllers/userController";
import * as recipesController from "./controllers/recipesController";
import { AuthGuard } from "./middlewares/AuthGuard";

export const router = express.Router();

router.post("/recipes", AuthGuard, recipesController.create);
router.delete("/recipes/:id", AuthGuard, recipesController.deleteRecipe);
router.get("/recipes/user/:id", AuthGuard, recipesController.getRecipeByUserId);
router.get("/recipes", recipesController.getAll);

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
