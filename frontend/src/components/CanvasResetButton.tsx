import React from 'react';
import '../css/CanvasResetButton.css'


interface CanvasResetButtonProps {
    onClick: () => void;
}

export const CanvasResetButton: React.FC<CanvasResetButtonProps> = ({ onClick }) => {
    return (
        <button className='reset-button' onClick={onClick} >Reset Canvas</button>
    )
}