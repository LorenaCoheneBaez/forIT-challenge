"use client";

import React from "react";

type ButtonProps = {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger" | "success" | "filter" | "close" | "edit" | "view" |"pending";
    children: React.ReactNode;
    fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    onClick,
    type = "button",
    variant = "primary",
    children,
    fullWidth = false
}) => {
    const baseStyles = "px-3 py-1 text-white text-sm rounded-md";
    const variantStyles = {
        primary: "bg-blue-500",
        secondary: "bg-blue-500/30",
        danger: "bg-red-500",
        success: "bg-green-500",
        filter: "bg-gray-500 hover:text-black hover:bg-gray-200 block w-full text-left",
        close: "mt-4 bg-blue-500/30",
        edit: "bg-yellow-500",
        view: "bg-blue-500",
        pending: "bg-rose-500"
    };

    return (
        <button
            onClick={onClick}
            type={type}
            className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""}`}
        >
            {children}
        </button>
    );
};

export default Button;
