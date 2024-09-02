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
  type: {
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
  /*  async create({
    title,
    description,
    ingredients,
    instructions,
    userId,
  }: InsertRecipe) {
    const date = new Date();
    const created_at = date.getTime();

    const [recipe] = await connection.execute(
      "INSERT INTO `recipes` (`title`, `description`,`ingredients`,`instructions`,`created_at`,`user_id`) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title,
        description,
        JSON.stringify(ingredients),
        JSON.stringify(instructions),
        created_at,
        userId,
      ]
    );
    const formatedRecipe = recipe as unknown as Recipe;
    return formatedRecipe;
  }

  async getByUserId(id: string) {
    const [recipe] = await connection.execute(
      "SELECT * FROM `recipes` WHERE `user_id` = ?",
      [id]
    );

    return recipe;
  }
  async getAll() {
    const [recipes] = await connection.execute("SELECT * FROM `recipes`");

    return recipes;
  }

  async deleteById(id: string) {
    await connection.execute("DELETE FROM `recipes` WHERE `id` = ?", [id]);

    return;
  } */
  //new stuff

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
    return await recipeMdl.deleteOne({ userId: id });
  }
}
