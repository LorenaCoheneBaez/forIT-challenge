import { Task } from "../models/taskModels";

const tasks: Task[] = [];

export const getAllTasks = (): Task[] => {
  return tasks;
};

export const getTaskById = (id: number): Task | undefined =>
  tasks.find((task) => task.id === id);

export const createTask = (title: string, description: string): Task => {
  const newTask: Task = {
    id: Date.now(),
    title: title,
    description: description,
    completed: false,
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (
  id: number,
  title: string,
  completed?: boolean,
  description?: string
): Task | null => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return null;

  const task = tasks[taskIndex];

  if (title.trim() !== "") {
    task.title = title;
  } else {
    throw new Error("El título no puede estar vacío.");
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  if (description !== undefined) {
    task.description = description;
  }

  tasks[taskIndex] = task;
  return task;
};


export const deleteTask = (id: number): boolean => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return false;

  tasks.splice(taskIndex, 1);
  return true;
};
