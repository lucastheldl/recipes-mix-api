import express from "express";
import cors from "cors";
import { router } from "./router";

export const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(cors({ origin: "null" }));
