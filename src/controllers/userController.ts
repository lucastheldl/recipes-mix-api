import { Request, Response } from "express";
import { create } from "../models/userModel";

export const createUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = create(email, password);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Algo deu errado" });
    throw new Error("Error trying to create user");
  }
};
export const loginUser = (req: Request, res: Response) => {
  return res.status(200).json({ message: "ok" });
};
