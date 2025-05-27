import React, { useState, useEffect } from 'react';
import { type Pixel } from "../types"
import { Square } from './Square'
import { useCanvasSocket } from '../hooks/useCanvasSocket';

const rows = 50
const cols = 50
const color = '#FF0000' 
interface CanvasProps {
    user: string|null
}

export const Canvas = ({ user }:CanvasProps ) => {
    const [pixels, setPixels] = useState<Pixel[]>(Array(rows*cols).fill(null));
    const { sendPixelUpdate, lastMessage, isConnected } = useCanvasSocket(user);

    useEffect(() => {
        if (lastMessage) {
            if (lastMessage.type === 'canvas_init') {
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

    return (
        <div 
            style={{
                justifyContent: 'center',
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 20px)`,
                gridTemplateRows: `repeat(${rows}, 20px)`,
                gap:'1px'
            }}>
            {pixels.map((pixel, idx) => (
                pixel && <Square pixel={pixel} newUser={user} newColor={color} sendPixelUpdate={sendPixelUpdate}/>
            ))}
        </div>
    )
}