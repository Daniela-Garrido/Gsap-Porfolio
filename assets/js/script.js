// Animaciones Letras
const text = new SplitType(`.hero-title`, { types: 'words, chars', });

text.chars.forEach(char => {
    let charsTl = gsap.timeline();
    gsap.from(char, {
        y: gsap.utils.random(-150, 150),
        x: gsap.utils.random(-150, 250),
        duration: 2,
        scale: gsap.utils.random(0.5, 2),
        rotate: gsap.utils.random(-180, 180),
        ease: "back.out",
    })
    charsTl.from(char, {
        color: `rgb(${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)})`,
        duration: 1.8,
    })

    char.addEventListener("mouseenter", charsHover);

    function charsHover() {
        gsap.timeline()
            .to(char, {
                y: gsap.utils.random(-70, 70),
                x: gsap.utils.random(-70, 70),
                rotate: gsap.utils.random(-70, 70),
                scale: gsap.utils.random(0.4, 1),
                duration: 0.8,
                color: `rgb(${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)})`,
                onStart: () => {
                    char.removeEventListener("mouseenter", charsHover);
                }
            })
            .to(char, {
                y: 0,
                x: 0,
                rotate: 0,
                scale: 1,
                color: "white",
                delay: 0.1,
                duration: 0.8,
                onComplete: () => {
                    setTimeout(() => {
                        char.addEventListener("mouseenter", charsHover);
                    }, 1000);
                }
            })
    }
})

// Animaciones de scroll
gsap.registerPlugin(ScrollTrigger);

gsap.from(`.titulo`, {
    opacity: 0,
    scale: 0,
    duration: 0.5,
    scrollTrigger: ".titulo",
})

gsap.from(`.about-titulo`, {
    opacity: 0,
    y: 20,
    delay: .8,
    scrollTrigger: ".about-titulo",
})

gsap.from(`.about-subtitulo span`, {
    y: 100,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: ".about-subtitulo span",
})

gsap.from(`.about-item`, {
    y: 100,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: ".about-item",
    delay: 0.3,
})

gsap.from(`.logo`, {
    x: -100,
    opacity: 0,
    duration: .5,
})

gsap.from(`.container`, {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    y: 50,
    scrollTrigger: ".container",
})

gsap.from(`.imgloco`, {
    y: 100,
    opacity: 0,
    duration: 1.5,
    delay: 1,
    scrollTrigger: ".imgloco",
})

gsap.from(`.prueba`, {
    y: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: ".prueba",
})





