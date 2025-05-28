import '../css/Square.css'
import { type Pixel } from "../types"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import React from 'react'

interface SquareProps {
    pixel: Pixel;
    newUser: string;
    newColor: string;
    sendPixelUpdate: (pixel: Pixel) => void;
}

export const Square = React.memo(({ pixel, newUser, newColor, sendPixelUpdate }: SquareProps) => {

    const handleClick = () => {
        const newPixel: Pixel  = {...pixel, color: newColor, user: newUser};
        console.log(newPixel);
        sendPixelUpdate(newPixel);
    }

    const tooltipId = `pixel-tooltip-${pixel.x}-${pixel.y}`

    return (
        <>         
            <div className='Pixel' 
                style={{ backgroundColor: pixel.color }} 
                onClick={handleClick} 
                data-tooltip-id={tooltipId}
                data-tooltip-html={`x:${pixel.x} y:${pixel.y} <br> color: <font color=${pixel.color}> ${pixel.color} </font> <br> user: ${pixel.user}`} />
            <Tooltip id={tooltipId} place='right' style={{ textAlign:'center' }} />

        </>
 
    )
})
