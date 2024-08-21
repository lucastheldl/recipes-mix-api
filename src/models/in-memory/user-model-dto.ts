import { QueryResult } from "mysql2";
import { InsertUser, User } from "../userModel";

export interface UserModelDto {
  create(data: InsertUser): Promise<QueryResult>;
  getByEmail(email: string): Promise<User | null>;
}
