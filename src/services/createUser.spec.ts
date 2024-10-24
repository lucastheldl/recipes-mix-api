import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserModel } from "../models/in-memory/in-memory-user-model";
import { CreateUserService } from "./createUserService";

let userModel: InMemoryUserModel;
let sut: CreateUserService;

describe("Create user route", () => {
  beforeEach(() => {
    userModel = new InMemoryUserModel();
    sut = new CreateUserService(userModel);
  });
  it("Should be able to create user", async () => {
    const TestUser = {
      username: "usuario",
      password: "password",
      email: "lucastheldl@gmail.com",
    };
    const { createdUser } = await sut.execute(TestUser);

    expect(createdUser.email).toEqual(expect.any(String));
  });
});
