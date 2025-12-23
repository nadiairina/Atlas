/**
 * ATLAS VIAGENS - Script Consolidado Premium (V2 - High Impact)
 */

// 1. Base de Dados de Pacotes
const pacotesData = [
    { 
        id: 1, 
        destino: 'Bali: O Refúgio dos Deuses', 
        preco: 1500, 
        imagem: 'bali.png', 
        descricao: 'Sinta a serenidade dos templos ancestrais e a natureza tropical.', 
        detalhes: `
            <h4>O Seu Itinerário Personalizado</h4>
            <ul class="itinerario-lista">
                <li><strong>Dia 1-2:</strong> Imersão em Ubud, com caminhadas pelos campos de arroz ao amanhecer e visitas a santuários locais.</li>
                <li><strong>Dia 3-4:</strong> Ritual de purificação espiritual nas águas sagradas de Tirta Empul com guia local.</li>
                <li><strong>Dia 5-7:</strong> Relaxamento nas praias de areia branca de Uluwatu e jantar ao pôr do sol sobre as falésias.</li>
            </ul>
            <p class="nota-especial"><strong>Incluímos:</strong> Vilas privadas com piscina, transporte exclusivo e curadoria de experiências autênticas.</p>`, 
        precoCategoria: 'alto' 
    },
    { 
        id: 2, 
        destino: 'Porto: Alma e Tradição', 
        preco: 450, 
        imagem: 'porto.png', 
        descricao: 'Caminhe pelas ruelas da Ribeira onde o Douro conta histórias.', 
        detalhes: `
            <h4>A Experiência na Invicta</h4>
            <ul class="itinerario-lista">
                <li><strong>Sábado:</strong> Passeio privado pelo centro histórico, visita guiada a pé e almoço tradicional numa taberna escondida.</li>
                <li><strong>Domingo:</strong> Travessia das seis pontes em barco privado e prova de vinhos raros numa cave familiar em Gaia.</li>
            </ul>
            <p class="nota-especial"><strong>Incluímos:</strong> Estadia em Hotel Boutique com vista para o rio e acompanhamento para reservas gastronómicas.</p>`, 
        precoCategoria: 'baixo' 
    },
    { 
        id: 3, 
        destino: 'Paris: A Cidade da Elegância', 
        preco: 980, 
        imagem: 'paris.png', 
        descricao: 'Romance e cultura em cada esquina da capital francesa.', 
        detalhes: `
            <h4>Momentos Parisienses</h4>
            <ul class="itinerario-lista">
                <li><strong>Dia 1-2:</strong> Passeio pelos jardins de Tuileries e visita exclusiva ao Louvre com foco nas obras-primas.</li>
                <li><strong>Dia 3-5:</strong> Exploração de Montmartre, o bairro dos artistas, e cruzeiro noturno pelo Sena sob as luzes da cidade.</li>
            </ul>
            <p class="nota-especial"><strong>Incluímos:</strong> Alojamento em hotel de charme no bairro de Le Marais e passes de acesso prioritário.</p>`, 
        precoCategoria: 'baixo' 
    },
    { 
        id: 4, 
        destino: 'Nova Iorque: O Ritmo da Metrópole', 
        preco: 1800, 
        imagem: 'ny.png', 
        descricao: 'Viva a energia contagiante da cidade que nunca dorme.', 
        detalhes: `
            <h4>A Experiência Americana</h4>
            <ul class="itinerario-lista">
                <li><strong>Dia 1-3:</strong> Caminhada pelo Central Park e subida ao topo do Summit One Vanderbilt para a melhor vista da ilha.</li>
                <li><strong>Dia 4-6:</strong> Noite na Broadway com espetáculo incluído e exploração da gastronomia multicultural de Brooklyn.</li>
            </ul>
            <p class="nota-especial"><strong>Incluímos:</strong> Hotel de luxo em Manhattan e planeamento de rotas a pé personalizadas.</p>`, 
        precoCategoria: 'alto' 
    },
    { 
        id: 5, 
        destino: 'Atenas & Ilhas Gregas', 
        preco: 1250, 
        imagem: 'greece.png', 
        descricao: 'Onde o branco das casas encontra o azul mais puro do mar.', 
        detalhes: `
            <h4>Odisseia pelo Mar Egeu</h4>
            <ul class="itinerario-lista">
                <li><strong>Dia 1-2:</strong> Descoberta da Acrópole de Atenas e jantar romântico no bairro histórico de Plaka.</li>
                <li><strong>Dia 3-8:</strong> Viagem de ferry para Santorini e Mykonos, com tempo livre para explorar vilas e praias escondidas.</li>
            </ul>
            <p class="nota-especial"><strong>Incluímos:</strong> Logística de ferries entre ilhas e hotéis com vista para a caldeira.</p>`, 
        precoCategoria: 'alto' 
    },
    { 
        id: 6, 
        destino: 'Tailândia: O Reino do Sorriso', 
        preco: 1700, 
        imagem: 'tai.png', 
        descricao: 'Templos dourados, mercados vibrantes e águas cristalinas.', 
        detalhes: `
            <h4>Tradição e Natureza</h4>
            <ul class="itinerario-lista">
                <li><strong>Dia 1-3:</strong> A azáfama de Banguecoque, templos budistas e aula de cozinha tradicional tailandesa.</li>
                <li><strong>Dia 4-8:</strong> Voo para as ilhas do sul para dias de relaxamento total, snorkel e passeios em barcos típicos.</li>
            </ul>
            <p class="nota-especial"><strong>Incluímos:</strong> Voos internos, alojamento sustentável e guia fluente em português.</p>`, 
        precoCategoria: 'alto' 
    }
];

