import {data, paramSessaoData, carrinho} from "./script.js"

export class Poltrona {
    constructor(estado, numPolt) {
        this.estado = estado
        this.numPolt = numPolt
        this.poltrona = null
    }

    init = () => {
        if (this.estado == "ocupada") {
            this.poltrona = this.ocupada()
            
        }
        if (this.estado == "disponivel") {
            this.poltrona = this.disponivel()
        }
        if (this.estado == "selecionada") {
            this.selecionada()
        }
        this.poltrona.addEventListener("click", event => {
            if(this.estado === "selecionada"){
               this.estado = "disponivel"
               this.init()
            }

            if (this.estado != "ocupada") {
                const bilheteObj = {
                    pessoaId: 1,
                    sessaoId: data.id,
                    poltrona: this.numPolt,
                    diaSessao: paramSessaoData,
                    meia: false,
                    preco: data.tipo.preco
                }
                carrinho.addBilhete(bilheteObj, this.poltrona)
                this.estado = "selecionada"
                this.init()
            }
        })
        return this.poltrona
    }

    ocupada = () => {
        let poltrona = document.createElement("div")
        poltrona.classList.add("poltrona")
        poltrona.setAttribute("data-id", 1)
        poltrona.classList.add("ocupada")
        let span = document.createElement("span")
        span.classList.add("material-symbols-outlined")
        span.textContent = "person"
        poltrona.appendChild(span)
        return poltrona
    }

    disponivel = () => {
        console.log("disp")
        let poltrona = document.createElement("div")
        poltrona.classList.add("poltrona")
        poltrona.setAttribute("data-id", this.numPolt)
        poltrona.textContent = this.numPolt
        poltrona.classList.remove("selecionada")
        return poltrona
    }
    selecionada = () => {
        this.poltrona.classList.add("selecionada")
    }
    

}