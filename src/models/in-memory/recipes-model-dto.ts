import { InsertRecipe } from "../recipesModel";

export interface RecipesModelDto {
  create(data: InsertRecipe): Promise<InsertRecipe>;
}
