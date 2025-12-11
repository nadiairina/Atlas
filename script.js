// Simulação de base de dados/API de pacotes (Extra: Integração de Dados Dinâmicos)
const pacotesData = [
    // NOVOS DADOS COM DURAÇÃO E TIPO
    { id: 1, destino: 'Bali', preco: 1500, imagem: 'bali.jpg', descricao: '7 dias de relaxamento e cultura.', precoCategoria: 'alto', duracao: 'media', tipo: 'relaxamento' },
    { id: 2, destino: 'Porto', preco: 450, imagem: 'porto.jpg', descricao: 'Escapada de fim de semana na Invicta.', precoCategoria: 'baixo', duracao: 'curta', tipo: 'cultura' },
    { id: 3, destino: 'Paris', preco: 980, imagem: 'paris.jpg', descricao: 'Romance e história em 5 dias.', precoCategoria: 'baixo', duracao: 'media', tipo: 'cultura' },
    { id: 4, destino: 'Nova Iorque', preco: 1800, imagem: 'ny.jpg', descricao: 'A cidade que nunca dorme.', precoCategoria: 'alto', duracao: 'media', tipo: 'cultura' },
    { id: 5, destino: 'Peru', preco: 2100, imagem: 'peru.jpg', descricao: 'Trilhos e história em Machu Picchu.', precoCategoria: 'alto', duracao: 'longa', tipo: 'aventura' },
    { id: 6, destino: 'Madeira', preco: 600, imagem: 'madeira.jpg', descricao: 'Levadas e natureza exuberante.', precoCategoria: 'baixo', duracao: 'media', tipo: 'aventura' },
    // Adicionar mais dados
];

// Constante para Limite de Preço
const LIMITE_PRECO_BAIXO = 1000;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('pacote-list')) {
        renderizarPacotes(pacotesData);
        setupFiltrosDinamicos();
    }
});

// Função para ligar eventos
function setupFiltrosDinamicos() {
    const termoBusca = document.getElementById('destino-search');
    const filtroPreco = document.getElementById('filtro-preco');
    const filtroDuracao = document.getElementById('filtro-duracao'); // NOVO
    const filtroTipo = document.getElementById('filtro-tipo'); // NOVO
    const botaoBusca = document.getElementById('botao-busca'); 

    if (termoBusca) { termoBusca.addEventListener('input', filtrarPacotes); } 
    if (filtroPreco) { filtroPreco.addEventListener('change', filtrarPacotes); }
    if (filtroDuracao) { filtroDuracao.addEventListener('change', filtrarPacotes); } // NOVO
    if (filtroTipo) { filtroTipo.addEventListener('change', filtrarPacotes); } // NOVO
    if (botaoBusca) { botaoBusca.addEventListener('click', filtrarPacotes); }
}


// Função para renderizar os cartões de pacote (mantida)
function renderizarPacotes(pacotes) {
    const container = document.getElementById('pacote-list');
    if (!container) return; 

    container.innerHTML = ''; 

    if (pacotes.length === 0) {
        container.innerHTML = '<p>Nenhum pacote encontrado com os critérios de busca.</p>';
        return;
    }

    pacotes.forEach(pacote => {
        const card = document.createElement('div');
        card.className = 'pacote-card';

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

// Função para filtrar os pacotes (Busca Avançada Expandida)
function filtrarPacotes() {
    const termoBusca = document.getElementById('destino-search').value.toLowerCase();
    const filtroPreco = document.getElementById('filtro-preco').value;
    const filtroDuracao = document.getElementById('filtro-duracao').value; // NOVO
    const filtroTipo = document.getElementById('filtro-tipo').value; // NOVO

    const pacotesFiltrados = pacotesData.filter(pacote => {
        // 1. Filtrar por Destino (Busca)
        const correspondeDestino = pacote.destino.toLowerCase().includes(termoBusca);

        // 2. Filtrar por Preço
        let correspondePreco = true;
        if (filtroPreco === 'baixo') {
            correspondePreco = pacote.preco < LIMITE_PRECO_BAIXO;
        } else if (filtroPreco === 'alto') {
            correspondePreco = pacote.preco >= LIMITE_PRECO_BAIXO;
        }
        
        // 3. Filtrar por Duração (NOVO)
        let correspondeDuracao = true;
        if (filtroDuracao !== 'todos') {
            correspondeDuracao = pacote.duracao === filtroDuracao;
        }
        
        // 4. Filtrar por Tipo de Viagem (NOVO)
        let correspondeTipo = true;
        if (filtroTipo !== 'todos') {
            correspondeTipo = pacote.tipo === filtroTipo;
        }

        return correspondeDestino && correspondePreco && correspondeDuracao && correspondeTipo;
    });

    renderizarPacotes(pacotesFiltrados);
}
