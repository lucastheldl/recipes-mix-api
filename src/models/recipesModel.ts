import mongoose from "mongoose";
import { RecipesModelDto } from "./in-memory/recipes-model-dto";
export interface Recipe {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  ingredients: string[];
  userId: string;
}
export type InsertRecipe = Omit<Recipe, "id">;

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const recipeMdl = mongoose.model("Recipes", recipeSchema);
export class RecipesModel implements RecipesModelDto {
  async create({
    title,
    description,
    ingredients,
    instructions,
    userId,
  }: InsertRecipe) {
    const recipe = {
      title,
      description,
      ingredients,
      instructions,
      userId,
    };
    return (await recipeMdl.create(recipe)) as Recipe;
  }
  async getAll() {
    return (await recipeMdl.find()) as Recipe[];
  }
  async getByUserId(id: string) {
    return (await recipeMdl.find({ userId: id })) as Recipe[];
  }
  async deleteById(id: string) {
    return await recipeMdl.deleteOne({ _id: id });
  }
}
