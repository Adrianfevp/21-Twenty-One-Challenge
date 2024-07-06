export class Baralho {
    constructor() {
        this.cartas = [];
        this.naipes = ['Paus', 'Copas', 'Espadas', 'Ouros'];
        this.valores = [
            { nome: '1', valor: 11 },
            { nome: '2', valor: 2 },
            { nome: '3', valor: 3 },
            { nome: '4', valor: 4 },
            { nome: '5', valor: 5 },
            { nome: '6', valor: 6 },
            { nome: '7', valor: 7 },
            { nome: '8', valor: 10 },
            { nome: '9', valor: 10 },
            { nome: '10', valor: 10 }
        ];

        this.criarBaralho();
    }


    criarBaralho() {
        for (let naipe of this.naipes) {
            for (let valor of this.valores) {
                const imagem = `${naipe}_${valor.nome.toLowerCase()}.svg`; 
                this.cartas.push({ nome: valor.nome, naipe: { nome: naipe }, valor: valor.valor, imagem: imagem });
            }
        }
    }

    embaralhar() {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }

    distribuirCartas(qtd) {
        return this.cartas.splice(0, qtd);
    }
}
