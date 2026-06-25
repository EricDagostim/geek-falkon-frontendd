import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowUpShortWide, faArrowDownWideShort, faFire, faTag, faDice } from '@fortawesome/free-solid-svg-icons'
import PromoCard from '../components/PromoCard/PromoCard'
import './Promos.css'
import { useFilters } from '../hooks/useFilters'

const Promos = () => {
    const [produtos, setProdutos] = useState([])

    // Função de desconto
    // Gera um desconto fictício com base na quantidade em estoque
    const getDesconto = (produto) => {
        const { preco, estoque } = produto
        const descontoPct = estoque <= 5 ? 30 : estoque <= 10 ? 20 : 15
        const precoAntigo = preco / (1 - descontoPct / 100)
        const descontoValor = precoAntigo - preco
        return { descontoPct, descontoValor, precoFinal: preco }
    }

    // Ranking das melhores promoções (max 7)
    // Normalizar valores para 0-1 e aplicar pesos
    const rankPromocoes = () => {
        if (produtos.length === 0) return []

        const comDesconto = produtos.map(p => ({
            ...p,
            ...getDesconto(p)
        }))

        // Calcular max de cada dimensão para normalização
        const maxPct = Math.max(...comDesconto.map(p => p.descontoPct))
        const maxValor = Math.max(...comDesconto.map(p => p.descontoValor))
        const maxPreco = Math.max(...comDesconto.map(p => p.precoFinal))

        // Score = (pct_normalizado * 3) + (valor_normalizado * 2) + ((1 - preco_normalizado) * 1)
        const comScore = comDesconto.map(p => ({
            ...p,
            score:
                ((p.descontoPct / (maxPct || 1)) * 3) +
                ((p.descontoValor / (maxValor || 1)) * 2) +
                ((1 - p.precoFinal / (maxPreco || 1)) * 1)
        }))

        // Ordenar do maior score para o menor
        comScore.sort((a, b) => b.score - a.score)

        return comScore.slice(0, 7)
    }

    const destaques = rankPromocoes()

    useEffect(() => {
        fetch('http://localhost:3000/produtos')
            .then(res => res.json())
            .then(data => {
                // Filtrar EXCLUSIVAMENTE produtos com promocao: true
                const promos = data.filter(p => p.promocao === true)
                setProdutos(promos)
            })
            .catch(err => console.error('Erro ao buscar produtos:', err))
    }, [])

    const {
        busca,
        setBusca,
        categoriaAtiva,
        setCategoriaAtiva,
        ordenacao,
        categorias,
        produtosFiltrados,
        toggleOrdenacao,
        getOrdenacaoLabel
    } = useFilters(produtos)

    return (
        <div className="promo-page" id="promo-page">
            {/* Hero Banner da Promoção */}
            <section className="promo-hero" id="promo-hero">
                <div className="promo-hero-bg">
                    <img src="/src/assets/banner.png" alt="Promoções" />
                </div>
                <div className="promo-hero-content">
                    <div className="promo-hero-badge">
                        <FontAwesomeIcon icon={faFire} />
                        <span>Vitrine de Promoções</span>
                    </div>
                    <h1 className="promo-hero-title">Aproveite, é o seu turno.</h1>
                    <p className="promo-hero-subtitle">O mestre separou algumas coisas para você!</p>

                    {/* Destaques — melhores promoções rankeadas */}
                    {destaques.length > 0 && (
                        <div className="promo-highlights-row" id="promo-highlights">
                            {destaques.map((produto) => (
                                <PromoCard key={`highlight-${produto.id}`} produto={produto} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Barra de Controles: Busca + Filtros + Ordenação */}
            <section className="promo-controls" id="promo-controls">
                {/* Barra de pesquisa */}
                <div className="promo-search" id="promo-search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="promo-search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar nas promoções..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        id="promo-search-input"
                    />
                </div>

                <div className="promo-filters-row">
                    {/* Filtros de categoria */}
                    <div className="promo-category-filters" id="promo-category-filters">
                        {categorias.map((cat) => (
                            <button
                                key={cat}
                                className={`promo-filter-btn ${categoriaAtiva === cat ? 'active' : ''}`}
                                onClick={() => setCategoriaAtiva(cat)}
                                id={`filter-${cat}`}
                            >
                                <FontAwesomeIcon icon={faTag} />
                                <span>{cat === 'todas' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                            </button>
                        ))}
                    </div>

                    {/* Botão de ordenação */}
                    <button
                        className={`promo-sort-btn ${ordenacao !== 'none' ? 'active' : ''}`}
                        onClick={toggleOrdenacao}
                        id="promo-sort-btn"
                    >
                        <FontAwesomeIcon icon={ordenacao === 'desc' ? faArrowDownWideShort : faArrowUpShortWide} />
                        <span>{getOrdenacaoLabel()}</span>
                    </button>
                </div>
            </section>

            {/* Contagem de resultados */}
            <div className="promo-results-info" id="promo-results-info">
                <span>{produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'oferta encontrada' : 'ofertas encontradas'}</span>
            </div>

            {/* Grid de Produtos em Promoção */}
            <section className="promo-grid" id="promo-grid">
                {produtosFiltrados.length > 0 ? (
                    produtosFiltrados.map((produto) => (
                        <PromoCard key={produto.id} produto={produto} />
                    ))
                ) : (
                    <div className="promo-empty" id="promo-empty">
                        <span className="promo-empty-icon">
                            <FontAwesomeIcon icon={faDice} />
                        </span>
                        <span className="promo-empty-title">Nenhuma oferta encontrada</span>
                        <span className="promo-empty-text">Tente ajustar os filtros ou a busca</span>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Promos
