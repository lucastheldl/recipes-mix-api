import { Request, Response } from "express";

export const create = (req: Request, res: Response) => {
  return res.status(200).json({ message: "ok" });
};
export const getAll = (req: Request, res: Response) => {
  return res.status(200).json({ message: "ok" });
};
export const getByUserId = (req: Request, res: Response) => {
  return res.status(200).json({ message: "ok" });
};
export const deleteById = (req: Request, res: Response) => {
  return res.status(200).json({ message: "ok" });
};
