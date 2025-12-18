// 1. Base de Dados Completa (6 Destinos)
const pacotesData = [
    { id: 1, destino: 'Bali', preco: 1500, imagem: 'bali.png', descricao: '7 dias de relaxamento e cultura.', detalhes: 'Inclui resorts de luxo, visitas a templos e guia local.', precoCategoria: 'alto' },
    { id: 2, destino: 'Porto', preco: 450, imagem: 'porto.png', descricao: 'Escapada de fim de semana na Invicta.', detalhes: 'Cruzeiro no Douro, prova de vinhos e estadia em hotel boutique.', precoCategoria: 'baixo' },
    { id: 3, destino: 'Paris', preco: 980, imagem: 'paris.png', descricao: 'Romance e história em 5 dias.', detalhes: 'Entradas no Louvre, Torre Eiffel e passeio no rio Sena.', precoCategoria: 'baixo' },
    { id: 4, destino: 'Nova Iorque', preco: 1800, imagem: 'ny.png', descricao: 'A cidade que nunca dorme.', detalhes: 'Alojamento em Times Square e passe para os principais museus.', precoCategoria: 'alto' },
    { id: 5, destino: 'Atenas & Ilhas Gregas', preco: 1250, imagem: 'greece.png', descricao: '8 dias de história e praias paradisíacas.', detalhes: 'Visita à Acrópole e ferry para Mykonos e Santorini.', precoCategoria: 'alto' },
    { id: 6, destino: 'Aventuras na Tailândia', preco: 1799, imagem: 'tai.png', descricao: '15 dias de cultura e selvas.', detalhes: 'Tour por Bangkok, templos de Chiang Mai e praias de Phuket.', precoCategoria: 'alto' }
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
