"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createTask, getTaskById, updateTask } from "@/services/taskService";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

export default function TaskForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                const task = await getTaskById(id);
                if (task) {
                    setTitle(task.title);
                    setDescription(task.description || "");
                }
            };
            fetchTask();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("El título es obligatorio.");
            return;
        }

        try {
            if (id) {
                await updateTask(id, { title, description });
                setModalMessage("Tarea actualizada con éxito.");
            } else {
                await createTask({ title, description, completed: false });
                setModalMessage("Tarea creada con éxito.");
            }
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error al guardar la tarea", error);
            setModalMessage("Hubo un error al guardar la tarea.");
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (!error) {
            router.push("/");
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">{id ? "Actualizar tarea" : "Crear tarea"}</h2>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                <label className="text-gray-700 font-semibold">Título *</label>
                <input
                    className={`border p-2 ${error ? "border-red-500" : ""}`}
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError("");
                    }}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <label className="text-gray-700 font-semibold">Descripción (opcional)</label>
                <textarea
                    className="border p-2"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Button type="submit">{id ? "Actualizar" : "Crear"}</Button>
            </form>
            <Button onClick={handleBack} variant="secondary">Volver</Button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p>{modalMessage}</p>
            </Modal>
        </div>
    );
}
