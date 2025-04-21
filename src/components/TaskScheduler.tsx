import React, { useState } from 'react';
import { Task, ScheduleRequest, ScheduleResponse, intensityMap } from '../types';
import { API_ENDPOINTS } from '../config';
import Button from './Button';
import './TaskScheduler.css';

interface ScheduleItem {
  task: string;
  duration: number;
  priority: 'alta' | 'media' | 'baja';
  isBreak: boolean;
  breakDescription?: string;
  completed?: boolean;
}

const TaskScheduler: React.FC = () => {
  // Estado para el formulario
  const [tasks, setTasks] = useState<Task[]>([]);
  const [time, setTime] = useState(8);
  const [energy, setEnergy] = useState(1);
  const [dayType, setDayType] = useState<'intenso' | 'relajado' | 'mixto'>('mixto');
  
  // Estado para la respuesta
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getIntensityLevel = (energy: number): string => {
    if (energy >= intensityMap.low[0] && energy <= intensityMap.low[1]) {
      return 'calmado';
    } else if (energy >= intensityMap.medium[0] && energy <= intensityMap.medium[1]) {
      return 'moderado';
    } else {
      return 'intenso';
    }
  };

  // Manejador para agregar tareas
  const addTask = () => {
    setTasks([...tasks, { name: '', duration: 1 }]);
  };

  // Manejador para actualizar tareas
  const updateTask = (index: number, field: keyof Task, value: string | number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: field === 'duration' ? Number(value) : value
    };
    setTasks(updatedTasks);
  };

  // Manejador para eliminar tareas
  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Manejador para marcar tarea como completada
  const toggleTaskCompletion = (index: number) => {
    const updatedItems = [...scheduleItems];
    updatedItems[index] = {
      ...updatedItems[index],
      completed: !updatedItems[index].completed
    };
    setScheduleItems(updatedItems);
  };

  // Primero, actualicemos el manejador para eliminar elementos del horario
  const removeScheduleItem = (index: number) => {
    const updatedItems = [...scheduleItems];
    updatedItems.splice(index, 1);
    setScheduleItems(updatedItems);
  };

  // Función para llamar a la API
  const generateSchedule = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validar tareas vacías
      if (tasks.length === 0) {
        setError('Debes agregar al menos una tarea');
        setLoading(false);
        return;
      }

      // Validar que las tareas tengan nombre
      const emptyTasks = tasks.some(task => !task.name.trim());
      if (emptyTasks) {
        setError('Todas las tareas deben tener una descripción');
        setLoading(false);
        return;
      }

      const request: ScheduleRequest = {
        tasks,
        time,
        energy,
        dayType
      };

      const response = await fetch(API_ENDPOINTS.SCHEDULE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      // Validar respuesta HTTP
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP: ${response.status} - ${errorText || 'Sin respuesta del servidor'}`);
      }

      // Intentar parsear como JSON
      let data: ScheduleResponse;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Error al procesar la respuesta del servidor');
      }

      // Verificar que data tenga la estructura correcta
      if (!data || typeof data !== 'object') {
        throw new Error('Respuesta inválida del servidor');
      }

      if (data.success) {
        setSchedule(data);
        // Inicializar el estado de completado para cada tarea
        if (Array.isArray(data.schedule)) {
          setScheduleItems(data.schedule.map(item => ({
            ...item,
            completed: false
          })));
        } else {
          throw new Error('El formato de horario es inválido');
        }
      } else {
        setError(data.error || 'Error al generar el horario');
      }
    } catch (err) {
      console.error('Error al generar horario:', err);
      setError(err instanceof Error ? err.message : 'Error de conexión con el servidor');
      // Limpiar estados en caso de error
      setSchedule(null);
      setScheduleItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-scheduler">
      <div className="scheduler-form">
        <div className="form-group">
          <label>¿Cuánto tiempo necesitas para tus tareas?</label>
          <div className="input-container">
            <input
              type="number"
              min={1}
              max={24}
              step={0.5}
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
            />
          </div>
          <p className="info-text">Tienes {time} horas para distribuir tus actividades</p>
        </div>

        <div className="form-group">
          <label>Selecciona tu nivel de energía</label>
          <div className="energy-slider-container">
            <input
              type="range"
              min="1"
              max="12"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="energy-slider"
            />
          </div>
          <div className="energy-info">
            <p>Nivel: {energy}</p>
            <p>¡Estás preparado para un día {getIntensityLevel(energy)}!</p>
          </div>
        </div>

        <div className="form-group">
          <label>¿Cómo prefieres organizar tu día?</label>
          <div className="input-container">
            <select
              value={dayType}
              onChange={(e) => setDayType(e.target.value as typeof dayType)}
            >
              <option value="intenso">Día Intenso</option>
              <option value="relajado">Día Relajado</option>
              <option value="mixto">Día Mixto</option>
            </select>
          </div>
          <p className="info-text">
            {dayType === 'intenso' ? 'Priorizaremos tareas desafiantes' :
             dayType === 'relajado' ? 'Mantendremos un ritmo suave' :
             'Balancearemos actividades intensas y ligeras'}
          </p>
        </div>

        <div className="tasks-list">
          <h3>¿Qué tareas tienes pendientes?</h3>
          {tasks.map((task, index) => (
            <div key={index} className="task-input">
              <input
                type="text"
                placeholder="Describe tu tarea"
                value={task.name}
                onChange={(e) => updateTask(index, 'name', e.target.value)}
              />
              <input
                type="number"
                min={0.5}
                max={4}
                step={0.5}
                value={task.duration}
                onChange={(e) => updateTask(index, 'duration', e.target.value)}
              />
              <Button 
                variant="remove" 
                onClick={() => removeTask(index)}
                size="mini"
              >
                Eliminar
              </Button>
            </div>
          ))}
          <Button 
            variant="add" 
            onClick={addTask}
          >
            + Agregar Tarea
          </Button>
        </div>

        <Button 
          variant="schedule" 
          onClick={generateSchedule} 
          disabled={loading || tasks.length === 0}
          fullWidth
        >
          {loading ? (
            <span className="loading-indicator">
              <span className="loading-spinner"></span> Generando horario...
            </span>
          ) : 'Organizar mi día'}
        </Button>
      </div>

      {error && (
        <div className="error">
          <span className="error-icon">⚠️</span>
          <div className="error-message">
            <strong>Error:</strong> {error}
            {error.includes('Error HTTP') && (
              <p className="error-help">Intenta de nuevo en unos momentos o verifica tu conexión a internet.</p>
            )}
          </div>
        </div>
      )}
      
      {scheduleItems.length > 0 && (
        <div className="schedule-result">
          <h3>Tu horario optimizado</h3>
          <div className="schedule-list">
            {scheduleItems.map((item, index) => (
              <div 
                key={index} 
                className={`schedule-item ${item.isBreak ? 'break' : `priority-${item.priority}`} ${item.completed ? 'completed' : ''}`}
              >
                <div className="item-content">
                  <label className="task-checkbox">
                    <input 
                      type="checkbox" 
                      checked={item.completed}
                      onChange={() => toggleTaskCompletion(index)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <div className="task-details">
                    <h4 className={item.completed ? 'completed-text' : ''}>{item.task}</h4>
                    {item.isBreak && (
                      <p className={`break-description ${item.completed ? 'completed-text' : ''}`}>
                        {item.breakDescription}
                      </p>
                    )}
                    <span className="duration">{item.duration} horas</span>
                  </div>
                </div>
                <div className="item-actions">
                  <div className="priority-tag">
                    {!item.isBreak && `Prioridad: ${item.priority}`}
                    {item.isBreak && "Descanso"}
                  </div>
                  <Button
                    variant="remove"
                    size="mini"
                    onClick={() => removeScheduleItem(index)}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskScheduler; 