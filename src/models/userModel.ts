import { connection } from "../db/connection";

const create = async (email: string, password: string) => {
  const user = await connection.execute(
    "INSERT INTO `users` (`email`, `password_hash`) VALUES (?, ?)",
    [email, password]
  );

  return user;
};

const getByEmail = async (email: string) => {
  const user = await connection.execute(
    "SELECT email FROM `users` WHERE `email` = ?",
    [email]
  );

  return user;
};

export { create, getByEmail };
