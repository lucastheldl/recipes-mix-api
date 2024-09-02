import { InsertRecipe, Recipe } from "../recipesModel";

export interface RecipesModelDto {
  create(data: InsertRecipe): Promise<Recipe>;
  getByUserId(id: string): Promise<Recipe[]>;
  getAll(): Promise<Recipe[]>;
  deleteById(id: string): void;
}
