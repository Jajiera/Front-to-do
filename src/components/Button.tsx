import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'purple' | 'add' | 'remove' | 'schedule';
    fullWidth?: boolean;
    size?: 'mini' | 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    disabled, 
    variant = 'primary',
    fullWidth = false,
    size = 'medium'
}) => {
    // Asignar un nombre de clase según la variante del botón
    const getButtonClass = () => {
        switch (variant) {
            case 'add': return 'btn-add';
            case 'remove': return 'btn-remove';
            case 'schedule': return 'btn-schedule';
            case 'purple': return 'btn-tip';
            case 'primary': return 'btn-primary';
            case 'secondary': return 'btn-secondary';
            default: return 'btn-primary';
        }
    };

    return (
        <StyledWrapper fullWidth={fullWidth} size={size}>
            <button 
                className={`${getButtonClass()} ${size}`} 
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div<{ fullWidth?: boolean; size?: string }>`
    ${props => props.fullWidth && `
        width: 100%;
        display: block;
    `}

    button {
        position: relative;
        display: inline-block;
        cursor: pointer;
        outline: none;
        border: 0;
        vertical-align: middle;
        text-decoration: none;
        font-family: inherit;
        font-size: 15px;
        ${props => props.fullWidth && `
            width: 100%;
        `}
    }

    button.mini {
        padding: 0.3em 0.8em;
        font-size: 11px;
        transform-style: flat;
    }

    button.small {
        padding: 0.5em 1em;
        font-size: 12px;
    }

    button.medium {
        padding: 0.75em 1.5em;
        font-size: 13px;
    }

    button.large {
        padding: 1em 2em;
        font-size: 14px;
    }

    /* Estilos base para todos los botones */
    button.btn-primary,
    button.btn-secondary,
    button.btn-tip,
    button.btn-add,
    button.btn-remove,
    button.btn-schedule {
        font-weight: 600;
        text-transform: uppercase;
        background: #fff0f0;
        border: 2px solid #b18597;
        border-radius: 0.5em;
        transform-style: preserve-3d;
        transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
        font-family: 'Roboto', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
        letter-spacing: 0.5px;
    }

    /* Ajustar botón mini para el botón eliminar */
    button.btn-remove.mini {
        background: #ffebee;
        border-width: 1px;
        border-radius: 4px;
        letter-spacing: 0;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        transform-style: flat;
    }

    button.btn-remove.mini::before {
        display: none;
    }

    /* Botón primario verde */
    button.btn-primary {
        background: #a5d6a7;
        border-color: #2e7d32;
        color: #2e7d32;
    }

    /* Botón secundario azul */
    button.btn-secondary {
        background: #90caf9;
        border-color: #1565c0;
        color: #1565c0;
    }

    /* Botón de consejos púrpura */
    button.btn-tip {
        background: #e1bee7;
        border-color: #7b1fa2;
        color: #7b1fa2;
    }

    /* Botón de agregar verde */
    button.btn-add {
        background: #a5d6a7;
        border-color: #2e7d32;
        color: #2e7d32;
    }

    /* Botón de eliminar rojo */
    button.btn-remove {
        background:rgb(221, 108, 108);
        border-color: rgb(107, 9, 9);
        color: rgb(122, 16, 16);
    }

    /* Botón de programar púrpura */
    button.btn-schedule {
        background: #e1bee7;
        border-color: #7b1fa2;
        color: #7b1fa2;
    }

    /* Efecto 3D para todos los botones */
    button.btn-primary::before,
    button.btn-secondary::before,
    button.btn-tip::before,
    button.btn-add::before,
    button.btn-remove::before,
    button.btn-schedule::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        transform: translate3d(0, 0.75em, -1em);
        transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
    }

    button.btn-primary::before,
    button.btn-add::before {
        background: #81c784;
        box-shadow: 0 0 0 2px #2e7d32, 0 0.625em 0 0 #e8f5e9;
    }

    button.btn-secondary::before {
        background: #64b5f6;
        box-shadow: 0 0 0 2px #1565c0, 0 0.625em 0 0 #e3f2fd;
    }

    button.btn-tip::before,
    button.btn-schedule::before {
        background: #ce93d8;
        box-shadow: 0 0 0 2px #7b1fa2, 0 0.625em 0 0 #f3e5f5;
    }

    button.btn-remove::before {
        background: #ef5350;
        box-shadow: 0 0 0 2px rgb(107, 9, 9), 0 0.625em 0 0rgb(226, 102, 121);
    }

    /* Efectos hover */
    button.btn-primary:hover,
    button.btn-secondary:hover,
    button.btn-tip:hover,
    button.btn-add:hover,
    button.btn-remove:hover,
    button.btn-schedule:hover {
        transform: translate(0, 0.25em);
    }

    button.btn-primary:hover,
    button.btn-add:hover {
        background: #81c784;
    }

    button.btn-secondary:hover {
        background: #64b5f6;
    }

    button.btn-tip:hover,
    button.btn-schedule:hover {
        background: #ce93d8;
    }

    button.btn-remove:hover {
        background: #ef5350;
    }

    button.btn-primary:hover::before,
    button.btn-secondary:hover::before,
    button.btn-tip:hover::before,
    button.btn-add:hover::before,
    button.btn-remove:hover::before,
    button.btn-schedule:hover::before {
        transform: translate3d(0, 0.5em, -1em);
    }

    button.btn-primary:hover::before,
    button.btn-add:hover::before {
        box-shadow: 0 0 0 2px #2e7d32, 0 0.5em 0 0 #e8f5e9;
    }

    button.btn-secondary:hover::before {
        box-shadow: 0 0 0 2px #1565c0, 0 0.5em 0 0 #e3f2fd;
    }

    button.btn-tip:hover::before,
    button.btn-schedule:hover::before {
        box-shadow: 0 0 0 2px #7b1fa2, 0 0.5em 0 0 #f3e5f5;
    }

    button.btn-remove:hover::before {
        box-shadow: 0 0 0 2px rgb(107, 9, 9), 0 0.5em 0 0rgb(233, 156, 168);
    }

    /* Efectos active */
    button.btn-primary:active,
    button.btn-secondary:active,
    button.btn-tip:active,
    button.btn-add:active,
    button.btn-remove:active,
    button.btn-schedule:active {
        transform: translate(0em, 0.75em);
    }

    button.btn-primary:active,
    button.btn-add:active {
        background: #81c784;
    }

    button.btn-secondary:active {
        background: #64b5f6;
    }

    button.btn-tip:active,
    button.btn-schedule:active {
        background: #ce93d8;
    }

    button.btn-remove:active {
        background: #ef5350;
    }

    button.btn-primary:active::before,
    button.btn-secondary:active::before,
    button.btn-tip:active::before,
    button.btn-add:active::before,
    button.btn-remove:active::before,
    button.btn-schedule:active::before {
        box-shadow: 0 0 0 2px transparent, 0 0 transparent;
        transform: translate3d(0, 0, -1em);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }

    button:disabled::before {
        box-shadow: none;
        transform: none;
    }
`;

export default Button; 