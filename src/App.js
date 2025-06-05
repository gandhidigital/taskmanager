import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';
import { fetchTasks, createTask, fetchUsers } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        const estadosUnicos = [...new Set(data.map(t => t.status))];
        console.log('📋 Estados únicos encontrados en tareas:', estadosUnicos);
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      }
    };

    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    loadTasks();
    loadUsers();
  }, []);

  const handleCreate = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      setShowForm(false);
    } catch (err) {
      console.error('❌ Error al crear tarea:', err);
    }
  };

  return (
    <div className="p-4 font-nunito">
      <h1 className="text-2xl font-bold mb-4 font-montserrat">Administrador de Tareas</h1>

      <button
        onClick={() => setShowForm(true)}
        className="bg-[#7037FA] text-white px-4 py-2 rounded hover:bg-opacity-80 mb-4"
      >
        Crear nueva tarea
      </button>

      <TaskTable tasks={tasks} />

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
          users={users}
        />
      )}
    </div>
  );
}

export default App;

