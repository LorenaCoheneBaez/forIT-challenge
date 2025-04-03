import { Task } from "@/types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/`);
  if (!res.ok) throw new Error("Error al obtener tareas");
  return res.json();
};

export const getTaskById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener la tarea");
  return res.json();
};

export const createTask = async (task: Omit<Task, "id">) => {
  const res = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Error al crear tarea");
  return res.json();
};

export const updateTask = async (id: string, task: Partial<Task>) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Error al actualizar tarea");
  return res.json();
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar tarea");
};
