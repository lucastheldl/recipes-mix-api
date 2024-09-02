import "dotenv/config";
import mongoose from "mongoose";

export async function connectToDb() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:<${process.env.MONGODB_PASSWORD}>@recipescluster.qx5a1.mongodb.net/?retryWrites=true&w=majority&appName=RecipesCluster`
    );
  } catch (error) {
    if (error) {
      return console.log(error);
    }
    return console.log("conectado ao banco");
  }
}
