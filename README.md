# Geek Falkon Frontend

Este é o repositório do frontend do **Geek Falkon**, um e-commerce moderno voltado para o universo geek (jogos gamer, RPG, livros, vestuário e promoções). A aplicação é construída com **React**, utilizando **Vite** como build tool e **React Router** para navegação.

---

## Arquitetura e Estrutura do Projeto

```
src/
├── assets/         # Imagens, logotipos e vetores
├── components/     # Componentes visuais reutilizáveis
├── hooks/          # Hooks customizados (logística de estado e filtros)
├── routes/         # Páginas/rotas principais da aplicação
├── App.jsx         # Layout base da aplicação
└── main.jsx        # Ponto de entrada do React com o Router
```

---

## Páginas (Routes)

As páginas representam as diferentes telas mapeadas pelo roteador da aplicação (`main.jsx`).

### 1. Página Base (`App.jsx`)
* **Função:** Atua como o layout principal da aplicação.
* **Componentes:** Renderiza o componente `Header` no topo e utiliza o `<Outlet />` do `react-router-dom` para injetar dinamicamente as páginas filhas dependendo da rota acessada.

### 2. Home Page (`Page.jsx`)
* **Rota:** `/`
* **Função:** É a página principal do site, onde todos os produtos são exibidos.
* **Funcionamento:**
  - Busca os produtos da API mockada (`http://localhost:3000/produtos`) no ciclo de vida inicial (`useEffect`).
  - Utiliza o hook customizado `useFilters` para aplicar busca textual, filtros de categoria e ordenação por preço.
  - Renderiza cartões de produtos: se o produto estiver com a flag `promocao: true`, renderiza um `PromoCard`; caso contrário, renderiza um `Card` comum.
  - Exibe mensagens de feedback caso a busca não retorne resultados.

### 3. Vitrine de Promoções (`Promos.jsx`)
* **Rota:** `/promocoes`
* **Função:** Página dedicada à exibição e classificação de produtos em oferta.
* **Funcionamento:**
  - Busca os produtos e filtra exclusivamente os que possuem a flag `promocao: true`.
  - Contém um **algoritmo de rankeamento (`rankPromocoes`)** que pontua cada promoção de acordo com os seguintes critérios:
    1. Percentual de desconto (peso maior para maiores descontos)
    2. Valor nominal economizado em reais (R$)
    3. Preço final do produto (dando preferência a produtos mais baratos para criar ofertas atrativas)
  - Exibe até 7 produtos em destaque no topo da página.
  - Também faz uso do hook `useFilters` para fornecer busca, filtros por categorias e ordenação na vitrine.

### 4. Página de Erro (`Error.jsx`)
* **Rota:** Acionada automaticamente em caso de rotas inválidas (404).
* **Função:** Página estilizada com temática geek ("Falhas críticas em testes de percepção dão nisso").
* **Funcionamento:** Permite ao usuário retornar à tela anterior por meio do botão "Voltar", utilizando a API `useNavigate` do React Router.

---

## 🧩 Componentes

### 1. `Header` (`Header.jsx`)
* **Função:** Cabeçalho de navegação presente em todas as telas da aplicação (com exceção da tela de erro 404 customizada).
* **Estrutura:**
  - Logotipo do Geek Falkon direcionando para a Home.
  - Botão de controle de filtros extras.
  - Barra de pesquisa global de produtos.
  - Ações rápidas de usuário (Carrinho e Perfil).
  > Atualmente a única função implementada é o redirecionamento para a Home pela logo do site.

### 2. `Card` (`Card.jsx`)
* **Função:** Card padrão para visualização de um produto.
* **Propriedades (`produto`):** Recebe o objeto do produto contendo nome, preço, categoria, estoque e nota.
* **Diferenciais:**
  - Calcula o preço original simulado se o produto estiver em promoção.
  - Define badges automáticos e dinâmicos:
    - `"Mais vendidos"` (se em promoção e estoque crítico $\le 5$).
    - `"Envio grátis"` (se em promoção ou se possuir nota excelente $\ge 4.8$).

### 3. `PromoCard` (`PromoCard.jsx`)
* **Função:** Card com design agressivo para chamar a atenção para ofertas e descontos.
* **Propriedades (`produto`):** Recebe os dados do produto promocional.
* **Diferenciais:**
  - Calcula o desconto de forma dinâmica baseado no estoque (estoque menor gera desconto maior: $\le 5$ unidades = 30%, $\le 10$ unidades = 20%, outros = 15%).
  - Mostra o selo vermelho de porcentagem (`-X%`).
  - Renderiza o preço antigo riscado em contraste com o novo preço promocional.
  - Exibe avisos dinâmicos baseados no estoque disponível (`"Últimas unidades!"`, `"Envio grátis"`, `"Oportunidade única"`).

### 4. `Searchbar` (`Searchbar.jsx`)
* **Função:** Atualmente é um componente esqueleto/placeholder que renderiza um fragmento vazio (`<> </>`). Preparado para futuras expansões e componentização da barra de pesquisa.

---

## 🪝 Hooks Customizados

### 1. `useFilters.js`
* **Função:** Centraliza toda a lógica de manipulação da lista de produtos (pesquisa por texto, filtragem por categorias e ordenação).
* **Parâmetros:** Recebe a lista original de `produtos`.
* **Estados Internos:**
  - `busca` (string): Termo digitado pelo usuário.
  - `categoriaAtiva` (string): Categoria selecionada para filtragem (padrão `'todas'`).
  - `ordenacao` (string): Direção da ordenação por preço (`'none'`, `'asc'` ou `'desc'`).
* **Valores Memorizados (`useMemo`):**
  - `categorias`: Extrai dinamicamente todas as categorias existentes na lista de produtos para montar os botões de filtro de forma dinâmica.
  - `produtosFiltrados`: Retorna a lista final após aplicar consecutivamente:
    1. **Busca textual**: Filtra pelo nome do produto e ordena os resultados por relevância (proximidade do termo de busca no início do nome).
    2. **Filtro de categoria**: Restringe a categoria ativa.
    3. **Ordenação por preço**: Ordena de forma crescente (`asc`) ou decrescente (`desc`).
* **Funções Auxiliares:**
  - `toggleOrdenacao()`: Alterna sequencialmente o tipo de ordenação (`none` ➔ `asc` ➔ `desc` ➔ `none`).
  - `getOrdenacaoLabel()`: Retorna o texto formatado para o botão de ordenação ("Menor preço", "Maior preço" ou "Ordenar").
