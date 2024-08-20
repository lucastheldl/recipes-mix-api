import { Request, Response } from "express";
import {
  getAll as getAllRecipes,
  create as createRecipe,
  deleteById,
  getByUserId
} from "../models/recipesModel";
import { ResourceNotFoundError } from "../services/errors/resource-not-found-error";

export const create = async (req: Request, res: Response) => {
  const { title, description, ingredients, instructions, userId } = req.body;
  try {
    const recipe = await createRecipe(
      title,
      description,
      ingredients,
      instructions,
      userId
    );
    return res.status(202).json(recipe);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Algo deu errado" });
    throw new Error("Error trying to create recipe");
  }
};
export const getAll = async (req: Request, res: Response) => {
  try {
    const recipes = await getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Algo deu errado" });
    throw new ResourceNotFoundError();
  }
};
export const getRecipeByUserId = async(req: Request, res: Response) => {
  const {id} = req.params
  try {
    const recipes = await getByUserId(id);
    return res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Algo deu errado" });
    throw new ResourceNotFoundError();
  }
};
export const deleteRecipe = async(req: Request, res: Response) => {
  const {id} = req.params
  try {
    await deleteById(id);
    return res.status(200).json({"message":"ok"});
  } catch (error:any) {
    console.log(error.message);
    res.status(500).json({ message: "Algo deu errado" });
    throw new ResourceNotFoundError();
  }
};
