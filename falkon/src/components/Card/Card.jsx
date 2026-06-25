import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox } from "@fortawesome/free-solid-svg-icons"
import "./Card.css"

const Card = ({ produto }) => {
    const { nome, preco, categoria, promocao, estoque, nota } = produto

    // Derive old price (simulated markup) for promo items
    const precoAntigo = promocao ? (preco * 1.4).toFixed(2) : null

    // Derive badge based on existing fields
    let badge = null
    let badgeClass = ''

    if (promocao && estoque <= 5) {
        badge = 'Mais vendidos'
        badgeClass = 'badge-red'
    } else if (promocao) {
        badge = 'Envio gratis'
        badgeClass = 'badge-green'
    } else if (nota >= 4.8) {
        badge = 'Envio gratis'
        badgeClass = 'badge-green'
    }

    const formatPrice = (value) => {
        return `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    }

    return (
        <div className="product-card" id={`product-card-${produto.id}`}>
            <div className="product-card-image">
                {produto.imagem ? (
                    <img src={produto.imagem} alt={nome} />
                ) : (
                    <FontAwesomeIcon icon={faBox} className="placeholder-icon" />
                )}
            </div>
            <span className="product-card-name">{nome}</span>
            <span className="product-card-category">{categoria}</span>
            {precoAntigo && (
                <span className="product-card-old-price">{formatPrice(precoAntigo)}</span>
            )}
            <span className="product-card-price">{formatPrice(preco)}</span>
            {badge && (
                <span className={`product-card-badge ${badgeClass}`}>{badge}</span>
            )}
        </div>
    )
}

export default Card
