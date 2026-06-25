import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'

function App() {
    return (
        <div className="app-layout">
            <Header />
            <main className="app-content">
                <Outlet />
            </main>
        </div>
    )
}

export default App
