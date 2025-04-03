"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTaskById } from "@/services/taskService";
import { Task } from "@/types/task";

import Button from "@/components/Button";

export default function TaskItem() {
    const params = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTask = async () => {
            if (!params.id) return;
            try {
                const fetchedTask = await getTaskById(params.id as string);
                setTask(fetchedTask);
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        };
        fetchTask();
    }, [params.id]);

    const handleBack = () => {
        router.back();
    };

    if (!task) {
        return <div className="text-white">Cargando...</div>;
    }

    return (
        <div className="flex justify-center items-center ">
        <div >
             <h2 className="text-2xl font-bold mb-4 white">Detalle de Tarea</h2>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 mb-4">
                <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""} mb-2`}>
                            {task.title}
                        </h3>
                        <Button variant={task.completed ? "success" : "danger"}>
                            {task.completed ? "Completada" : "Pendiente"}
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500">{task.description}</p>
                </div>
               
            </div>
            <Button onClick={handleBack} variant="secondary">Volver</Button>
        </div>
        </div>
    );
}
