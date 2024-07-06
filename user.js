export class User {
    constructor(id) {
        this.id = id;
        this.saldo = 0;
        this.baralho = [];
    }

    setSaldo(valor) {
        this.saldo = valor;
    }

    getSaldo() {
        return this.saldo;
    }
}
