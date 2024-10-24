import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserModel } from "../models/in-memory/in-memory-user-model";
import { genSalt, hash } from "bcryptjs";
import { LoginService } from "./loginService";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

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

    const { formattedUser } = await sut.execute({
      password: "1234",
      email: "lucastheldl@gmail.com",
    });

    expect(formattedUser.id).toEqual(expect.any(String));
  });

  it("Should not be possible to login with wrong email", async () => {
    await expect(() =>
      sut.execute({
        password: "12345",
        email: "luc@gmail.com",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
