const templateBilhete = document.querySelector("#bilhete-template");
import { preencherDados } from "./script.js"

export let bilhetes = []

export class Bilhete {

    constructor(bilheteObj) {
        this.bilheteObj = bilheteObj
        this.precoSessao = bilheteObj.preco
        this.cloneBilhete = templateBilhete.content.cloneNode(true).children[0]
        this.bilhetePreco = this.cloneBilhete.querySelector(".total_bilhete span")
        this.btnDeletar = this.cloneBilhete.querySelector(".deletar")
        this.bilhetePoltrona = this.cloneBilhete.querySelector(".poltrona span")
        this.bilheteMeia = this.cloneBilhete.querySelector(".meia input[type='checkbox']")
        if (!bilhetes.some(bilhete => bilhete.poltrona === bilheteObj.poltrona)) {
            bilhetes.push(bilheteObj)
            this.renderBilhete()
        }
    }

    renderBilhete = () => {

        this.bilhetePreco.textContent = monetarioBr(this.precoSessao)
        this.bilhetePoltrona.textContent = this.bilheteObj.poltrona
        this.bilheteMeia
            .addEventListener("change", () => {
                if (this.bilheteMeia.checked) {
                    bilhetes.map(element => {
                        if (element.poltrona === this.bilheteObj.poltrona) {
                            element.meia = true
                            element.preco = this.precoSessao / 2
                        }
                    })
                    this.bilhetePreco.textContent = monetarioBr(this.precoSessao / 2)
                }
                else {
                    bilhetes.map(element => {
                        if (element.poltrona === this.bilheteObj.poltrona) {
                            element.meia = false
                            element.preco = this.precoSessao / 1
                        }
                    })
                    this.bilhetePreco.textContent = monetarioBr(this.precoSessao)
                }
                this.atualizarTotal()
            })

        this.btnDeletar.addEventListener("click", event => {
            // if(!confirm("Remoter Bilhete da Poltrona "+this.bilheteObj.poltrona)) return false
           this.deletarItem(this.bilheteObj)
        })

        document.querySelector(".box-bilhetes").appendChild(this.cloneBilhete)

        this.atualizarTotal()
    }

    deletarItem = obj => {
        console.log(bilhetes)
        bilhetes = bilhetes.filter(bilhete => bilhete != obj)
        this.cloneBilhete.remove()
        document.querySelector(`.poltrona[data-id='${obj.poltrona}']`).classList.remove("selecionada")
        this.atualizarTotal()
    }

    atualizarTotal = () => {
        console.log("Bilhetes:")
        console.log(bilhetes)
        let divTotal = document.querySelector(".total-bilhetes")
        let total = bilhetes.reduce((accum, curr) => accum + curr.preco, 0)
        divTotal.innerHTML = monetarioBr(total)
    }

}


const limparBilhetes = () => {
    document.querySelector(".box-bilhetes").innerHTML = ""
    bilhetes = []
}

const monetarioBr = num => {
    return num.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}


document.querySelector("input[type='submit']").addEventListener("click", event => {
    
    bilhetes.forEach(bilhete => {
        axios.post('http://localhost:8080/bilhetes', bilhete)
            .then(response => {
                limparBilhetes()
                preencherDados()
            })
            .catch(error => {
                console.log(error)
            })
    })


})