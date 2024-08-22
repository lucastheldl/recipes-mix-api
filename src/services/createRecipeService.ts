import { RecipesModelDto } from "../models/in-memory/recipes-model-dto";
import { InsertRecipe } from "../models/recipesModel";

export class CreateRecipeService {
  constructor(private recipeModel: RecipesModelDto) {}
  public async execute({
    title,
    description,
    instructions,
    ingredients,
    userId,
  }: InsertRecipe) {
    const recipe = await this.recipeModel.create({
      title,
      description,
      ingredients,
      instructions,
      userId,
    });

    if (!recipe) {
      throw new Error("Erro ao criar receita");
    }

    return recipe;
  }
}
