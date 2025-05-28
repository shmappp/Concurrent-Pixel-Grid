import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import Button from 'react-bootstrap/Button'

interface CanvasColorPickerProps {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>
}

export const CanvasColorPicker: React.FC<CanvasColorPickerProps> = ({ color, setColor }) => {
    const [localColor, setLocalColor] = useState('#FFFFFF')
    return (
        <div style={{ textAlign: 'center' }}>
            <HexColorPicker color={localColor} onChange={setLocalColor}/><br/>
            <Button 
                variant='outline-secondary' 
                style={{ backgroundColor: 'white'}}
                onClick={() => setColor(localColor)}><font color={localColor}>{localColor}</font></Button>
        </div>

    )
}

export default CanvasColorPicker;