import { connection } from "../db/connection";

const create = async (
  title: string,
  information: string,
  ingredients: string[],
  instructions: string[],
  created_at: string,
  userId: string
) => {
  const recipe = await connection.execute(
    "INSERT INTO `recipes` (`title`, `information`,`ingredients`,`instructions`,`created_at`,`user_id`) VALUES (?, ?, ?, ?, ?, ?)",
    [title, information, ingredients, instructions, created_at, userId]
  );

  return recipe;
};

const getByUserId = async (id: string) => {
  const recipe = await connection.execute(
    "SELECT user_id FROM `recipes` WHERE `user_id` = ?",
    [id]
  );

  return recipe;
};
const getAll = async () => {
  const recipes = await connection.execute("SELECT * FROM `recipes`");

  return recipes;
};

const deleteById = async (id: string) => {
  const recipe = await connection.execute(
    "SELECT id FROM `recipes` WHERE `id` = ?",
    [id]
  );

  return recipe;
};

export { create, getByUserId, deleteById, getAll };
