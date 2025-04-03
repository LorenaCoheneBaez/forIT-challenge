export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export const tasks: Task[] = []; 

export const getAllTasks = (): Task[] => tasks;

export const createTask = (title: string): Task => {
  const newTask: Task = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (
  id: number,
  title?: string,
  completed?: boolean
): Task | null => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  return task;
};

export const deleteTask = (id: number): boolean => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};
