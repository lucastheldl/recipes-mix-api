import { Request, Response } from "express";
import { LoginService } from "../services/loginService";
import { CreateUserService } from "../services/createUserService";
import { UserModel } from "../models/userModel";
import { InvalidCredentialsError } from "../services/errors/invalid-credentials-error";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const userModel = new UserModel();
    const createUserService = new CreateUserService(userModel);
    const { createdUser, token } = await createUserService.execute({
      username,
      email,
      password,
    });

    return res.status(200).json({ token, createdUser });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      // 400: bad request
      return res.status(400).send({ message: error.message });
    }
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userModel = new UserModel();
    const userService = new LoginService(userModel);
    const { formattedUser, token } = await userService.execute({
      email,
      password,
    });

    return res.status(200).json({ token, formattedUser });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      // 400: bad request
      return res.status(400).send({ message: error.message });
    }
  }
};
