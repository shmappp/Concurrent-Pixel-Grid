import React, { useState, useEffect } from 'react';
import { type Pixel } from "../types"
import { Square } from './Square'

const rows = 50
const cols = 50

export const Canvas = () => {
    const pixels: Pixel[] = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            pixels.push({x:col, y:row, color:'#3495eb', user:'test'})
        }
    }
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
                <Square color={pixel.color} />
            ))}
        </div>
    )
}