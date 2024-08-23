import { randomUUID } from "crypto";
import { InsertUser, User } from "../userModel";
import { UserModelDto } from "./user-model-dto";

export class InMemoryUserModel implements UserModelDto {
  public users: User[] = [];
  async create(data: InsertUser): Promise<User> {
    const user = {
      id: randomUUID(),
      username: data.username,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email);

    if (!user) {
      return null;
    }
    return user;
  }
}
