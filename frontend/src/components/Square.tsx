import '../css/Square.css'

interface SquareProps {
    color: string;
}

export const Square = ({ color }: SquareProps) => {
    return <div className='Pixel' style={{ backgroundColor: color }} />
}
