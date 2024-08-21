import { RowDataPacket } from "mysql2";
import { connection } from "../db/connection";
import { UserModelDto } from "./in-memory/user-model-dto";

export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string;
}
export type InsertUser = Omit<User, "id">;

export class UserModel implements UserModelDto {
  async create(data: InsertUser) {
    const [user] = await connection.execute(
      "INSERT INTO `users` (`username`,`email`, `password_hash`) VALUES (?,?, ?)",
      [data.username, data.email, data.password_hash]
    );

    return user;
  }

  async getByEmail(email: string) {
    const [user, buffer] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM `users` WHERE `email` = ?",
      [email]
    );
    const typedUser = user as User[];
    return typedUser.length > 0 ? typedUser[0] : null;
  }
}
