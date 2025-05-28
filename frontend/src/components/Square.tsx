import '../css/Square.css'
import { type Pixel } from "../types"
import React from 'react'

interface SquareProps {
    pixel: Pixel;
    onClick: (pixel: Pixel) => void;
}

export const Square = React.memo(({ pixel, onClick }: SquareProps) => {
    return (
        <>         
            <div className='Pixel' 
                style={{ backgroundColor: pixel.color }} 
                onClick={() => onClick(pixel)} 
                data-tooltip-id='pixel-tooltip'
                data-tooltip-html={`x:${pixel.x} y:${pixel.y} <br> color: <font color=${pixel.color}> ${pixel.color} </font> <br> user: ${pixel.user}`} />
        </>
 
    )
})
