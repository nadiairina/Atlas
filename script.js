// 1. Simulação de base de dados (Nomes dos ficheiros corrigidos para .png)
const pacotesData = [
    { id: 1, destino: 'Bali', preco: 1500, imagem: 'bali.png', descricao: '7 dias de relaxamento e cultura.', precoCategoria: 'alto' },
    { id: 2, destino: 'Porto', preco: 450, imagem: 'porto.png', descricao: 'Escapada de fim de semana na Invicta.', precoCategoria: 'baixo' },
    { id: 3, destino: 'Paris', preco: 980, imagem: 'paris.png', descricao: 'Romance e história em 5 dias.', precoCategoria: 'baixo' },
    { id: 4, destino: 'Nova Iorque', preco: 1800, imagem: 'ny.png', descricao: 'A cidade que nunca dorme.', precoCategoria: 'alto' }
];

let debounceTimer;

// 2. Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza os pacotes se estivermos na página de serviços
    if (document.getElementById('pacote-list')) {
        renderizarPacotes(pacotesData);
    }
    
    // Ativa funcionalidades extras
    setupFAQAccordion();
    setupMobileMenu(); 
});

// 3. Função para desenhar os cartões no HTML
function renderizarPacotes(pacotes) {
    const container = document.getElementById('pacote-list');
    if (!container) return; 

    container.innerHTML = ''; // Limpa o que lá estiver

    if (pacotes.length === 0) {
        container.innerHTML = '<p>Nenhum pacote encontrado com os critérios de busca.</p>';
        return;
    }

    pacotes.forEach(pacote => {
        const card = document.createElement('div');
        card.className = 'pacote-card';

        // --- DEFINIÇÃO DA IMAGEM ---
        // Se as tuas imagens estiverem dentro de uma pasta, muda para: `imagens/${pacote.imagem}`
        const imagePath = `${pacote.imagem}`; 

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

// 4. Lógica de Filtro e Pesquisa
function filtrarPacotes() {
    const termoBuscaInput = document.getElementById('destino-search');
    const filtroPrecoInput = document.getElementById('filtro-preco');

    if (!termoBuscaInput || !filtroPrecoInput) return;
    
    const termoBusca = termoBuscaInput.value.toLowerCase();
    const filtroPreco = filtroPrecoInput.value;

    const pacotesFiltrados = pacotesData.filter(pacote => {
        // Filtro por nome do destino
        const correspondeDestino = pacote.destino.toLowerCase().includes(termoBusca);

        // Filtro por categoria de preço
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

// 5. UX: Pequeno atraso na pesquisa para não sobrecarregar o browser
function filtrarPacotesDebounced() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        filtrarPacotes();
    }, 300);
}

// 6. Funcionalidade do Acordeão (Página Sobre)
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                answer.classList.add('hidden');
                question.setAttribute('aria-expanded', 'false');
            } else {
                // Fecha outros que estejam abertos
                faqQuestions.forEach(q => {
                    q.nextElementSibling.classList.add('hidden');
                    q.setAttribute('aria-expanded', 'false');
                });
                
                answer.classList.remove('hidden');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// 7. Menu Mobile (Hambúrguer)
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
