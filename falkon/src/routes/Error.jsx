import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateLeft, faTableCellsLarge, faUser } from "@fortawesome/free-solid-svg-icons"
import "./Error.css"

const Error = () => {
    const navigate = useNavigate()

    return (
        <div className="error-page" id="error-page">
            {/* Simplified header — just logo + cart + user */}
            <header className="error-header" id="error-header">
                <Link to="/" className="error-header-logo">
                    <span>Falkon</span>
                    <img src="/src/assets/logo.svg" alt="Logo" />
                </Link>
                <div className="error-header-actions">
                    <button className="header-action-btn" aria-label="Carrinho">
                        <FontAwesomeIcon icon={faTableCellsLarge} />
                    </button>
                    <button className="header-action-btn" aria-label="Usuário">
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
            </header>

            {/* 404 Content */}
            <div className="error-content">
                <span className="error-title">página não encontrada.</span>
                <span className="error-number">404</span>
                <span className="error-subtitle">"Falhas críticas em testes de percepção dão nisso"</span>
                <button className="error-btn" id="error-back-btn" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                    <span>voltar</span>
                </button>
            </div>
        </div>
    )
}

export default Error
