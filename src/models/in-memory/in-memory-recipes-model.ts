import { InsertRecipe } from "../recipesModel";
import { RecipesModelDto } from "./recipes-model-dto";

export class InMemoryRecipesModel implements RecipesModelDto {
  public items: InsertRecipe[] = [];

  async create(data: InsertRecipe) {
    const recipe = {
      title: data.title,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      userId: data.userId,
    };

    this.items.push(recipe);

    return recipe;
  }
}
