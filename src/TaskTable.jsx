import React from 'react';

function TaskTable({ tasks, onCreate }) {
  return (
    <div className="p-4">
      {onCreate && (
        <button
          onClick={onCreate}
          className="mb-4 px-4 py-2 rounded bg-[#7037FA] text-white hover:bg-opacity-90"
        >
          Crear nueva tarea
        </button>
      )}
      <table className="min-w-full border border-gray-300 rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Título</th>
            <th className="p-2 text-left">Estado</th>
            <th className="p-2 text-left">Responsable</th>
            <th className="p-2 text-left">Validador</th>
            <th className="p-2 text-left">Fecha de entrega</th>
            <th className="p-2 text-left">Prioridad</th>
            <th className="p-2 text-left">Notas</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2">{task.responsible?.name || ''}</td>
              <td className="p-2">{task.validator?.name || ''}</td>
              <td className="p-2">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}
              </td>
              <td className="p-2">{task.priority}</td>
              <td className="p-2 whitespace-pre-wrap">{task.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;

