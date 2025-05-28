import { HexColorPicker } from "react-colorful";
import { useState } from "react";

interface CanvasColorPickerProps {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>
}

export const CanvasColorPicker: React.FC<CanvasColorPickerProps> = ({ color, setColor }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <HexColorPicker color={color} onChange={setColor}/><br/>
            <font color={color}>{color}</font>
        </div>
    )
}

export default CanvasColorPicker;