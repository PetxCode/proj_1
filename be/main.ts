import { Application } from "express";
import cors from "cors";
import todo from "./router/todoRouter";

export const main = (app: Application) => {
  try {
    app.use(cors());

    app.use("/", todo);
  } catch (error) {
    console.log(error);
  }
};
