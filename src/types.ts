// Tipos para interfaz con la API de TaskScheduler
export interface Task {
  name: string;
  duration: number;
}

export interface ScheduleRequest {
  tasks: Task[];
  time: number;
  energy: number;
  dayType: 'intenso' | 'relajado' | 'mixto';
}

export interface ScheduleResponse {
  success: boolean;
  schedule: Array<{
    task: string;
    duration: number;
    priority: 'alta' | 'media' | 'baja';
    isBreak: boolean;
    breakDescription?: string;
  }>;
  error?: string;
}

// Mapa de intensidad para mensajes en la UI
export const intensityMap = {
  low: [1, 4],
  medium: [5, 8],
  high: [9, 12]
}; 