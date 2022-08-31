const templateBilhete = document.querySelector("#bilhete-template");

import { carrinho, monetarioBr } from "./script.js"

export class Bilhete {

    constructor(bilheteObj, poltronaElement) {
        this.bilheteObj = bilheteObj
        this.poltronaElement = poltronaElement;
        this.precoSessao = bilheteObj.preco
        this.cloneBilhete = templateBilhete.content.cloneNode(true).children[0]
        this.bilhetePreco = this.cloneBilhete.querySelector(".total_bilhete span")
        this.btnDeletar = this.cloneBilhete.querySelector(".deletar")
        this.bilhetePoltrona = this.cloneBilhete.querySelector(".poltrona span")
        this.bilheteMeia = this.cloneBilhete.querySelector(".meia input[type='checkbox']")
        this.poltronaElement.classList.add("selecionada")
        this.renderBilhete()
    }

    renderBilhete = () => {
        this.bilhetePreco.textContent = monetarioBr(this.precoSessao)
        this.bilhetePoltrona.textContent = this.bilheteObj.poltrona
        this.bilheteMeia
            .addEventListener("change", event => {
                carrinho.getBilhetes().map(element => {
                    if (element.poltrona === this.bilheteObj.poltrona) {
                        element.meia = !element.meia
                        element.preco = this.bilheteMeia.checked ? this.precoSessao / 2 : this.precoSessao
                    }
                    this.bilhetePreco.textContent = monetarioBr(element.preco)
                })
                carrinho.atualizarTotal()
            })

        this.btnDeletar.addEventListener("click", event => this.deletarItem(this.bilheteObj))

        document.querySelector(".box-bilhetes").appendChild(this.cloneBilhete)
    }

    deletarItem = obj => {
        carrinho.removeBilhete(obj)
        this.cloneBilhete.remove()
        this.poltronaElement.classList.remove("selecionada")
    }

}