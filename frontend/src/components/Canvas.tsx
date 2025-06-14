import React, { useState, useEffect, useCallback, useRef } from 'react';
import { type Pixel } from "../types"
import { Square } from './Square'
import { useCanvasSocket } from '../hooks/useCanvasSocket';
import { useCanvasContext } from '../context/CanvasContext';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


interface CanvasProps {
    resetTrigger: number
}

export const Canvas = React.memo(({ resetTrigger }:CanvasProps ) => {
    const [canvasSize, setCanvasSize] = useState({ rows: 50, cols: 50 });
    const [pixels, setPixels] = useState<Pixel[]>(Array(canvasSize.rows*canvasSize.cols).fill(null));
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
                setCanvasSize({rows: lastMessage.rows, cols: lastMessage.columns});
                setPixels(lastMessage.canvas);
            }
            else if (lastMessage.type === 'update_pixel') {
                setPixels((prevState) => {
                    const updated = [...prevState];
                    const idx = lastMessage.y*canvasSize.cols + lastMessage.x;
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
        sendPixelUpdate(newPixel);
    }, [sendPixelUpdate])

    const isCanvasReady = pixels.length === canvasSize.rows * canvasSize.cols;

    if (!isCanvasReady) {
        return <div>Loading canvas...</div>;
}

    return (
        <>
            <div 
                style={{
                    justifyContent: 'center',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${canvasSize.cols}, 20px)`,
                    gridTemplateRows: `repeat(${canvasSize.rows}, 20px)`,
                    gap:'1px'
                }}>
                {pixels.map((pixel, idx) => {
                    const displayPixel = pixel || { x: idx % canvasSize.cols, y: Math.floor(idx / canvasSize.cols), color: '#FFFFFF', user: null };
                    return (<Square key={`${displayPixel.x}-${displayPixel.y}`} pixel={displayPixel} onClick={handlePixelClick}/>)
                })}
            </div>
            <Tooltip id="pixel-tooltip" place='right' style={{ zIndex:9999, textAlign:'center' }} />
    </>
    )
}
)