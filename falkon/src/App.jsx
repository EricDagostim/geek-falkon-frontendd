
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Searchbar from './components/Searchbar'
import Filters from './components/Filters'

function App() {

    return (
        <>
            <Header />
            <Searchbar />
            <div style={{ display: 'flex' }}>
                <Filters />
                <Outlet />
            </div>
        </>
    )
}

export default App
