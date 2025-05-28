import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '../components/Canvas'
import { CanvasResetButton } from '../components/CanvasResetButton'
import '../css/Home.css'
import CanvasColorPicker from '../components/CanvasColorPicker';
// import { HexColorPicker } from "react-colorful";

export const Home = () => {
    const [resetTrigger, setResetTrigger] = useState(0);
    const [user, setUser] = useState(null);
    const [color, setColor] = useState("#000000")

    const handleCanvasResetClick = useCallback(() => {
        setResetTrigger(prev => prev + 1)
    }, [])

    const handleUserChange = useCallback((e) => {
        setUser(e.target.value);
    }, [])

    return (
        <div className='Home'>
            <title>Concurrent Pixel Grid</title>
            <div style= {{ display:'flex', justifyContent:'center' }}>
                <h1>Place</h1>
                
            </div>
            <div style= {{ display:'flex', justifyContent:'center', marginBottom:'20px' }}>
                <CanvasResetButton onClick={handleCanvasResetClick} />
            </div>
            <div className='center-container'>
                <div className='main-box'>
                    <Canvas user={user} selectedColor={color} resetTrigger={ resetTrigger }/>
                </div>
                <div className='color-picker-box'>
                    <CanvasColorPicker color={color} setColor={setColor} />
                </div>
            </div>
            <div style= {{ display:'flex', justifyContent:'center' }}>
                <input placeholder='type username' onChange={handleUserChange}></input>
            </div>
        </div>
    )
}