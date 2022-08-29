const templateBilhete = document.querySelector("#bilhete-template");

let bilhetes = []

class Bilhete {

    constructor(bilheteObj, precoSessao) {
        this.bilheteObj = bilheteObj
        this.precoSessao = precoSessao
        this.cloneBilhete = templateBilhete.cloneNode(true).content
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
                bilhetes = bilhetes.filter(bilhete => bilhete != this.bilheteObj)
                console.log(this)
                this.remove()
            })
        document.querySelector(".box-bilhetes").appendChild(this.cloneBilhete)

        
        this.atualizarTotal()
    }

    atualizarTotal = () => {
        console.log(bilhetes)
        let divTotal = document.querySelector(".total-bilhetes")
        let total = bilhetes.reduce((accum, curr) => accum + curr.preco, 0)
        divTotal.innerHTML = monetarioBr(total)
    }

}

const monetarioBr = num => {
    return num.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

export { Bilhete }