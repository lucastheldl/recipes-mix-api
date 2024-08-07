import { compare } from "bcryptjs";
import { getByEmail } from "../models/userModel";

export class LoginService {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public async execute() {
    //send the email to model to find user
    //get the user and compare the passwords
    //return result
    const user = await getByEmail(this.email);
    if (!user) {
      console.log("Usuário não existe!");
      throw new Error("Usuário não existe!");
    }
    const doesPasswordMatches = await compare(
      this.password,
      user.password_hash
    );
    if (!doesPasswordMatches) {
      console.log("Senha incorreta!");
      throw new Error("Senha incorreta!");
    }

    return user;
  }
}
