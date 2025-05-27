import '../css/Square.css'
import { type Pixel } from "../types"

interface SquareProps {
    pixel: Pixel;
    newUser: string;
    newColor: string;
    sendPixelUpdate: (pixel: Pixel) => void;
}

export const Square = ({ pixel, newUser, newColor, sendPixelUpdate }: SquareProps) => {

    const handleClick = () => {
        const newPixel: Pixel  = {x: pixel.x, y: pixel.y, color: newColor, user: newUser};
        console.log(newPixel);
        sendPixelUpdate(newPixel);
    }
    return <div className='Pixel' style={{ backgroundColor: pixel.color }} onClick={handleClick} />
}
