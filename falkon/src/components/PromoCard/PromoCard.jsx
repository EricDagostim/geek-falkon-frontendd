import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox, faPercent } from "@fortawesome/free-solid-svg-icons"
import "./PromoCard.css"

const PromoCard = ({ produto }) => {
    const { nome, preco, categoria, estoque } = produto

    // Desconto fictício baseado na categoria e preço
    const descontoPct = estoque <= 5 ? 30 : estoque <= 10 ? 20 : 15
    const precoAntigo = (preco / (1 - descontoPct / 100)).toFixed(2)

    // Badge baseado no estoque
    let badge = null
    let badgeClass = ''

    if (estoque <= 5) {
        badge = 'Últimas unidades!'
        badgeClass = 'badge-red'
    } else if (estoque <= 10) {
        badge = 'Envio grátis'
        badgeClass = 'badge-green'
    } else {
        badge = 'Oportunidade única'
        badgeClass = 'badge-orange'
    }

    const formatPrice = (value) => {
        return `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    }

    return (
        <div className="promo-card" id={`promo-card-${produto.id}`}>
            {/* Selo de desconto */}
            <div className="promo-card-discount" id={`discount-${produto.id}`}>
                <FontAwesomeIcon icon={faPercent} />
                <span>-{descontoPct}%</span>
            </div>

            <div className="product-card-image">
                {produto.imagem ? (
                    <img src={produto.imagem} alt={nome} />
                ) : (
                    <FontAwesomeIcon icon={faBox} className="placeholder-icon" />
                )}
            </div>
            <span className="product-card-name">{nome}</span>
            <span className="product-card-category">{categoria}</span>
            <span className="product-card-old-price">{formatPrice(precoAntigo)}</span>
            <span className="product-card-price">{formatPrice(preco)}</span>
            {badge && (
                <span className={`product-card-badge ${badgeClass}`}>{badge}</span>
            )}
        </div>
    )
}

export default PromoCard
