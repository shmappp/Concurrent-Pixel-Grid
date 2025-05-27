import React, { useState, useEffect } from 'react';
import { type Pixel } from "../types"
import { Square } from './Square'
import { useCanvasSocket } from '../hooks/useCanvasSocket';

const rows = 50
const cols = 50

export const Canvas = (user: string) => {
    const [pixels, setPixels] = useState<Pixel[]>(Array(rows*cols).fill(null));
    const { sendPixelUpdate, lastMessage, isConnected } = useCanvasSocket(user);

    useEffect(() => {
        let defaultPixels: Pixel[] = []
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                defaultPixels.push({x:col, y:row, color:'#FFFFFF', user:null})
            }
        }
        setPixels(defaultPixels);
    }, [])

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
                pixel && <Square color={pixel.color} />
            ))}
        </div>
    )
}