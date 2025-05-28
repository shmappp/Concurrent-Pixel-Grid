import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '../components/Canvas'
import { CanvasResetButton } from '../components/CanvasResetButton'
import '../css/Home.css'
import CanvasColorPicker from '../components/CanvasColorPicker';
import { useCanvasContext } from '../context/CanvasContext';
import Button from 'react-bootstrap/Button'
// import { HexColorPicker } from "react-colorful";

export const Home = () => {
    const [resetTrigger, setResetTrigger] = useState(0);
    const { user, setUser, selectedColor, setSelectedColor } = useCanvasContext();
    const [localUser, setLocalUser] = useState(null)

    const handleCanvasResetClick = useCallback(() => {
        setResetTrigger(prev => prev + 1)
    }, [])

    const handleUserChange = () => {
        setUser(localUser);
    }

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
                    <Canvas user={user} selectedColor={selectedColor} resetTrigger={ resetTrigger }/>
                </div>
                <div className='color-picker-box'>
                    <CanvasColorPicker color={selectedColor} setColor={setSelectedColor} />
                </div>
            </div>
            <div style= {{ display:'flex', justifyContent:'center' }}>
                <input placeholder='type username' onChange={(e) => setLocalUser(e.target.value)}></input>
                <Button variant='outline-info' onClick={handleUserChange}>Apply</Button>
            </div>
            <div style= {{ display:'flex', justifyContent:'center' }}>
                <font>Current user: {user}</font>
            </div>
        </div>
    )
}