import { Baralho } from "./baralho.js";
import { User } from "./user.js";

let User1 = new User(1);
let User2 = new User(2);
const users = [User1, User2];
let currentPlayerIndex = 0;

const DivJogo = document.getElementById('jogo');
const btnComprarJogador1 = document.getElementById('comprarJogador1');
const btnComprarJogador2 = document.getElementById('comprarJogador2');
const btnTerminarJogadaJogador1 = document.getElementById('terminarJogadaJogador1');
const btnTerminarJogadaJogador2 = document.getElementById('terminarJogadaJogador2');
const btnFinalizarRodada = document.getElementById('finalizarRodada');

let BaralhoRounda = new Baralho();
BaralhoRounda.embaralhar();

function calcularPontos(user) {
    let pontos = 0;
    let ases = 0;

    user.baralho.forEach(carta => {
        pontos += carta.valor;
        if (carta.valor === 11) {
            ases += 1;
        }
    });

    return pontos;
}

function adicionarCartaAoJogador(index) {
    const carta = BaralhoRounda.distribuirCartas(1)[0];
    users[index].baralho.push(carta);

    const pontos = calcularPontos(users[index]);
    atualizarInterfaceGrafica();
    return true;
}

function finalizarJogada(index) {
    if (index === 0) {
        btnComprarJogador1.disabled = true;
        btnTerminarJogadaJogador1.disabled = true;
        currentPlayerIndex = 1;
        btnComprarJogador2.disabled = false;
        btnTerminarJogadaJogador2.disabled = false;
    } else if (index === 1) {
        btnComprarJogador2.disabled = true;
        btnTerminarJogadaJogador2.disabled = true;
        btnFinalizarRodada.disabled = false;
    }
}
function finalizarRodada() {
    const pontosJogador1 = calcularPontos(users[0]);
    const pontosJogador2 = calcularPontos(users[1]);

    let resultado = '';
    if (pontosJogador1 > 21 && pontosJogador2 > 21) {
        resultado = 'Ambos jogadores estouraram 21 pontos. Empate!';
    } else if (pontosJogador1 > 21) {
        resultado = `Jogador ${users[1].id} venceu! Jogador ${users[0].id} estourou 21 pontos.`;
    } else if (pontosJogador2 > 21) {
        resultado = `Jogador ${users[0].id} venceu! Jogador ${users[1].id} estourou 21 pontos.`;
    } else {
        if (pontosJogador1 > pontosJogador2) {
            resultado = `Jogador ${users[0].id} venceu com ${pontosJogador1} pontos contra ${pontosJogador2} pontos de Jogador ${users[1].id}.`;
        } else if (pontosJogador2 > pontosJogador1) {
            resultado = `Jogador ${users[1].id} venceu com ${pontosJogador2} pontos contra ${pontosJogador1} pontos de Jogador ${users[0].id}.`;
        } else {
            resultado = `Empate! Ambos jogadores têm ${pontosJogador1} pontos.`;
        }
    }

    // Exibir o resultado na div resultadoFinal
    const resultadoDiv = document.getElementById('resultadoFinal');
    resultadoDiv.innerHTML = `<p>${resultado}</p>`;

    // Reiniciar para uma nova rodada
    users.forEach(user => {
        user.baralho = [];
    });

    btnComprarJogador1.disabled = false;
    btnTerminarJogadaJogador1.disabled = false;
    btnComprarJogador2.disabled = true;
    btnTerminarJogadaJogador2.disabled = true;
    btnFinalizarRodada.disabled = true;

    currentPlayerIndex = 0;
    atualizarInterfaceGrafica();
}


function atualizarInterfaceGrafica() {
    DivJogo.innerHTML = '';

    users.forEach((user, index) => {
        const playerColumn = document.createElement('div');
        playerColumn.className = 'player-column';

        const playerDiv = document.createElement('div');
        playerDiv.innerHTML = `<h2>Jogador ${user.id}</h2>`;

        const cartasDiv = document.createElement('div');
        cartasDiv.className = 'cartas';
        user.baralho.forEach(carta => {
            const cartaDiv = document.createElement('div');
            cartaDiv.className = 'carta';
            const img = document.createElement('img');
            img.src = carta.imagem;
            img.alt = `${carta.nome} de ${carta.naipe.nome}`;
            cartaDiv.appendChild(img);
            img.style.width="85px";
            cartasDiv.appendChild(cartaDiv);
        });

        playerDiv.appendChild(cartasDiv);
        playerDiv.appendChild(document.createElement('hr'));

        const pontosDiv = document.createElement('div');
        pontosDiv.innerHTML = `<strong>Pontos: </strong>${calcularPontos(user)}`;
        playerDiv.appendChild(pontosDiv);

        playerColumn.appendChild(playerDiv);
        DivJogo.appendChild(playerColumn);
    });
}

// Event Listeners para os botões
btnComprarJogador1.addEventListener('click', () => {
    if (adicionarCartaAoJogador(0)) {
        // Nenhuma ação adicional necessária
    }
});

btnComprarJogador2.addEventListener('click', () => {
    if (adicionarCartaAoJogador(1)) {
        // Nenhuma ação adicional necessária
    }
});

btnTerminarJogadaJogador1.addEventListener('click', () => {
    finalizarJogada(0);
});

btnTerminarJogadaJogador2.addEventListener('click', () => {
    finalizarJogada(1);
});

btnFinalizarRodada.addEventListener('click',finalizarRodada);

// Iniciar a interface gráfica inicial
atualizarInterfaceGrafica();