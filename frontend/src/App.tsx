import { CanvasProvider } from './context/CanvasContext';
import { Home } from './pages/Home'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
    return (
        <CanvasProvider>
            <Home />
        </CanvasProvider>
    )
}

export default App;