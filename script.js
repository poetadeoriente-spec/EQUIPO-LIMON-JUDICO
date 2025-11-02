const terminos = [
    { termino: "JUEZ", emoji: "👨‍⚖️" },
    { termino: "TRIBUNAL", emoji: "⚖️" },
    { termino: "LEY", emoji: "📜" },
    { termino: "JUSTICIA", emoji: "🏛️" },
    { termino: "CÁRCEL", emoji: "🔒" },
    { termino: "CONTRATO", emoji: "📝" },
    { termino: "ABOGADO", emoji: "👨‍⚖️" },
    { termino: "DEMANDA", emoji: "💰" },
    { termino: "TESTIGO", emoji: "🕵️" },
    { termino: "PRUEBA", emoji: "📄" },
    { termino: "PLAZO", emoji: "⏰" },
    { termino: "PROPIEDAD", emoji: "🏠" },
    { termino: "MATRIMONIO", emoji: "💍" },
    { termino: "PATRIA POTESTAD", emoji: "👶" },
    { termino: "SOCIEDAD", emoji: "🏢" },
    { termino: "HERENCIA", emoji: "💼" },
    { termino: "DELITO", emoji: "🚓" },
    { termino: "DERECHOS", emoji: "🛡️" },
    { termino: "DECLARACIÓN", emoji: "📋" },
    { termino: "LITIGIO", emoji: "⚔️" }
];

let cartas = [];
let cartasVolteadas = [];
let jugadorActual = 1;
let puntos = [0, 0];
let bloqueado = false;

function iniciarJuego() {
    cartas = [...terminos, ...terminos]
        .sort(() => Math.random() - 0.5)
        .map((termino, index) => ({
            ...termino,
            id: index,
            volteada: false,
            encontrada: false
        }));

    renderizarTablero();
    actualizarMarcador();
}

function renderizarTablero() {
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = '';

    cartas.forEach(carta => {
        const cartaElement = document.createElement('div');
        cartaElement.className = 'carta';
        cartaElement.innerHTML = carta.volteada || carta.encontrada ? 
            `<div>
                <div class="termino">${carta.emoji}<br>${carta.termino}</div>
                <div class="equipo-limon">Equipo Limón 🍋</div>
            </div>` : 
            '?';
        
        if (carta.volteada) cartaElement.classList.add('volteada');
        if (carta.encontrada) cartaElement.classList.add('encontrada');
        
        cartaElement.addEventListener('click', () => voltearCarta(carta));
        tablero.appendChild(cartaElement);
    });
}

function voltearCarta(carta) {
    if (bloqueado || carta.volteada || carta.encontrada || cartasVolteadas.length >= 2) return;

    carta.volteada = true;
    cartasVolteadas.push(carta);
    renderizarTablero();

    if (cartasVolteadas.length === 2) {
        bloquearJuego();
        verificarPar();
    }
}

function verificarPar() {
    const [carta1, carta2] = cartasVolteadas;
    
    if (carta1.termino === carta2.termino) {
        carta1.encontrada = true;
        carta2.encontrada = true;
        puntos[jugadorActual - 1]++;
        setTimeout(() => {
            cartasVolteadas = [];
            bloquearJuego(false);
            actualizarMarcador();
            verificarFinJuego();
        }, 1000);
    } else {
        setTimeout(() => {
            carta1.volteada = false;
            carta2.volteada = false;
            cartasVolteadas = [];
            jugadorActual = jugadorActual === 1 ? 2 : 1;
            bloquearJuego(false);
            actualizarMarcador();
        }, 1500);
    }
}

function bloquearJuego(bloquear = true) {
    bloqueado = bloquear;
}

function actualizarMarcador() {
    document.getElementById('player1').innerHTML = `JUGADOR 1: ⭐ <span>${puntos[0]}</span>`;
    document.getElementById('player2').innerHTML = `JUGADOR 2: ⭐ <span>${puntos[1]}</span>`;
    document.getElementById('turno').textContent = `TURNO: JUGADOR ${jugadorActual}`;
    
    document.getElementById('player1').classList.toggle('active', jugadorActual === 1);
    document.getElementById('player2').classList.toggle('active', jugadorActual === 2);
}

function verificarFinJuego() {
    if (cartas.every(carta => carta.encontrada)) {
        setTimeout(() => {
            const ganador = puntos[0] > puntos[1] ? 1 : puntos[1] > puntos[0] ? 2 : 0;
            if (ganador === 0) {
                alert('¡EMPATE! 🎉\n\nDesarrollado por Equipo Limón 🍋');
            } else {
                alert(`¡JUGADOR ${ganador} GANA! 🏆\n\nDesarrollado por Equipo Limón 🍋');
            }
        }, 500);
    }
}

function reiniciarJuego() {
    cartasVolteadas = [];
    jugadorActual = 1;
    puntos = [0, 0];
    iniciarJuego();
}

function mostrarMenu() {
    alert('🎴 MEMORAMA JURÍDICO\n\n20 pares de términos jurídicos\n2 jugadores por turnos\n\nDesarrollado por Equipo Limón 🍋');
}

document.addEventListener('DOMContentLoaded', iniciarJuego);
