import { QueryResult } from "mysql2";
import { InsertRecipe, Recipe } from "../recipesModel";
import { RecipesModelDto } from "./recipes-model-dto";

export class InMemoryRecipesModel implements RecipesModelDto {
  public items: InsertRecipe[] = [];

  getByUserId(id: string): Promise<QueryResult> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<QueryResult> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): void {
    throw new Error("Method not implemented.");
  }

  async create(data: InsertRecipe) {
    const recipe = {
      title: data.title,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      userId: data.userId,
    };

    this.items.push(recipe);
    const formatedRecipe = recipe as unknown as Recipe;
    return formatedRecipe;
  }
}
