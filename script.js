// Simulação de base de dados/API de pacotes (Extra: Integração de Dados Dinâmicos)
const pacotesData = [
    { id: 1, destino: 'Bali', preco: 1500, imagem: 'bali.jpg', descricao: '7 dias de relaxamento e cultura.', precoCategoria: 'alto' },
    { id: 2, destino: 'Porto', preco: 450, imagem: 'porto.jpg', descricao: 'Escapada de fim de semana na Invicta.', precoCategoria: 'baixo' },
    { id: 3, destino: 'Paris', preco: 980, imagem: 'paris.jpg', descricao: 'Romance e história em 5 dias.', precoCategoria: 'baixo' },
    { id: 4, destino: 'Nova Iorque', preco: 1800, imagem: 'ny.jpg', descricao: 'A cidade que nunca dorme.', precoCategoria: 'alto' },
    // Adicionar mais dados
];

let debounceTimer;

document.addEventListener('DOMContentLoaded', () => {
    // Apenas tenta renderizar se o elemento existir (para evitar erros noutras páginas)
    if (document.getElementById('pacote-list')) {
        renderizarPacotes(pacotesData);
    }
    
    // NOVO: Adiciona a funcionalidade de FAQ/Acordeão
    setupFAQAccordion();
    
    // NOVO: Adiciona funcionalidade de menu mobile (assumindo que o menu é 'nav' e o toggle é '#menu-toggle')
    setupMobileMenu(); 
});

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
        const imagePath = `https://via.placeholder.com/300x200/4A3B95/FFFFFF?text=${pacote.destino}`;

        card.innerHTML = `
            <img src="${imagePath}" alt="Viagem para ${pacote.destino}" loading="lazy">
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
    const termoBuscaInput = document.getElementById('destino-search');
    const filtroPrecoInput = document.getElementById('filtro-preco');

    if (!termoBuscaInput || !filtroPrecoInput) return;
    
    const termoBusca = termoBuscaInput.value.toLowerCase();
    const filtroPreco = filtroPrecoInput.value;

    const pacotesFiltrados = pacotesData.filter(pacote => {
        // 1. Filtrar por Destino (Busca)
        const correspondeDestino = pacote.destino.toLowerCase().includes(termoBusca);

        // 2. Filtrar por Preço
        let correspondePreco = true;
        if (filtroPreco === 'baixo') {
            correspondePreco = pacote.preco < 1000;
        } else if (filtroPreco === 'alto') {
            correspondePreco = pacote.preco >= 1000;
        }
        
        return correspondeDestino && correspondePreco;
    });

    renderizarPacotes(pacotesFiltrados);
}

// NOVO: Função com Debounce para o input da pesquisa (Melhoria de UX)
function filtrarPacotesDebounced() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        filtrarPacotes();
    }, 300); // 300ms de atraso
}


// NOVO: Configura Acordeão/FAQ
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Fecha a resposta se estiver aberta
            if (isExpanded) {
                answer.classList.add('hidden');
                question.setAttribute('aria-expanded', 'false');
            } else {
                // Opcional: Fechar todos os outros
                faqQuestions.forEach(q => {
                    q.nextElementSibling.classList.add('hidden');
                    q.setAttribute('aria-expanded', 'false');
                });
                
                // Abre a resposta atual
                answer.classList.remove('hidden');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// NOVO: Configura Menu Mobile
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            nav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
}
