import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Error from './routes/Error.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Books from './routes/Books.jsx'
import Geek from './routes/Geek.jsx'
import Monitors from './routes/Monitors.jsx'
import Peripherals from './routes/Peripherals.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "books",
                element: <Books />
            },
            {
                path: "geek",
                element: <Geek />
            },
            {
                path: "monitors",
                element: <Monitors />
            },
            {
                path: "peripherals",
                element: <Peripherals />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
