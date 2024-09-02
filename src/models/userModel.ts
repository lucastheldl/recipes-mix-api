import { UserModelDto } from "./in-memory/user-model-dto";
import mongoose from "mongoose";

export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string;
}
export type InsertUser = Omit<User, "id">;

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
});

const userMdl = mongoose.model("Users", userSchema);

export class UserModel implements UserModelDto {
  async create(data: InsertUser) {
    return (await userMdl.create(data)) as User;
  }

  async getByEmail(email: string) {
    return (await userMdl.findOne({ email })) as User;
  }
}
