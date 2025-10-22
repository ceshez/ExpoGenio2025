// app/forbidden/page.tsx
export default function Forbidden() {
  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-2">Acceso denegado</h1>
      <p className="text-gray-600">
        No tienes permisos para editar esta página.
      </p>
    </div>
  );
}
