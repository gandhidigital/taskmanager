import React from 'react';

function TaskTable({ tasks, onCreateSubtask }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Estado</th>
          <th>Responsable</th>
          <th>Validador</th>
          <th>Fecha de entrega</th>
          <th>Notas</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.status}</td>
            <td>{task.responsible?.name || task.assignee || ''}</td>
            <td>{task.validator?.name || ''}</td>
            <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</td>
            <td>{task.notes || ''}</td>
            <td>
              <button
                className="btn-subtarea"
                onClick={() => onCreateSubtask(task._id)}
              >
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;

