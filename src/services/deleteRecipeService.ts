import { RecipesModelDto } from "../models/in-memory/recipes-model-dto";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class DeleteRecipeService {
  constructor(private recipesModel: RecipesModelDto) {}
  public async execute(id: string) {
    const recipes = await this.recipesModel.getByUserId(id);
    if (!recipes) {
      throw new ResourceNotFoundError();
    }
    return recipes;
  }
}
