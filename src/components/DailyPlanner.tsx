import React, { useState } from 'react';
import { AdviceWindow } from './AdviceWindow';
import TaskScheduler from './TaskScheduler';
import './DailyPlanner.css';

// Definición local de interfaz para plan diario
interface DailyPlan {
    energyLevel: number;
    mood: string;
    availableHours: number;
}

export const DailyPlanner: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [plan, setPlan] = useState<DailyPlan>({
        energyLevel: 1,
        mood: 'Work Day',
        availableHours: 1
    });

    return (
        <div className="daily-planner">
            <h1>Planificador Diario</h1>
            <div className="planner-content">
                <div className="left-section">
                    <TaskScheduler />
                </div>
                <div className="right-section">
                    <AdviceWindow 
                        energyLevel={plan.energyLevel}
                        mood={plan.mood}
                        availableHours={plan.availableHours}
                    />
                </div>
            </div>
        </div>
    );
}; 