import { connection } from "../db/connection";
export interface Recipe {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  ingredients: string[];
  userId: string;
}
export type InsertRecipe = Omit<Recipe, "id">;

const create = async (
  title: string,
  description: string,
  ingredients: string[],
  instructions: string[],
  userId: string
) => {
  const date = new Date();
  const created_at = date.getTime();

  const [recipe] = await connection.execute(
    "INSERT INTO `recipes` (`title`, `description`,`ingredients`,`instructions`,`created_at`,`user_id`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      title,
      description,
      JSON.stringify(ingredients),
      JSON.stringify(instructions),
      created_at,
      userId,
    ]
  );
  return recipe;
};

const getByUserId = async (id: string) => {
  const [recipe] = await connection.execute(
    "SELECT * FROM `recipes` WHERE `user_id` = ?",
    [id]
  );

  return recipe;
};
const getAll = async () => {
  const [recipes] = await connection.execute("SELECT * FROM `recipes`");

  return recipes;
};

const deleteById = async (id: string) => {
  await connection.execute("DELETE FROM `recipes` WHERE `id` = ?", [id]);

  return;
};

export { create, getByUserId, deleteById, getAll };
