import { RecipesModelDto } from "../models/in-memory/recipes-model-dto";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class DeleteRecipeService {
  constructor(private recipesModel: RecipesModelDto) {}
  public async execute(id: string) {
    this.recipesModel.deleteById(id);
    if (!id) {
      throw new ResourceNotFoundError();
    }
    return;
  }
}
