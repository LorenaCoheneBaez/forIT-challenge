import { Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
): void => {
  console.error("Error:", err.message);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || "Error interno del servidor",
  });
};
