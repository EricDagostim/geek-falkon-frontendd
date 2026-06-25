import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSliders, faMagnifyingGlass, faTableCellsLarge, faUser } from "@fortawesome/free-solid-svg-icons"
import "./Header.css"

const Header = () => {
    return (
        <header className="header" id="main-header">
            <Link to="/" className="header-logo">
                <span>Falkon</span>
                <span className="logo-emoji">
                    <img src="/src/assets/logo.svg" alt="" />
                </span>
            </Link>

            <button className="header-filter-btn" id="filter-btn" aria-label="Filtros">
                <FontAwesomeIcon icon={faSliders} />
            </button>

            <div className="header-search">
                <input
                    type="text"
                    placeholder="Buscar produtos..."
                    id="search-input"
                />
                <button className="header-search-btn" id="search-btn" aria-label="Buscar">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>

            <div className="header-actions">
                <button className="header-action-btn" id="cart-btn" aria-label="Carrinho">
                    <FontAwesomeIcon icon={faTableCellsLarge} />
                </button>
                <button className="header-action-btn" id="user-btn" aria-label="Usuário">
                    <FontAwesomeIcon icon={faUser} />
                </button>
            </div>
        </header>
    )
}

export default Header
