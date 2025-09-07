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
    duration: .8,
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
    x: -150,
    opacity: 0,
    duration: 1,
    scale:2,

})

gsap.from(`.about-inicio`, {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    y: 50,
    scrollTrigger: ".about-inicio",
})

gsap.from(`.tetragramaton`, {
    y: 100,
    opacity: 0,
    duration: 1.5,
    delay: 1,
    rotate: 180,
    scrollTrigger: ".tetragramaton",
})








// Cargar y mostrar los símbolos alquímicos
   document.addEventListener('DOMContentLoaded', function() {
            const symbolsContainer = document.getElementById('symbols-container');
            const searchInput = document.getElementById('symbol-search');
            const searchButton = document.getElementById('search-symbol-button');
            const suggestionsContainer = document.getElementById('search-suggestions');
            const closeResultsButton = document.getElementById('close-results');
            const initialMessage = document.getElementById('initial-message');
            const symbolDetailView = document.getElementById('symbol-detail');
            const closeDetailButton = document.getElementById('close-detail');
            const detailContent = document.getElementById('detail-content');
            
            let symbolsData = [];

            // Cargar el JSON
            fetch('simbolos.json')
                .then(response => response.json())
                .then(data => {
                    symbolsData = data.simbolos_alquimicos;
                })
                .catch(error => {
                    console.error('Error cargando el archivo JSON:', error);
                    initialMessage.innerHTML = '<p>Error al cargar los símbolos. Asegúrate de que el archivo simbolos.json esté disponible.</p>';
                });
            
            // Función para mostrar los símbolos en la cuadrícula
            function displaySymbols(symbols) {
                symbolsContainer.innerHTML = '';
                
                if (symbols.length === 0) {
                    symbolsContainer.innerHTML = '<p class="no-results">No se encontraron símbolos que coincidan con tu búsqueda.</p>';
                    return;
                }
                
                symbols.forEach(symbol => {
                    const symbolCard = document.createElement('div');
                    symbolCard.className = 'symbol-card';
                    symbolCard.addEventListener('click', () => showSymbolDetail(symbol));
                    
                    symbolCard.innerHTML = `
                        <div class="symbol-header">
                            <div class="symbol-icon">${symbol.simbolo}</div>
                            <div>
                                <h3 class="symbol-name">${symbol.nombre}</h3>
                                <span class="symbol-element">${symbol.elemento}</span>
                            </div>
                        </div>
                        
                        <p class="symbol-meaning">${symbol.significado}</p>
                        
                        <ul class="symbol-properties">
                            ${symbol.propiedades.map(prop => `<li>${prop}</li>`).join('')}
                        </ul>
                        
                        <div class="symbol-footer">
                            <div class="symbol-color">
                                <div class="color-dot" style="background-color: ${symbol.color}"></div>
                                <span>${symbol.color}</span>
                            </div>
                            <div class="symbol-planet">${symbol.planeta}</div>
                        </div>
                    `;
                    
                    symbolsContainer.appendChild(symbolCard);
                });
                
                // Mostrar la cuadrícula y el botón de cerrar
                symbolsContainer.style.display = 'grid';
                closeResultsButton.style.display = 'block';
                initialMessage.style.display = 'none';
            }
            
            // Función para mostrar el detalle de un símbolo
            function showSymbolDetail(symbol) {
                detailContent.innerHTML = `
                    <div class="detail-header">
                        <div class="detail-icon">${symbol.simbolo}</div>
                        <h2 class="detail-name">${symbol.nombre}</h2>
                        <span class="detail-element">${symbol.elemento}</span>
                    </div>
                    
                    <div class="detail-content">
                        <div>
                            <h3>Significado</h3>
                            <p class="detail-meaning">${symbol.significado}</p>
                            
                            <div class="detail-properties">
                                <h4>Propiedades</h4>
                                <ul>
                                    ${symbol.propiedades.map(prop => `<li>${prop}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="detail-info">
                            <h4>Información Adicional</h4>
                            <div class="detail-info-item">
                                <span>Color:</span>
                                <span>${symbol.color}</span>
                            </div>
                            <div class="detail-info-item">
                                <span>Planeta:</span>
                                <span>${symbol.planeta}</span>
                            </div>
                            <div class="detail-info-item">
                                <span>Elemento:</span>
                                <span>${symbol.elemento}</span>
                            </div>
                        </div>
                    </div>
                `;
                
                symbolDetailView.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
            
            // Función para buscar símbolos
            function searchSymbols(query) {
                if (!query.trim()) {
                    symbolsContainer.style.display = 'none';
                    closeResultsButton.style.display = 'none';
                    initialMessage.style.display = 'block';
                    return;
                }
                
                const searchString = query.toLowerCase();
                const filteredSymbols = symbolsData.filter(symbol => {
                    return (
                        symbol.nombre.toLowerCase().includes(searchString) ||
                        symbol.elemento.toLowerCase().includes(searchString) ||
                        symbol.planeta.toLowerCase().includes(searchString) ||
                        symbol.propiedades.some(prop => prop.toLowerCase().includes(searchString))
                    );
                });
                
                displaySymbols(filteredSymbols);
            }
            
            // Función para mostrar sugerencias
            function showSuggestions(query) {
                if (!query.trim()) {
                    suggestionsContainer.style.display = 'none';
                    return;
                }
                
                const searchString = query.toLowerCase();
                const matchingSymbols = symbolsData.filter(symbol => 
                    symbol.nombre.toLowerCase().includes(searchString)
                );
                
                if (matchingSymbols.length > 0) {
                    suggestionsContainer.innerHTML = matchingSymbols
                        .map(symbol => 
                            `<div class="suggestion-item" data-name="${symbol.nombre}">${symbol.nombre}</div>`
                        )
                        .join('');
                    suggestionsContainer.style.display = 'block';
                } else {
                    suggestionsContainer.style.display = 'none';
                }
            }
            
            // Event listeners
            searchInput.addEventListener('input', function() {
                showSuggestions(this.value);
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchSymbols(this.value);
                    suggestionsContainer.style.display = 'none';
                }
            });
            
            searchButton.addEventListener('click', function() {
                searchSymbols(searchInput.value);
                suggestionsContainer.style.display = 'none';
            });
            
            suggestionsContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('suggestion-item')) {
                    const symbolName = e.target.getAttribute('data-name');
                    searchInput.value = symbolName;
                    searchSymbols(symbolName);
                    suggestionsContainer.style.display = 'none';
                }
            });
            
            closeResultsButton.addEventListener('click', function() {
                symbolsContainer.style.display = 'none';
                closeResultsButton.style.display = 'none';
                initialMessage.style.display = 'block';
                searchInput.value = '';
            });
            
            closeDetailButton.addEventListener('click', function() {
                symbolDetailView.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Cerrar sugerencias al hacer clic fuera
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && 
                    !suggestionsContainer.contains(e.target) &&
                    !searchButton.contains(e.target)) {
                    suggestionsContainer.style.display = 'none';
                }
            });
        });









document.addEventListener('DOMContentLoaded', function() {
    // Calculadora de numerología
    const calculateButton = document.getElementById('calculate-number');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateLifePathNumber);
    }
    
    function calculateLifePathNumber() {
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        
        if (!day || !month || !year) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Calcular número de camino de vida
        let lifePath = reduceNumber(parseInt(day)) + reduceNumber(parseInt(month)) + reduceNumber(parseInt(year));
        lifePath = reduceNumber(lifePath);
        
        // Mostrar resultado
        const resultElement = document.getElementById('number-result');
        resultElement.innerHTML = `
            <div class="number-result-card">
                <div class="result-number">${lifePath}</div>
                <h3>Tu número de camino de vida</h3>
                <p>Este número revela tu propósito esencial y las lecciones que viniste a aprender en esta vida.</p>
            </div>
        `;
    }
    
    function reduceNumber(num) {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            let sum = 0;
            while (num > 0) {
                sum += num % 10;
                num = Math.floor(num / 10);
            }
            num = sum;
        }
        return num;
    }
    
    // Interactividad para la rueda celta
    const sabbaths = document.querySelectorAll('.sabbath');
    const sabbathInfo = document.querySelector('.sabbath-info');
    
    const sabbathData = {
        samhain: {
            title: "Samhain",
            date: "31 de Octubre - 1 de Noviembre",
            description: "El Año Nuevo Celta, cuando el velo entre mundos es más delgado. Momento para honrar a los ancestros, soltar lo que ha muerto y recibir sabiduría del otro lado.",
            ritual: "Crea un altar para tus ancestros, escribe cartas de despedida a lo que debe irse y practica adivinación para el año venidero."
        },
        yule: {
            title: "Yule",
            date: "21-22 de Diciembre",
            description: "Solsticio de Invierno, la noche más larga del año. Celebra el renacimiento del sol y la promesa de días más luminosos.",
            ritual: "Decora un árbol con símbolos de tus deseos para el año nuevo, enciende velas para atraer la luz y comparte alimentos con seres queridos."
        },
        // Agregar datos para los otros sabbats...
    };
    
    sabbaths.forEach(sabbath => {
        Sabbath.addEventListener('click', function() {
            const sabbathName = this.classList[1];
            const data = sabbathData[sabbathName];
            
            if (data) {
                sabbathInfo.innerHTML = `
                    <h3>${data.title}</h3>
                    <p class="sabbath-date">${data.date}</p>
                    <p class="sabbath-description">${data.description}</p>
                    <div class="sabbath-ritual">
                        <h4>Ritual sugerido:</h4>
                        <p>${data.ritual}</p>
                    </div>
                `;
                
                // Quitar clase active de todos
                sabbaths.forEach(s => s.classList.remove('active'));
                // Agregar clase active al seleccionado
                this.classList.add('active');
            }
        });
    });
});















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