// Buscar cartas por el nombre 
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const searchInput = document.getElementById('card-search');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    // Ocultar resultados inicialmente
    searchResults.style.display = 'none';
    
    // Cargar datos del JSON
    fetch('arcanos.json')
        .then(response => response.json())
        .then(data => {
            const arcanos = data.arcanosMayores.arcanos;
            
            // Función de búsqueda
            function buscarCartas(termino) {
                searchResults.innerHTML = '';
                
                if (!termino) {
                    // Si no hay término, mostrar mensaje
                    searchResults.innerHTML = '<p class="no-results">Ingresa un término de búsqueda para ver las cartas.</p>';
                    searchResults.style.display = 'block';
                    return;
                }
                
                const resultados = arcanos.filter(carta => 
                    carta.nombre.toLowerCase().includes(termino.toLowerCase()) ||
                    carta.keywords.some(keyword => 
                        keyword.toLowerCase().includes(termino.toLowerCase())
                    )
                );
                
                if (resultados.length === 0) {
                    searchResults.innerHTML = '<p class="no-results">No se encontraron cartas que coincidan con tu búsqueda.</p>';
                    searchResults.style.display = 'block';
                } else {
                    resultados.forEach(carta => {
                        mostrarCarta(carta);
                    });
                    searchResults.style.display = 'block';
                }
            }
            
            // Mostrar una carta en los resultados
            function mostrarCarta(carta) {
                const cardElement = document.createElement('div');
                cardElement.className = 'card-result';
                cardElement.id = `card-${carta.numero}`;
                
                // Crear etiquetas para keywords
                const keywordsHTML = carta.keywords.map(keyword => 
                    `<span class="keyword-tag">${keyword}</span>`
                ).join('');
                
                // Crear elementos para símbolos
                const symbolsHTML = carta.simbolosClave.map(symbol => 
                    `<span class="symbol-item">${symbol}</span>`
                ).join('');
                
                cardElement.innerHTML = `
                    <div class="card-header">
                        <h3>${carta.numero}. ${carta.nombre}</h3>
                        <button class="close-card" data-card="${carta.numero}">×</button>
                    </div>
                    <img src="${carta.img}" alt="${carta.nombre}" class="card-image">
                    <p><strong>Significado:</strong> ${carta.significado}</p>
                    
                    <div class="keywords-container">
                        ${keywordsHTML}
                    </div>
                    
                    <div class="symbols-container">
                        <div class="symbols-title">Símbolos Clave:</div>
                        <div class="symbols-list">
                            ${symbolsHTML}
                        </div>
                    </div>
                `;
                
                searchResults.appendChild(cardElement);
                
                // Añadir evento para cerrar la tarjeta
                const closeButton = cardElement.querySelector('.close-card');
                closeButton.addEventListener('click', () => {
                    cardElement.style.display = 'none';
                });
            }
            
            // Event listeners
            searchButton.addEventListener('click', () => {
                buscarCartas(searchInput.value.trim());
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    buscarCartas(searchInput.value.trim());
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            searchResults.innerHTML = '<p class="error">Error al cargar los datos. Por favor, intenta más tarde.</p>';
            searchResults.style.display = 'block';
        });
});








