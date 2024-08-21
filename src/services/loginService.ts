import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UserModelDto } from "../models/in-memory/user-model-dto";

interface LoginUser {
  email: string;
  password: string;
}
export class LoginService {
  constructor(private userModel: UserModelDto) {}

  public async execute({ email, password }: LoginUser) {
    //send the email to model to find user
    //get the user and compare the passwords
    //return result
    const user = await this.userModel.getByEmail(email);
    if (!user) {
      console.log("Usuário não existe!");
      throw new InvalidCredentialsError();
    }
    const doesPasswordMatches = await compare(password, user.password_hash);
    if (!doesPasswordMatches) {
      console.log("Senha incorreta!");
      throw new InvalidCredentialsError();
    }

    const formattedUser = { id: user.id, email: user.email };

    return formattedUser;
  }
}
