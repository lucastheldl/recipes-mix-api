import { connection } from "../db/connection";

interface User {
  email: string;
  password: string;
}
const create = async (email: string, password: string) => {
  const [user] = await connection.execute(
    "INSERT INTO `users` (`email`, `password_hash`) VALUES (?, ?)",
    [email, password]
  );

  return user;
};

const getByEmail = async (email: string) => {
  const [user, buffer] = await connection.execute(
    "SELECT * FROM `users` WHERE `email` = ?",
    [email]
  );

  return Array.isArray(user) && user.length > 0 ? user[0] : null;
};

export { create, getByEmail };
