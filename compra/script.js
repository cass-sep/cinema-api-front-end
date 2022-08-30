import { Bilhete, bilhetes } from "./Bilhete.js"

const sala = document.querySelector(".poltronas")



const fetchData = async () => {
    try {
        const res = await fetch('http://localhost:8080/sessoes/5')
        return await res.json()
    } catch (err) {
        alert("API não encontrada!")
    }
}

let data = await fetchData()


const poltronaDisponivel = numPolt => {
    let poltrona = document.createElement("div")
    poltrona.classList.add("poltrona")
    poltrona.setAttribute("data-id", numPolt)
    poltrona.textContent = numPolt
    poltrona.addEventListener("click", event => {
        if (poltrona.classList.contains("selecionada")) {
            alert("Poltrona já selecionada!")
        }
        if (!poltrona.classList.contains("ocupada")) {
            const bilheteObj = {
                pessoaId: 1,
                sessaoId: data.id,
                poltrona: numPolt,
                diaSessao: "2022-08-31",
                meia: false,
                preco: data.tipo.preco
            }
            new Bilhete(bilheteObj)
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

const monetarioBr = num => {
    return num.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

export const preencherDados = async () => {
    data = await fetchData()
    console.log("Bilhetes: "+bilhetes)
    sala.innerHTML = ""
    console.log("Poltronas ocupadas: "+data.ocupadas)
    for (let i = 1; i <= data.sala.capacidade; i++) {

        if (data.ocupadas.includes(i)) {
            sala.appendChild(poltronaOcupada())
        } else {
            sala.appendChild(poltronaDisponivel(i))
        }
    }

    document.querySelector(".menu_lateral .top .title").textContent = data.filme.nome
    document.querySelector(".menu_lateral .top .nomeSala").textContent = data.sala.nome
    document.querySelector(".menu_lateral .top .date").textContent = new Date(data.dataInicio).toLocaleDateString('pt-BR')
    document.querySelector(".menu_lateral .top .sessaoHorario").textContent = data.horario
    document.querySelector(".menu_lateral .top .sessaoPreco").textContent = monetarioBr(data.tipo.preco)
    document.querySelector(".menu_lateral .top .tipo span").textContent = data.tipo.nome

}

if(!data.descricao){
    preencherDados()
}else{
    alert(data.descricao)
}
