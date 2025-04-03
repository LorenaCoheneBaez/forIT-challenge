"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Task } from "@/types/task";

interface TaskContextType {
    tasks: Task[];
    isLoading: boolean;
    fetchTasks: () => Promise<void>;
    addTask: (task: Omit<Task, "id">) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 

    const fetchTasks = async () => {
        setIsLoading(true); 
        try {
            const res = await fetch(`${API_URL}/`);
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        } finally {
            setIsLoading(false); 
        }
    };

    const addTask = async (task: Omit<Task, "id">) => {
        try {
            const res = await fetch(`${API_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });
            if (res.ok) fetchTasks();
        } catch (error) {
            console.error("Error adding task", error);
        }
    };

    const updateTask = async (task: Task) => {
        try {
            await fetch(`${API_URL}/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, isLoading, fetchTasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};
