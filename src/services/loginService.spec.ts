import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserModel } from "../models/in-memory/in-memory-user-model";
import { genSalt, hash } from "bcryptjs";
import { LoginService } from "./loginService";

let userModel: InMemoryUserModel;
let sut: LoginService;

describe("Create user route", () => {
  beforeEach(() => {
    userModel = new InMemoryUserModel();
    sut = new LoginService(userModel);
  });
  it("Should be able login", async () => {
    const salt = await genSalt(5);

    await userModel.create({
      username: "usuario",
      password_hash: await hash("1234", salt),
      email: "lucastheldl@gmail.com",
    });

    const user = await sut.execute({
      password: "1234",
      email: "lucastheldl@gmail.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
