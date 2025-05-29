import { CanvasProvider } from './context/CanvasContext';
import { Home } from './pages/Home'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router" 
import routes from './routes'

const router = createBrowserRouter(routes);

function App() {
    return (
        <CanvasProvider>
            <RouterProvider router={router} />
        </CanvasProvider>
    )
}

export default App;