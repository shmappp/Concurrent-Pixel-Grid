import React from 'react';
import Button from 'react-bootstrap/Button'


interface CanvasResetButtonProps {
    onClick: () => void;
}

export const CanvasResetButton: React.FC<CanvasResetButtonProps> = ({ onClick }) => {
    return (
        <Button variant='warning' onClick={onClick} >Reset Canvas</Button>
    )
}