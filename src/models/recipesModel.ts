import { connection } from "../db/connection";
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

export class RecipesModel implements RecipesModelDto {
  async create({
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
    return recipe;
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
  }
}
