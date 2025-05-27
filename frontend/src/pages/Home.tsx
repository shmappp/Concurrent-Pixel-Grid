import React, { useState, useEffect } from 'react';
import { Canvas } from '../components/Canvas'
import '../css/Home.css'

export const Home = () => {
    return (
        <div className='Home'>
            <title>Concurrent Pixel Grid</title>
            <div style= {{ display:'flex', justifyContent:'center' }}>
                <h1>Place</h1>
            </div>
            <div style={{ justifyContent:'center' }}>
                <Canvas />
            </div>
        </div>
    )
}