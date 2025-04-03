import React from 'react';
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 p-6 rounded-lg shadow-lg w-96"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <Button onClick={onClose} variant="close" fullWidth>Cerrar</Button>
            </div>
        </div>
    );
};

export default Modal;
