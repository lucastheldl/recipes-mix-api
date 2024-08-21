import { describe, expect, it } from "vitest";
import { RecipesModelDto } from "../models/in-memory/recipes-model-dto";
import { beforeEach } from "node:test";
import { InMemoryRecipesModel } from "../models/in-memory/in-memory-recipes-model";

let recipesModel: RecipesModelDto;
//let sut:

describe("Create recipe routes", () => {
  beforeEach(() => {
    recipesModel = new InMemoryRecipesModel();
    //sut: new CreateRecipeService(recipesModel);
  });
  it("Should be able to create recipe", async () => {
    const TestRecipe = {
      title: "receita teste",
      description: "uma pequena recita teste",
      ingredients: ["test1", "test2"],
      instructions: ["realizar test1", "realizar test2"],
      userId: "1dededededrhrthrhht",
    };
    const createdRecipe = await recipesModel.create(TestRecipe);

    expect(createdRecipe.title).toEqual(expect.any(String));
  });
});
