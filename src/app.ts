import express from "express";
import cors from "cors";
import { router } from "./router";
import { connectToDb } from "./db/connection";

export const app = express();

connectToDb();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors({ origin: "null" }));
app.use(cors());

app.use(router);
