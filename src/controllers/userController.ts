import { Request, Response } from "express";
import { LoginService } from "../services/loginService";
import { CreateUserService } from "../services/createUserService";

export const createUser = async (req: Request, res: Response) => {
  const { username,email, password } = req.body;
  try {
    const createUserService = new CreateUserService(username,email, password);
    const user = await createUserService.execute();

    return res.status(200).json(user);
  } catch (error:any) {
    res.status(500).json({ message: "Algo deu errado" });
    console.log(error.message)
    throw new Error("Error trying to create user");
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userService = new LoginService(email, password);
    const user = await userService.execute();

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Algo deu errado" });
    throw new Error("Error trying to login user");
  }
};
