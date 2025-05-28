import React, { useState, useEffect, useCallback, useRef } from 'react';
import { type Pixel } from "../types"
import { Square } from './Square'
import { useCanvasSocket } from '../hooks/useCanvasSocket';
import { useCanvasContext } from '../context/CanvasContext';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const rows = 50
const cols = 50

interface CanvasProps {
    resetTrigger: number
}

export const Canvas = React.memo(({ resetTrigger }:CanvasProps ) => {
    const [pixels, setPixels] = useState<Pixel[]>(Array(rows*cols).fill(null));
    const { sendPixelUpdate, sendResetUpdate, lastMessage, isConnected } = useCanvasSocket();
    const { user, selectedColor } = useCanvasContext();
    const userRef = useRef(user)
    const selectedColorRef = useRef(selectedColor)

    useEffect(() => {
        selectedColorRef.current = selectedColor;
    }, [selectedColor]);

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    useEffect(() => {
        if (lastMessage) {
            if (lastMessage.type === 'canvas_init' || lastMessage.type === 'reset_canvas') {
                setPixels(lastMessage.canvas)
            }
            else if (lastMessage.type === 'update_pixel') {
                setPixels((prevState) => {
                    const updated = [...prevState];
                    const idx = lastMessage.y*cols + lastMessage.x;
                    updated[idx] = {x: lastMessage.x, y: lastMessage.y, color: lastMessage.color, user: lastMessage.user, colored_at: lastMessage.colored_at};
                    return updated;
                })
            }
        }
    }, [lastMessage])

    useEffect(() => {
        if (resetTrigger) {sendResetUpdate()}
    }, [resetTrigger])

    const handlePixelClick = useCallback((pixel: Pixel) => {
        const newPixel: Pixel  = {...pixel, color: selectedColorRef.current, user: userRef.current};
        console.log(newPixel);
        sendPixelUpdate(newPixel);
    }, [sendPixelUpdate])

    return (
        <>
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
                    return (<Square key={`${displayPixel.x}-${displayPixel.y}`} pixel={displayPixel} onClick={handlePixelClick}/>)
                })}
            </div>
            <Tooltip id="pixel-tooltip" place='right' style={{ textAlign:'center' }} />
    </>
    )
}
)