// Tirada de cartas de tarot 
document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('draw-cards');
    const getAdviceButton = document.getElementById('get-advice');
    const closeReadingButton = document.getElementById('close-reading');
    const cardPlaceholders = [
        document.getElementById('card-1'),
        document.getElementById('card-2'),
        document.getElementById('card-3')
    ];
    const adviceCardPlaceholder = document.getElementById('advice-card');
    const adviceSection = document.getElementById('advice-section');
    const adviceButtonContainer = document.getElementById('advice-button-container');
    const tarotReadingSection = document.getElementById('tarot-reading');
    
    let arcanos = [];
    let drawnCards = [];
    let adviceCard = null;
    
    // Ocultar botón de consejo inicialmente
    adviceButtonContainer.style.display = 'none';
    adviceSection.style.display = 'none';
    
    // Cargar datos del JSON
    fetch('arcanos.json')
        .then(response => response.json())
        .then(data => {
            arcanos = data.arcanosMayores.arcanos;
            
            // Evento para realizar tirada
            drawButton.addEventListener('click', () => {
                realizarTirada();
            });
            
            // Evento para obtener consejo
            getAdviceButton.addEventListener('click', () => {
                obtenerConsejo();
            });
            
            // Evento para cerrar la lectura
            closeReadingButton.addEventListener('click', () => {
                cerrarLectura();
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            drawButton.disabled = true;
            drawButton.textContent = 'Error al cargar cartas';
        });
    
    // Función para realizar una tirada de 3 cartas
    function realizarTirada() {
        // Reiniciar estado
        drawnCards = [];
        adviceCard = null;
        adviceSection.style.display = 'none';
        adviceButtonContainer.style.display = 'none';
        
        // Ocultar consejo anterior
        adviceCardPlaceholder.innerHTML = '';
        adviceCardPlaceholder.classList.remove('revealed');
        
        // Limpiar cartas anteriores
        cardPlaceholders.forEach(placeholder => {
            placeholder.innerHTML = '';
            placeholder.classList.remove('revealed');
        });
        
        // Seleccionar 3 cartas aleatorias únicas
        const availableCards = [...arcanos];
        for (let i = 0; i < 3; i++) {
            if (availableCards.length === 0) break;
            
            const randomIndex = Math.floor(Math.random() * availableCards.length);
            const selectedCard = availableCards.splice(randomIndex, 1)[0];
            drawnCards.push(selectedCard);
            
            // Revelar carta con animación
            setTimeout(() => {
                revelarCarta(cardPlaceholders[i], selectedCard);
            }, i * 500);
        }
        
        // Mostrar botón de consejo después de revelar todas las cartas
        setTimeout(() => {
            adviceButtonContainer.style.display = 'block';
            adviceButtonContainer.classList.add('visible');
            getAdviceButton.disabled = false;
        }, 2000);
    }
    
    // Función para revelar una carta
    function revelarCarta(placeholder, card) {
        placeholder.classList.add('card-reveal');
        
        setTimeout(() => {
            placeholder.innerHTML = `
                <div class="card-content">
                    <h4>${card.numero}. ${card.nombre}</h4>
                    <img src="${card.img}" alt="${card.nombre}">
                    <div class="card-meaning">
                        <p><strong>Significado:</strong> ${card.significado}</p>
                    </div>
                    <div class="card-keywords-small">
                        ${card.keywords.map(kw => `<span class="keyword-tag-small">${kw}</span>`).join('')}
                    </div>
                </div>
            `;
            placeholder.classList.add('revealed');
            placeholder.classList.remove('card-reveal');
        }, 500);
    }
    
    // Función para obtener un consejo
    function obtenerConsejo() {
        if (adviceCard) return; // Ya se mostró el consejo
        
        // Seleccionar una carta aleatoria que no esté en las ya mostradas
        const availableCards = arcanos.filter(card => 
            !drawnCards.some(drawn => drawn.numero === card.numero)
        );
        
        if (availableCards.length === 0) {
            adviceCard = arcanos[Math.floor(Math.random() * arcanos.length)];
        } else {
            const randomIndex = Math.floor(Math.random() * availableCards.length);
            adviceCard = availableCards[randomIndex];
        }
        
        // Revelar carta de consejo
        adviceCardPlaceholder.classList.add('card-reveal');
        
        setTimeout(() => {
            adviceCardPlaceholder.innerHTML = `
                <div class="card-content">
                    <h4>${adviceCard.numero}. ${adviceCard.nombre}</h4>
                    <img src="${adviceCard.img}" alt="${adviceCard.nombre}">
                    <div class="card-meaning">
                        <p><strong>Consejo:</strong> ${adviceCard.significado}</p>
                    </div>
                    <div class="card-keywords-small">
                        ${adviceCard.keywords.map(kw => `<span class="keyword-tag-small">${kw}</span>`).join('')}
                    </div>
                </div>
            `;
            adviceCardPlaceholder.classList.add('revealed');
            adviceCardPlaceholder.classList.remove('card-reveal');
            
            // Mostrar sección de consejo
            adviceSection.style.display = 'block';
            adviceSection.classList.add('visible');
            
            // Deshabilitar botón para evitar múltiples consejos
            getAdviceButton.disabled = true;
        }, 500);
    }
    
    // Función para cerrar la lectura
    function cerrarLectura() {
        // Ocultar todas las secciones
        adviceButtonContainer.style.display = 'none';
        adviceSection.style.display = 'none';
        
        // Limpiar todas las cartas
        cardPlaceholders.forEach(placeholder => {
            placeholder.innerHTML = '';
            placeholder.classList.remove('revealed');
        });
        
        adviceCardPlaceholder.innerHTML = '';
        adviceCardPlaceholder.classList.remove('revealed');
        
        // Reiniciar estado
        drawnCards = [];
        adviceCard = null;
        
        // Opcional: Scroll hacia arriba para ver el botón de tirada
        tarotReadingSection.scrollIntoView({ behavior: 'smooth' });
    }
});