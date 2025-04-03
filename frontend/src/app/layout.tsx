import type { Metadata } from "next";
import "./globals.css";
import { TaskProvider } from "@/context/TaskContext";

export const metadata: Metadata = {
  title: "Challenge Academia ForIT",
  description: "Challenge ingreso a Academia ForIT 2025",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen ">
        <div className="flex-grow container mx-auto p-4 flex items-center justify-center">
        <TaskProvider>
          {children}
        </TaskProvider>
        </div>
      </body>
    </html>
  );
}
