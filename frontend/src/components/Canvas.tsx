import React, { useState, useEffect } from 'react';
import { type Pixel } from "../types"
import { Square } from './Square'
import { useCanvasSocket } from '../hooks/useCanvasSocket';

const rows = 50
const cols = 50

interface CanvasProps {
    user: string|null,
    selectedColor: string|null,
    resetTrigger: number
}

export const Canvas = React.memo(({ user, selectedColor, resetTrigger }:CanvasProps ) => {
    const [pixels, setPixels] = useState<Pixel[]>(Array(rows*cols).fill(null));
    const { sendPixelUpdate, sendResetUpdate, lastMessage, isConnected } = useCanvasSocket();

    useEffect(() => {
        if (lastMessage) {
            if (lastMessage.type === 'canvas_init' || lastMessage.type === 'reset_canvas') {
                setPixels(lastMessage.canvas)
            }
            else if (lastMessage.type === 'update_pixel') {
                setPixels((prevState) => {
                    const updated = [...prevState];
                    const idx = lastMessage.y*cols + lastMessage.x;
                    updated[idx] = {x: lastMessage.x, y: lastMessage.y, color: lastMessage.color, user: lastMessage.user};
                    return updated;
                })
            }
        }
    }, [lastMessage])

    useEffect(() => {
        if (resetTrigger) {sendResetUpdate()}
    }, [resetTrigger])

    return (
        <div 
            style={{
                justifyContent: 'center',
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 20px)`,
                gridTemplateRows: `repeat(${rows}, 20px)`,
                gap:'1px'
            }}>
            {pixels.map((pixel, idx) => {
                const displayPixel = pixel || { x: Math.floor(idx % cols), y: Math.floor(idx / cols), color: '#FFFFFF', user: null };
                return (<Square key={`${displayPixel.x}-${displayPixel.y}`} pixel={displayPixel} newUser={user} newColor={selectedColor} sendPixelUpdate={sendPixelUpdate}/>)
            })}
        </div>
    )
}
)