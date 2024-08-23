import { InsertUser, User } from "../userModel";

export interface UserModelDto {
  create(data: InsertUser): Promise<User>;
  getByEmail(email: string): Promise<User | null>;
}
