import React, { useState, useEffect } from 'react';
import { createTask, fetchUsers } from './api';

function TaskForm({ onClose, onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Por hacer');
  const [responsible, setResponsible] = useState('');
  const [validator, setValidator] = useState('');
  const [priority, setPriority] = useState('Media');
  const [delivery, setDelivery] = useState('');
  const [notes, setNotes] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title,
        status,
        responsible,
        validator,
        priority,
        dueDate: delivery,
        notes,
      };
      const savedTask = await createTask(newTask);
      onTaskCreated(savedTask);
      onClose();
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 font-montserrat">Crear nueva tarea</h2>
        <form onSubmit={handleSubmit} className="space-y-4 font-nunito">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option>Por hacer</option>
                <option>En progreso</option>
                <option>Bloqueado</option>
                <option>Validación</option>
                <option>Completado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Prioridad</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Responsable</label>
              <select
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Selecciona</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Validador</label>
              <select
                value={validator}
                onChange={(e) => setValidator(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Selecciona</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Fecha de entrega</label>
              <input
                type="date"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Notas</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-[#7037FA] text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              Crear
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;

