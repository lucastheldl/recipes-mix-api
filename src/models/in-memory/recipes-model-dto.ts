import { QueryResult } from "mysql2";
import { InsertRecipe } from "../recipesModel";

export interface RecipesModelDto {
  create(data: InsertRecipe): Promise<QueryResult>;
  getByUserId(id: string): Promise<QueryResult>;
  getAll(): Promise<QueryResult>;
  deleteById(id: string): void;
}
