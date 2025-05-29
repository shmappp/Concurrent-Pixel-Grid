import React, { useState } from "react";
import { useCanvasContext } from '../context/CanvasContext';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../css/Login.css'
import { TypeAnimation } from "react-type-animation";


export const Login = () => {
    const { user, setUser } = useCanvasContext();
    const [localUser, setLocalUser] = useState(null)
    const navigate = useNavigate();
    
    const handleUserChange = () => {
        setUser(localUser);
        navigate('/home', { viewTransition:true });
    }

    return (
        <>   
            
            <title>Login</title>
            <div className='login-container'>
                <TypeAnimation sequence={[
                    'Welcome to the Concurrent Pixel Grid',
                    1000,
                    'Welcome to the Concurrent Pixel Grid?',
                    500,
                    'Welcome to the Concurrent Pixel Page',
                    500,
                    'Welcome to the Concurrent Pixel Page?',
                    500,
                    'Welcome to the Reddit r/place clone?',
                    500,
                    'Welcome to the Reddit r/place inspired page?',
                    500,
                    'Welcome to the Concurrent Pixel Grid',
                    1000,
                ]}
                wrapper='span'
                speed={60}
                className='login-heading'
                />
                <div className='login-box'>
                    <input className='login-input' placeholder='What&apos;s your name?' onChange={(e) => setLocalUser(e.target.value)}></input>
                    <button className="start-button" onClick={handleUserChange}> Start </button>
                </div>
            </div>
        </>

    )
} 