import { Task } from "@/types/task";
import { useTaskContext } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

interface TaskItemProps {
    task: Task;
    onClick: () => void;
}

export default function TaskItem({ task }: TaskItemProps) {
    const { updateTask, deleteTask } = useTaskContext();

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);


    const handleDetail = (id: number) => {
        router.push(`/TaskItem/${id}`);
    };

    const handleEdit = (id: number) => {
        router.push(`/TaskForm?id=${id}`);
    };

    const handleDeleteClick = (task: Task) => {
        setTaskToDelete(task);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            deleteTask(taskToDelete.id);
            setIsModalOpen(false);
            setTaskToDelete(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTaskToDelete(null);
    };

    return (
        <>
            <div className="mx-auto overflow-hidden rounded-lg bg-sky-500/10 shadow-md md:max-w-2xl p-8 mb-4"
            >
                <div className="mb-4">
                    <div className="flex justify-between items-center">
                        <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""} mb-2`} >
                            {task.title}
                        </h3>
                        <Button onClick={() => updateTask({ ...task, completed: !task.completed })} variant={task.completed ? "success" : "pending"}>
                            {task.completed ? "Completada" : "Pendiente"}
                        </Button>
                    </div>

                    <p className="text-sm text-gray-500">{task.description}</p>
                </div>

                <div className="flex gap-2">
                    <Button onClick={() => handleDetail(task.id)} variant="view">Ver más</Button>

                    <Button onClick={() => handleEdit(task.id)} variant="edit">Editar</Button>
                    <Button onClick={() => handleDeleteClick(task)} variant="danger">Eliminar</Button>

                </div>
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h2 className="text-lg font-semibold">Confirmar Eliminación</h2>
                    <p>¿Estás seguro de que deseas eliminar la tarea {taskToDelete?.title}?</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={confirmDelete} variant="danger" fullWidth>Eliminar</Button>
                    </div>
                </Modal>
            )}
        </>
    );
}
