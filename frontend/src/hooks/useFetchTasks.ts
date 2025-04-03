import { useState, useEffect } from "react";
import { getTasks } from "@/services/taskService";
import { Task } from "@/types/task";

export function useFetchTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message));
  }, []);

  return { tasks, error };
}
