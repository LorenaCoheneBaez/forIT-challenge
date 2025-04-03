import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Aplicación de lista de tareas</h1>
      <nav className="mt-4 space-x-4">
        <Link href="/TaskList" className='hover:underline'>Ver lista de Tareas</Link>
        <Link href="/TaskForm" className='hover:underline'>Crear nueva Tarea</Link>
      </nav>
    </div>
  );
}
