// 1. Base de Dados Completa (6 Destinos)
const pacotesData = [
    { 
        id: 1, 
        destino: 'Bali: O Refúgio dos Deuses', 
        preco: 1500, 
        imagem: 'bali.png', 
        descricao: 'Sinta a serenidade dos templos ancestrais e o abraço da natureza tropical.', 
        detalhes: 'Uma jornada desenhada para quem procura paz. Descubra retiros escondidos entre arrozais e a hospitalidade calorosa do povo balinês.', 
        precoCategoria: 'alto' 
    },
    { 
        id: 2, 
        destino: 'Porto: Alma e Tradição', 
        preco: 450, 
        imagem: 'porto.png', 
        descricao: 'Caminhe pelas ruelas da Ribeira onde o rio Douro conta histórias antigas.', 
        detalhes: 'Um convite para saborear a vida. Inclui momentos de prova de vinhos em caves históricas e o conforto de um hotel boutique no coração da cidade.', 
        precoCategoria: 'baixo' 
    },
    { 
        id: 3, 
        destino: 'Paris: A Cidade das Luzes', 
        preco: 980, 
        imagem: 'paris.png', 
        descricao: 'Deixe-se encantar pela elegância das avenidas e pela arte que respira em cada esquina.', 
        detalhes: 'Onde o romance encontra a história. Viva a experiência parisiense através da sua gastronomia delicada e dos seus museus icónicos.', 
        precoCategoria: 'baixo' 
    },
    { 
        id: 5, 
        destino: 'Grécia: O Azul Infinito', 
        preco: 1250, 
        imagem: 'greece.png', 
        descricao: 'Onde o branco das casas encontra o azul mais puro do Mediterrâneo.', 
        detalhes: 'Perca-se nos labirintos de Santorini e Mykonos. Uma viagem focada no descanso, no sol e na gastronomia fresca das ilhas.', 
        precoCategoria: 'alto' 
    }
];

let debounceTimer;

// 2. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('pacote-list')) {
        renderizarPacotes(pacotesData);
    }
    setupFAQAccordion();
    setupMobileMenu();
    setupModal(); // Nova função
});

// 3. Renderização dos Cards (Grelha)
function renderizarPacotes(pacotes) {
    const container = document.getElementById('pacote-list');
    if (!container) return;

    container.innerHTML = ''; 

    if (pacotes.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhum pacote encontrado para esta busca.</p>';
        return;
    }

    pacotes.forEach(p => {
        const card = document.createElement('div');
        card.className = 'pacote-card';
        card.innerHTML = `
            <img src="${p.imagem}" alt="${p.destino}">
            <div class="pacote-info">
                <h3>${p.destino}</h3>
                <p>${p.descricao}</p>
                <p class="price">Desde €${p.preco}</p>
                <button class="cta-button" onclick="mostrarDetalhes(${p.id})">Ver Detalhes</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 4. Lógica da Modal (Pormenores)
function mostrarDetalhes(id) {
    const pacote = pacotesData.find(p => p.id === id);
    const modal = document.getElementById('modal-detalhes');
    const body = document.getElementById('modal-body');

    if (modal && body) {
        body.innerHTML = `
            <h2 style="color: var(--primary-color);">${pacote.destino}</h2>
            <div style="margin: 20px 0; text-align: left; line-height: 1.6;">
                <p><strong>Destaques do Pacote:</strong></p>
                <p>${pacote.detalhes}</p>
            </div>
            <p class="price" style="font-size: 1.8rem; color: #333;">Total: €${pacote.preco}</p>
            <a href="contacto.html" class="cta-button" style="display:inline-block; margin-top:20px;">Reservar Agora</a>
        `;
        modal.style.display = 'flex';
    }
}

function setupModal() {
    const modal = document.getElementById('modal-detalhes');
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };
}

// 5. Filtros e Pesquisa (Restaurado do original)
function filtrarPacotes() {
    const termo = document.getElementById('search-input')?.value.toLowerCase() || '';
    const categoria = document.getElementById('filter-price')?.value || 'todos';

    const filtrados = pacotesData.filter(p => {
        const matchNome = p.destino.toLowerCase().includes(termo);
        const matchPreco = categoria === 'todos' || p.precoCategoria === categoria;
        return matchNome && matchPreco;
    });

    renderizarPacotes(filtrados);
}

function handleSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => filtrarPacotes(), 300);
}

// 6. FAQ e Menu (Restaurado do original)
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            faqQuestions.forEach(q => {
                q.nextElementSibling.classList.add('hidden');
                q.setAttribute('aria-expanded', 'false');
            });
            if (!isExpanded) {
                answer.classList.remove('hidden');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
}
