import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDesktop,
    faDiceD20,
    faShirt,
    faBolt,
    faMagnifyingGlass,
    faArrowUpShortWide,
    faArrowDownWideShort,
    faTag,
    faDice,
    faBookOpen
} from '@fortawesome/free-solid-svg-icons'
import Card from '../components/Card/Card'
import PromoCard from '../components/PromoCard/PromoCard'
import './Page.css'
import { useFilters } from '../hooks/useFilters'

const Page = () => {
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/produtos')
            .then(res => res.json())
            .then(data => setProdutos(data))
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

    const shortcuts = [
        { icon: faDesktop, label: 'Gamer', to: '#' },
        { icon: faDiceD20, label: 'RPG', to: '#' },
        { icon: faBookOpen, label: 'Livros', to: '#' },
        { icon: faShirt, label: 'Vestuário', to: '#' },
        { icon: faBolt, label: 'Promos', to: '/promocoes' },
    ]

    return (
        <div id="home-page">
            {/* Banner */}
            <div className="hero-banner" id="hero-banner">
                <img src="/src/assets/banner.png" alt="Banner Geek Falkon" />
                <h1>O melhor do universo geek</h1>
            </div>

            {/* Categorias */}
            <nav className="categories-section" id="categories-section">
                {shortcuts.map((cat) => (
                    <Link to={cat.to} key={cat.label} className="category-item">
                        <div className="category-icon">
                            <FontAwesomeIcon icon={cat.icon} />
                        </div>
                        <span className="category-label">{cat.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Barra de Controles: Busca + Filtros + Ordenação */}
            <section className="promo-controls" id="home-controls">
                {/* Barra de pesquisa */}
                <div className="promo-search" id="home-search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="promo-search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar nos produtos..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        id="home-search-input"
                    />
                </div>

                <div className="promo-filters-row">
                    {/* Filtros de categoria */}
                    <div className="promo-category-filters" id="home-category-filters">
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
                        id="home-sort-btn"
                    >
                        <FontAwesomeIcon icon={ordenacao === 'desc' ? faArrowDownWideShort : faArrowUpShortWide} />
                        <span>{getOrdenacaoLabel()}</span>
                    </button>
                </div>
            </section>

            {/* Contagem de resultados */}
            {produtosFiltrados.length !== produtos.length && (
                <div className="promo-results-info" id="home-results-info">
                    <span>{produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}</span>
                </div>
            )}

            {/* Grid de produtos */}
            <section className="products-grid" id="products-grid" style={{ marginTop: '20px' }}>
                {produtosFiltrados.length > 0 ? (
                    produtosFiltrados.map((produto) => {
                        if (produto.promocao)
                            return (<PromoCard key={`highlight-${produto.id}`} produto={produto} />)
                        else
                            return (<Card key={produto.id} produto={produto} />)
                    })
                ) : (
                    <div className="promo-empty" id="home-empty">
                        <span className="promo-empty-icon">
                            <FontAwesomeIcon icon={faDice} />
                        </span>
                        <span className="promo-empty-title">Nenhum produto encontrado</span>
                        <span className="promo-empty-text">Tente ajustar os filtros ou a busca</span>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Page
