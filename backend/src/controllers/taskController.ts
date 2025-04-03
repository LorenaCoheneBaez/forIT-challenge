import { Request, Response } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export const getTasks = (req: Request, res: Response): void => {
  const tasks = getAllTasks();
  res.json(tasks);
};

export const getTask = (req: Request, res: Response): void => {
  const { id } = req.params;
 
  const task = getTaskById(parseInt(id));
  if (!task) {
    res.status(404).json({ error: "Tarea no encontrada" });
    return;
  }
  res.json(task);
 
};


export const addTask = (req: Request, res: Response): void => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400).json({ error: "El título es obligatorio" });
    return;
  }

  const newTask = createTask(title, description);
  res.status(201).json(newTask);
};


export const modifyTask = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const { title, completed, description } = req.body;
  const updatedTask = updateTask(id, title, completed, description);
  if (!updatedTask) {
    res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.json(updatedTask);
};

export const removeTask = (req: Request, res: Response):void => {
  const id = parseInt(req.params.id);
  const success = deleteTask(id);
  if (!success) {
    res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.status(204).send();
};
