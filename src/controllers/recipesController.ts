import { Request, Response } from "express";
import { RecipesModel } from "../models/recipesModel";
import { ResourceNotFoundError } from "../services/errors/resource-not-found-error";
import { CreateRecipeService } from "../services/createRecipeService";
import { GetUserRecipeService } from "../services/getUserRecipeService";
import { DeleteRecipeService } from "../services/deleteRecipeService";

export const create = async (req: Request, res: Response) => {
  const { title, description, ingredients, instructions, userId } = req.body;
  const recipesModel = new RecipesModel();
  const recipeService = new CreateRecipeService(recipesModel);
  try {
    const recipe = await recipeService.execute({
      title,
      description,
      ingredients,
      instructions,
      userId,
    });
    return res.status(202).json(recipe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Algo deu errado" });
    throw new Error("Error trying to create recipe");
  }
};
export const getAll = async (req: Request, res: Response) => {
  const recipesModel = new RecipesModel();
  try {
    const recipes = await recipesModel.getAll();
    return res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Algo deu errado" });
    throw error;
  }
};
export const getRecipeByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const recipesModel = new RecipesModel();
  const getUserRecipeService = new GetUserRecipeService(recipesModel);
  try {
    const recipes = await getUserRecipeService.execute(id);

    return res.status(200).json(recipes);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      // 400: bad request
      return res.status(404).send({ message: error.message });
    }
    throw error;
  }
};
export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const recipesModel = new RecipesModel();
  const deleteRecipeService = new DeleteRecipeService(recipesModel);
  try {
    await deleteRecipeService.execute(id);

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      // 400: bad request
      return res.status(404).send({ message: error.message });
    }
    throw error;
  }
};
