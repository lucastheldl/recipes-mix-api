import { QueryResult } from "mysql2";
import { InsertRecipe, Recipe } from "../recipesModel";

export interface RecipesModelDto {
  create(data: InsertRecipe): Promise<Recipe>;
  getByUserId(id: string): Promise<QueryResult>;
  getAll(): Promise<QueryResult>;
  deleteById(id: string): void;
}
