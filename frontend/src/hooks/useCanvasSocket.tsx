import useWebSocket, { ReadyState } from 'react-use-websocket'
import { type Pixel } from '../types'


export const useCanvasSocket = (user: string) => {
    const socketUrl = `ws://localhost:5000/ws/socket-server/` // TODO: change to production link 

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        socketUrl,
        {
            share: false,
            shouldReconnect: () => true
        }
    )

    return {
        sendPixelUpdate: (pixel: Pixel) => {
            sendJsonMessage({ type: 'place_pixel', x:pixel.x, y:pixel.y, color:pixel.color, user:user });
        },
        lastMessage: lastJsonMessage,
        readyState,
        isConnected: readyState === ReadyState.OPEN
    }
    
}