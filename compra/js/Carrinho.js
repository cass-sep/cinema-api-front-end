import { Bilhete } from "./Bilhete.js"
import { monetarioBr } from "./util/Util.js"

export class Carrinho {
    constructor() {
        this.bilhetes = new Array()
    }

    getBilhetes = () => {
        return this.bilhetes
    }

    addBilhete = (objBilhete, poltronaElement) => {
        // console.log(this.bilhetes)
        if (!this.bilhetes.some(bilhete => bilhete.bilheteObj.poltrona === objBilhete.poltrona)) {
            this.bilhetes.push(new Bilhete(objBilhete, poltronaElement))
        }
        this.atualizarTotal()
    }

    removeBilhete = bilhete => {
        bilhete.cloneBilhete.remove()
        bilhete.poltronaElement.classList.remove("selecionada")
        this.bilhetes = this.bilhetes.filter(b => b !== bilhete)
        this.atualizarTotal()
    }

    destacarUmBilhete = bilhete => {
        this.getBilhetes().forEach(b => {
            if (b === bilhete) {
                b.cloneBilhete.classList.add("indisponivel")
            }
        })
    }

    atualizarTotal = () => {
        let divTotal = document.querySelector(".total-bilhetes")
        let total = this.bilhetes.reduce((accum, curr) => accum + curr.bilheteObj.preco, 0)
        divTotal.innerHTML = monetarioBr(total)
        if (this.bilhetes.length > 0) {
            document.querySelector(".footer-total").classList.remove("closed")
        } else {
            document.querySelector(".footer-total").classList.add("closed")
        }
    }

    limparCarrinho = () => {
        // document.querySelector(".box-bilhetes").innerHTML = ""
        this.bilhetes.forEach(element => element.cloneBilhete.remove())
        this.bilhetes = new Array()
        this.atualizarTotal()
    }
}