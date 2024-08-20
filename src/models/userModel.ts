import { RowDataPacket } from "mysql2";
import { connection } from "../db/connection";

interface User {
  id: string;
  email: string;
  password_hash: string;
}

const create = async (username:string,email: string, password: string) => {
  const [user] = await connection.execute(
    "INSERT INTO `users` (`username`,`email`, `password_hash`) VALUES (?,?, ?)",
    [username,email, password]
  );

  return user;
};

const getByEmail = async (email: string) => {
  const [user, buffer] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM `users` WHERE `email` = ?",
    [email]
  );
  const typedUser = user as User[];
  return typedUser.length > 0 ? typedUser[0] : null;
};

export { create, getByEmail };
