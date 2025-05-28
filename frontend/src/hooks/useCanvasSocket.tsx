import useWebSocket, { ReadyState } from 'react-use-websocket'
import { type Pixel } from '../types'
import { useCallback } from 'react'


export const useCanvasSocket = () => {
    const socketUrl = `ws://localhost:5000/ws/socket-server/` // TODO: change to production link 

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        socketUrl,
        {
            share: false,
            shouldReconnect: () => true
        }
    )

    const sendPixelUpdate = useCallback((pixel: Pixel) => {
        sendJsonMessage({ type: 'place_pixel', x:pixel.x, y:pixel.y, color:pixel.color, user:pixel.user, colored_at:Date.now()})
    }, [sendJsonMessage])

    return {
        sendPixelUpdate,
        sendResetUpdate: () => {
            sendJsonMessage({ type: 'reset_canvas' });
        },
        lastMessage: lastJsonMessage,
        readyState,
        isConnected: readyState === ReadyState.OPEN
    }
    
}