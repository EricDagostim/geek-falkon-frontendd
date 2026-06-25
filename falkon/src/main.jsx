import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Error from './routes/Error.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Page from './routes/Page.jsx'
import Promos from './routes/Promos.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Page />
            },
            {
                path: "promocoes",
                element: <Promos />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
