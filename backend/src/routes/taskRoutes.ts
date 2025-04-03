import { Router } from "express";
import {
  getTasks,
  getTask,
  addTask,
  modifyTask,
  removeTask
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/add", addTask);
router.put("/:id", modifyTask);
router.delete("/:id", removeTask);

export default router;
