import { Router } from "express";
import {
  createTodo,
  getAll,
  getAllCombine,
  moveProgressToDone,
  moveTodoToProgress,
} from "../controller/todoController";

const router: Router = Router();

router.route("/api/create").post(createTodo);

router.route("/api/progress/:ID").patch(moveTodoToProgress);
router.route("/api/done/:ID").patch(moveProgressToDone);

router.route("/api/get").get(getAllCombine);
router.route("/api/get-all").get(getAll);

export default router;
