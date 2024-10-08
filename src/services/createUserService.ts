import { genSalt, hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UserModelDto } from "../models/in-memory/user-model-dto";

interface CreateUserServiceRequest {
  username: string;
  email: string;
  password: string;
}
export class CreateUserService {
  constructor(private usersModel: UserModelDto) {}

  public async execute({
    username,
    email,
    password,
  }: CreateUserServiceRequest) {
    //check if the email is already taken
    //hash the password
    //create user

    const user = await this.usersModel.getByEmail(email);

    if (user) {
      console.log("Email indisponivel");
      throw new InvalidCredentialsError();
    }
    const salt = await genSalt(5);
    const password_hash = await hash(password, salt);

    const createdUser = await this.usersModel.create({
      username,
      email,
      password_hash,
    });

    return createdUser;
  }
}
