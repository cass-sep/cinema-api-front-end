import { carrinho } from "./script.js"
import { monetarioBr } from "./util/Util.js"

const templateBilhete = document.querySelector("#bilhete-template");

export class Bilhete {

    constructor(bilheteObj, poltronaElement) {
        this.bilheteObj      = bilheteObj
        this.poltronaElement = poltronaElement;
        this.precoSessao     = bilheteObj.preco
        this.cloneBilhete    = templateBilhete.content.cloneNode(true).children[0]
        this.bilhetePreco    = this.cloneBilhete.querySelector(".total_bilhete span")
        this.btnDeletar      = this.cloneBilhete.querySelector(".deletar")
        this.bilhetePoltrona = this.cloneBilhete.querySelector(".poltrona span")
        this.bilheteMeia     = this.cloneBilhete.querySelector(".meia input[type='checkbox']")
        this.poltronaElement.classList.add("selecionada")
        this.renderBilhete()
    }

    renderBilhete = () => {
        this.bilhetePreco.textContent = monetarioBr(this.precoSessao)
        this.bilhetePoltrona.textContent = this.bilheteObj.poltrona
        this.bilheteMeia
            .addEventListener("change", event => {
                carrinho.getBilhetes().map(element => {
                    if (element.bilheteObj.poltrona === this.bilheteObj.poltrona) {
                        element.bilheteObj.meia = !element.meia
                        element.bilheteObj.preco = this.bilheteMeia.checked ? this.precoSessao/2 : this.precoSessao/1
                        this.bilhetePreco.textContent = monetarioBr(element.bilheteObj.preco)
                    }
                })
                carrinho.atualizarTotal()
            })

        this.btnDeletar.addEventListener("click", event => carrinho.removeBilhete(this))

        document.querySelector(".box-bilhetes").appendChild(this.cloneBilhete)
    }

}