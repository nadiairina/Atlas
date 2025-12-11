// Simulação de base de dados/API de pacotes (Extra: Integração de Dados Dinâmicos)
const pacotesData = [
    { id: 1, destino: 'Bali', preco: 1500, imagem: 'bali.jpg', descricao: '7 dias de relaxamento e cultura.', precoCategoria: 'alto' },
    { id: 2, destino: 'Porto', preco: 450, imagem: 'porto.jpg', descricao: 'Escapada de fim de semana na Invicta.', precoCategoria: 'baixo' },
    { id: 3, destino: 'Paris', preco: 980, imagem: 'paris.jpg', descricao: 'Romance e história em 5 dias.', precoCategoria: 'baixo' },
    { id: 4, destino: 'Nova Iorque', preco: 1800, imagem: 'ny.jpg', descricao: 'A cidade que nunca dorme.', precoCategoria: 'alto' },
    // Adicionar mais dados
];

// NOVO: Constante para Limite de Preço
const LIMITE_PRECO_BAIXO = 1000;

document.addEventListener('DOMContentLoaded', () => {
    // Apenas tenta renderizar se o elemento existir (para evitar erros noutras páginas)
    if (document.getElementById('pacote-list')) {
        renderizarPacotes(pacotesData);
        // NOVO: Ligar eventos de filtro dinâmico
        setupFiltrosDinamicos();
    }
});

// NOVO: Função para ligar eventos
function setupFiltrosDinamicos() {
    const termoBusca = document.getElementById('destino-search');
    const filtroPreco = document.getElementById('filtro-preco');
    const botaoBusca = document.getElementById('botao-busca'); // Mantido, mas menos essencial

    if (termoBusca) {
        termoBusca.addEventListener('input', filtrarPacotes); // Filtra enquanto digita
    }
    if (filtroPreco) {
        filtroPreco.addEventListener('change', filtrarPacotes); // Filtra ao selecionar
    }
    // O botão 'Buscar' ainda chama a função, mas o filtro é dinâmico
    if (botaoBusca) {
        botaoBusca.addEventListener('click', filtrarPacotes);
    }
}


// Função para renderizar os cartões de pacote (Extra: UI/UX Cartões)
function renderizarPacotes(pacotes) {
    const container = document.getElementById('pacote-list');
    if (!container) return; 

    container.innerHTML = ''; // Limpa os resultados anteriores

    if (pacotes.length === 0) {
        container.innerHTML = '<p>Nenhum pacote encontrado com os critérios de busca.</p>';
        return;
    }

    pacotes.forEach(pacote => {
        const card = document.createElement('div');
        card.className = 'pacote-card';

        // O caminho da imagem seria real, aqui é apenas um placeholder.
        const imagePath = `imagens/${pacote.imagem}`;

        card.innerHTML = `
            <img src="${imagePath}" alt="Viagem para ${pacote.destino}">
            <div class="pacote-info">
                <h3>${pacote.destino}</h3>
                <p>${pacote.descricao}</p>
                <div class="price">€${pacote.preco}</div>
                <a href="#" class="cta-button">Ver Detalhes</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Função para filtrar os pacotes (Extra: Busca Avançada)
function filtrarPacotes() {
    // Opcional Chamar this.id === 'botao-busca' para o botão, mas 'input' e 'change' fazem o trabalho
    const termoBusca = document.getElementById('destino-search').value.toLowerCase();
    const filtroPreco = document.getElementById('filtro-preco').value;

    const pacotesFiltrados = pacotesData.filter(pacote => {
        // 1. Filtrar por Destino (Busca)
        const correspondeDestino = pacote.destino.toLowerCase().includes(termoBusca);

        // 2. Filtrar por Preço (USANDO A CONSTANTE)
        let correspondePreco = true;
        if (filtroPreco === 'baixo') {
            correspondePreco = pacote.preco < LIMITE_PRECO_BAIXO;
        } else if (filtroPreco === 'alto') {
            correspondePreco = pacote.preco >= LIMITE_PRECO_BAIXO;
        }

        return correspondeDestino && correspondePreco;
    });

    renderizarPacotes(pacotesFiltrados);
}
