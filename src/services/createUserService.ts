import { genSalt, hash } from "bcryptjs";
import { getByEmail, create } from "../models/userModel";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

export class CreateUserService {
  private email: string;
  private username: string;
  private password: string;

  constructor(username:string,email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public async execute() {
    //check if the email is already taken
    //hash the password
    //create user

    const user = await getByEmail(this.email);

    if (user) {
      console.log("Email indisponivel");
      throw new InvalidCredentialsError();
    }
    const salt = await genSalt(5);
    const password_hash = await hash(this.password, salt);

    const createdUser = await create(this.username,this.email, password_hash);

    return createdUser;
  }
}
