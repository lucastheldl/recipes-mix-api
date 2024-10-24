import { NextFunction, Response } from "express";
import { UserModel } from "../models/userModel";
import { verify } from "jsonwebtoken";
import { RequestWithUser } from "../interfaces/requestWithUser";
import { env } from "../env/env";

export async function AuthGuard(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  //checar cookie
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  //check if token is valid
  try {
    const userModel = new UserModel();
    const verified = verify(token, env.JWT_SECRET);

    if (typeof verified.sub !== "string") {
      throw new Error("Invalid token subject");
    }
    const email = verified.sub as string;
    const user = await userModel.getByEmail(email);
    if (!user) {
      return res.status(401).json({ errors: ["Usuário não encontrado"] });
    }
    req.user = {
      email: user.email,
      password: user.password_hash,
    };

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido"] });
  }
}
