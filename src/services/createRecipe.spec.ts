import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipesModel } from "../models/in-memory/in-memory-recipes-model";
import { CreateRecipeService } from "./createRecipeService";

let recipesModel: InMemoryRecipesModel;
let sut: CreateRecipeService;

describe("Create recipe routes", () => {
  beforeEach(() => {
    recipesModel = new InMemoryRecipesModel();
    sut = new CreateRecipeService(recipesModel);
  });
  it("Should be able to create recipe", async () => {
    console.log(sut + "<<");
    const TestRecipe = {
      title: "receita teste",
      description: "uma pequena recita teste",
      ingredients: ["test1", "test2"],
      instructions: ["realizar test1", "realizar test2"],
      userId: "1dededededrhrthrhht",
    };
    const createdRecipe = await sut.execute(TestRecipe);

    expect(createdRecipe.title).toEqual(expect.any(String));
  });
});
