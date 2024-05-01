import express, { Application } from "express";
import { connect } from "mongoose";
import { main } from "./main";

const url: string = "mongodb://localhost:27017/simpleTodo";
const port: number | undefined | string = process.env.PORT || 4499;
const app: Application = express();
app.use(express.json());
main(app);

let server = app.listen(port, async () => {
  await connect(url).then(() => {
    console.log("connected 🚀🚀❤️❤️");
  });
});

process.on("uncaughtException", (err: any) => {
  console.log("uncaughtException: ", err);
});
process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);
});
process.on("exit", () => {
  server.close(() => {});
});
