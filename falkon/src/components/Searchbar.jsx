import { Link } from "react-router-dom"

const Searchbar = () => {
    return (
        <div>
            <ul>
                <li><Link to="">Todos</Link></li>
                <li><Link to="books">Livros</Link></li>
                <li><Link to="geek">Geek</Link></li>
                <li><Link to="monitors">Monitores</Link></li>
                <li><Link to="peripherals">Periféricos</Link></li>
            </ul>
        </div>
    )
}

export default Searchbar
