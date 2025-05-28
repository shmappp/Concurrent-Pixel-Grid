import React, { useState, useEffect } from 'react';
import { Canvas } from '../components/Canvas'
import { CanvasResetButton } from '../components/CanvasResetButton'
import '../css/Home.css'

export const Home = () => {
    const [resetTrigger, setResetTrigger] = useState(0);

    const handleCanvasResetClick = () => {
        setResetTrigger(prev => prev + 1)
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
            <div style={{ justifyContent:'center' }}>
                <Canvas user={null} resetTrigger={ resetTrigger }/>
            </div>
        </div>
    )
}