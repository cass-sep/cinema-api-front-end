import {Bilhete} from "./Bilhete.js"

const sala = document.querySelector(".poltronas")
let ocupadas = [1,3,12, 37]
let capacidadeSala = 50



const poltronaDisponivel = numPolt => {
    let poltrona = document.createElement("div")
    poltrona.classList.add("poltrona")
    poltrona.textContent = numPolt
    poltrona.addEventListener("click", event => {
        if (poltrona.classList.contains("selecionada")) {
            alert("Poltrona já selecionada!")
        }
        if (!poltrona.classList.contains("ocupada")) {
            const bilheteObj = {
                poltrona: numPolt,
                meia: false,
                preco: 20.00
            }
            new Bilhete(bilheteObj, 20.00)
            poltrona.classList.add("selecionada")
        } 
       
        
    })
    return poltrona
}

const poltronaOcupada = () => {
    let poltrona = poltronaDisponivel()
    poltrona.classList.add("ocupada")
    let span = document.createElement("span")
    span.classList.add("material-symbols-outlined")
    span.textContent = "person"
    poltrona.appendChild(span)
    return poltrona
}

sala.innerHTML = ""
for (let i = 1; i <= capacidadeSala; i++) {
   
    if (ocupadas.includes(i)) {
        sala.appendChild(poltronaOcupada())
    } else {
        sala.appendChild(poltronaDisponivel(i))
    }

}


