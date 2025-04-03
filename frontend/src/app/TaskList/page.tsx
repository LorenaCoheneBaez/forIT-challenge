"use client";
import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskCard from "@/components/TaskCard";
import Modal from "@/components/Modal";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function TaskList() {
    const { tasks, isLoading, fetchTasks } = useTaskContext();
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [filter, setFilter] = useState<"all" | "pendiente" | "completada">("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const openModal = (task: Task) => setSelectedTask(task);
    const closeModal = () => setSelectedTask(null);
    const router = useRouter();
    const handleBack = () => router.back();
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleFilterChange = (newFilter: "all" | "pendiente" | "completada") => {
        setFilter(newFilter);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []); 


    const filteredTasks = tasks.filter((task) => {
        if (filter === "pendiente") return !task.completed;
        if (filter === "completada") return task.completed;
        return true;
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Lista de Tareas</h2>

            {isLoading ? (
                <div className="text-center text-gray-500 mb-4">Cargando tareas...</div>
            ) : tasks.length === 0 ? (
                <div className="text-center text-gray-500 mb-4">Aún no tienes tareas.</div>
            ) : (
                <>
                    <div className="relative mb-4">
                        <Button onClick={toggleDropdown} variant="secondary">Filtrar tareas</Button>
                        {isDropdownOpen && (
                            <div className="absolute mt-2 w-48 border rounded shadow-lg bg-gray-500">
                                <Button onClick={() => handleFilterChange("all")} variant="filter">Todas</Button>
                                <Button onClick={() => handleFilterChange("pendiente")} variant="filter">Pendientes</Button>
                                <Button onClick={() => handleFilterChange("completada")} variant="filter">Completadas</Button>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-4">
                        {filteredTasks.length != 0 ?
                        filteredTasks.map((task) => (
                            <TaskCard key={task.id} task={task} onClick={() => openModal(task)} />
                        ))
                                    : <p className="mb-4">{`No hay tareas ${filter}s que mostrar.`}</p>

                        }
                    </div>
                </>
            )}

            <Button onClick={handleBack} variant="secondary">Volver</Button>

            <Modal isOpen={!!selectedTask} onClose={closeModal}>
                {selectedTask && (
                    <>
                        <div className="flex justify-between items-center">
                            <h3 className={`text-lg font-semibold ${selectedTask.completed ? "line-through text-gray-500" : ""} mb-2`}>
                                {selectedTask.title}
                            </h3>
                            <Button variant={selectedTask.completed ? "success" : "pending"}>
                                {selectedTask.completed ? "Completada" : "Pendiente"}
                            </Button>
                        </div>
                        <p className="text-sm text-gray-600">{selectedTask.description}</p>
                    </>
                )}
            </Modal>
        </div>
    );
}