// 2. Variáveis Globais
const imagensGaleria = ["france.png", "indo.png", "kyoto.png", "brasil.png", "pira.png", "aurora.png"];
let indiceAtual = 0;
let debounceTimer;

// 3. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('pacotes-grid')) {
        renderizarPacotes(pacotesData);
    }
    
    setupFAQAccordion();
    setupMobileMenu();
    setupModal();
    observarElementos(); 
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    document.addEventListener('keydown', (e) => { 
        if (e.key === "Escape") {
            fecharLightbox();
            fecharModal();
        }
    });
});

/* --- ANIMAÇÕES E UI --- */

const observarElementos = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay || 0);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    // Seleciona todos os elementos que devem "nascer" suavemente na página
    const targets = document.querySelectorAll('.pacote-card, .mosaico-item, .hero-content, .gallery-header, .faq-item, .section-title');
    
    targets.forEach((el, index) => {
        el.classList.add('reveal');
        // Cria um efeito de cascata (100ms entre cada elemento)
        el.dataset.delay = (index % 4) * 100; 
        observer.observe(el);
    });
};

const handleHeaderScroll = () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
};

/* --- RENDERIZAÇÃO E FILTROS --- */

function renderizarPacotes(pacotes) {
    const container = document.getElementById('pacotes-grid');
    if (!container) return;
    container.innerHTML = pacotes.length === 0 ? '<p class="text-center">Nenhum destino encontrado.</p>' : '';

    pacotes.forEach(p => {
        const card = document.createElement('div');
        card.className = 'pacote-card';
        card.innerHTML = `
            <img src="${p.imagem}" alt="${p.destino}">
            <div class="pacote-info">
                <h3>${p.destino}</h3>
                <p>${p.descricao}</p>
                <div class="pacote-footer">
                    <span class="preco">desde ${p.preco}€</span>
                    <button class="cta-button small" onclick="mostrarDetalhes(${p.id})">Ver Roteiro</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    // Re-observar novos elementos renderizados
    observarElementos();
}

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

/* --- MODAL (ROTEIROS) - BANNER GRANDE --- */

function mostrarDetalhes(id) {
    const pacote = pacotesData.find(p => p.id === id);
    const modal = document.getElementById('modal-detalhes');
    const body = document.getElementById('modal-body');

    if (modal && body) {
        body.innerHTML = `
            <div class="modal-header-image" style="background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('${pacote.imagem}'); height: 450px; background-size: cover; background-position: center; width: 100%;"></div>
            
            <div style="padding: 40px;">
                <h2 style="color: var(--primary-color); font-size: 2.2rem; margin-bottom: 20px;">${pacote.destino}</h2>
                <div class="itinerary-wrapper" style="font-size: 1.1rem;">
                    ${pacote.detalhes}
                </div>
                <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #f0f0f0; padding-top: 30px;">
                    <span style="font-size: 1.6rem; font-weight: bold; color: var(--dark-bg);">Total: ${pacote.preco}€</span>
                    <a href="contacto.html?destino=${encodeURIComponent(pacote.destino)}" class="cta-button">Reservar Experiência</a>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal() {
    const modal = document.getElementById('modal-detalhes');
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function setupModal() {
    const modal = document.getElementById('modal-detalhes');
    window.onclick = (e) => { 
        if (e.target == modal) fecharModal();
        if (e.target.id === 'lightbox') fecharLightbox();
    };
}

/* --- LIGHTBOX (GALERIA) --- */

function abrirLightbox(index) {
    indiceAtual = index;
    const lightbox = document.getElementById('lightbox');
    const imgGrande = document.getElementById('img-grande');
    if (!lightbox || !imgGrande) return;

    imgGrande.src = imagensGaleria[indiceAtual];
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fecharLightbox() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function mudarImagem(direcao) {
    indiceAtual = (indiceAtual + direcao + imagensGaleria.length) % imagensGaleria.length;
    document.getElementById('img-grande').src = imagensGaleria[indiceAtual];
}

/* --- ACORDEÃO E MENU --- */

function setupFAQAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.getAttribute('aria-expanded') === 'true';
            
            // Fecha outros abertos
            document.querySelectorAll('.faq-question').forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling?.classList.add('hidden');
            });

            if (!isOpen) {
                question.setAttribute('aria-expanded', 'true');
                answer?.classList.remove('hidden');
            }
        });
    });
}

function setupMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.classList.toggle('is-active');
        });
    }
}
