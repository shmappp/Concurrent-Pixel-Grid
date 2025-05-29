import { Navigate } from 'react-router-dom';
import { Home } from './pages/Home'
import { Login } from './pages/Login'

export const routes = [
    { path: '/login', element: <Login /> },
    { path: '/home', element: <Home />},
    { path: '/', element: <Navigate to='/login' />}
]

export default routes;