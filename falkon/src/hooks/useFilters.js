import { useState, useMemo } from 'react'

export const useFilters = (produtos) => {
    const [busca, setBusca] = useState('')
    const [categoriaAtiva, setCategoriaAtiva] = useState('todas')
    const [ordenacao, setOrdenacao] = useState('none') // 'none' | 'asc' | 'desc'

    // Extrair categorias únicas dos produtos
    const categorias = useMemo(() => {
        return ['todas', ...new Set(produtos.map(p => p.categoria))]
    }, [produtos])

    // Aplicar filtros e ordenação
    const produtosFiltrados = useMemo(() => {
        let filtrados = [...produtos]

        // Filtro por busca de texto
        if (busca.trim()) {
            const termoBusca = busca.toLowerCase()
            filtrados = filtrados.filter(p =>
                p.nome.toLowerCase().includes(termoBusca) /*||
                (p.descricao && p.descricao.toLowerCase().includes(termoBusca)) */
            )
            filtrados.sort((a, b) => {
                const nomeA = a.nome.toLowerCase().indexOf(termoBusca)
                const nomeB = b.nome.toLowerCase().indexOf(termoBusca)

                return nomeA - nomeB
            })
        }

        // Filtro por categoria
        if (categoriaAtiva !== 'todas') {
            filtrados = filtrados.filter(p => p.categoria === categoriaAtiva)
        }

        // Ordenação por preço
        if (ordenacao === 'asc') {
            filtrados.sort((a, b) => a.preco - b.preco)
        } else if (ordenacao === 'desc') {
            filtrados.sort((a, b) => b.preco - a.preco)
        }

        return filtrados
    }, [produtos, busca, categoriaAtiva, ordenacao])

    const toggleOrdenacao = () => {
        if (ordenacao === 'none') setOrdenacao('asc')
        else if (ordenacao === 'asc') setOrdenacao('desc')
        else setOrdenacao('none')
    }

    const getOrdenacaoLabel = () => {
        if (ordenacao === 'asc') return 'Menor preço'
        if (ordenacao === 'desc') return 'Maior preço'
        return 'Ordenar'
    }

    return {
        busca,
        setBusca,
        categoriaAtiva,
        setCategoriaAtiva,
        ordenacao,
        categorias,
        produtosFiltrados,
        toggleOrdenacao,
        getOrdenacaoLabel
    }
}
