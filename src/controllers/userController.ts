import { Request, Response } from "express";
import { LoginService } from "../services/loginService";
import { CreateUserService } from "../services/createUserService";
import { UserModel } from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const userModel = new UserModel();
    const createUserService = new CreateUserService(userModel);
    const user = await createUserService.execute({ username, email, password });

    return res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Algo deu errado" });
    console.log(error.message);
    throw new Error("Error trying to create user");
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userModel = new UserModel();
    const userService = new LoginService(userModel);
    const user = await userService.execute({ email, password });

    return res.status(200).json(user);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Algo deu errado" });
    throw new Error("Error trying to login user");
  }
};
