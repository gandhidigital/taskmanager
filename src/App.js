import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';
import { fetchTasks, createTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      setShowForm(false);
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  return (
    <div className="p-4 font-nunito">
      <h1 className="text-2xl font-bold mb-4 font-montserrat">Administrador de Tareas</h1>

      <button
        className="mb-4 px-4 py-2 rounded bg-[#7037FA] text-white hover:bg-opacity-90"
        onClick={() => setShowForm(true)}
      >
        Crear nueva tarea
      </button>

      {showForm && (
        <TaskForm
          onCreate={handleCreateTask}
          onClose={() => setShowForm(false)}
        />
      )}

      <TaskTable tasks={tasks} />
    </div>
  );
}

export default App;

