import { Bilhete } from "./Bilhete.js"
import { monetarioBr } from "./script.js"


export class Carrinho {
    constructor() {
        this.bilhetes = []
        this.bilhetesEl = []
    }
    getBilhetes = () => {
        return this.bilhetes
    }
    addBilhete = (objBilhete, poltronaElement) => {
       
        if (!this.bilhetes.some(bilhete => bilhete.poltrona === objBilhete.poltrona)) {
            this.bilhetes.push(objBilhete)
            this.bilhetesEl.push(new Bilhete(objBilhete, poltronaElement).cloneBilhete)
        }
        
        this.atualizarTotal()
    }
    removeBilhete = objBilhete => {
        this.bilhetes = this.bilhetes.filter(bilhete => bilhete != objBilhete)
        this.atualizarTotal()
        
    }
    atualizarTotal = () => {
        let divTotal = document.querySelector(".total-bilhetes")
        let total = this.bilhetes.reduce((accum, curr) => accum + curr.preco, 0)
        divTotal.innerHTML = monetarioBr(total)
        if(this.bilhetes.length > 0){
            document.querySelector(".footer-total").classList.remove("closed")
        }else{
            document.querySelector(".footer-total").classList.add("closed")
        }
    }
    limparCarrinho = () => {
        // document.querySelector(".box-bilhetes").innerHTML = ""
        this.bilhetesEl.forEach(element => element.remove());
        this.bilhetes = []
        this.atualizarTotal()
    }
}



