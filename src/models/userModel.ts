import { connection } from "../db/connection";

interface User {
  id: string;
  email: string;
  password_hash: string;
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
  const typedUser = user as User[];
  return typedUser.length > 0 ? typedUser[0] : null;
};

export { create, getByEmail };
