import React, { useEffect, useState } from 'react';
import Button from './Button';
import { API_ENDPOINTS } from '../config';
import './AdviceWindow.css';

interface AdviceWindowProps {
    energyLevel: number;
    mood: string;
    availableHours: number;
}

export const AdviceWindow: React.FC<AdviceWindowProps> = ({ energyLevel, mood, availableHours }) => {
    const [advice, setAdvice] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const fetchAdvice = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_ENDPOINTS.DAILY_TIP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setAdvice(data.series.tip);
        } catch (error) {
            console.error('Error:', error);
            setAdvice('Lo siento, no pude obtener consejos en este momento.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdvice();
    }, [energyLevel, mood, availableHours]);

    return (
        <div className="advice-window">
            <h2>Consejos del Día</h2>
            <div className="advice-content">
                {loading ? (
                    <p className="loading">Cargando...</p>
                ) : (
                    <div className="advice-text">
                        <p>{advice}</p>
                    </div>
                )}
            </div>
            <Button 
                onClick={fetchAdvice}
                disabled={loading}
                variant="purple"
                size="medium"
            >
                {loading ? 'Cargando...' : 'Nuevo consejo'}
            </Button>
        </div>
    );
}; 