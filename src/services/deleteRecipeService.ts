import { RecipesModelDto } from "../models/in-memory/recipes-model-dto";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class DeleteRecipeService {
  constructor(private recipesModel: RecipesModelDto) {}
  public async execute(id: string) {
    const recipe = await this.recipesModel.getById(id);

    if (!recipe) {
      throw new ResourceNotFoundError();
    }

    this.recipesModel.deleteById(id);
    return;
  }
}
