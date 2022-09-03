import { Carrinho } from "./Carrinho.js"
import { monetarioBr, dataBr } from "./util/Util.js"

export let carrinho = new Carrinho()

const urlParams = new URLSearchParams(window.location.search);
const paramSessaoId = urlParams.get('sessao');
const paramSessaoData = urlParams.get('data');

const sala = document.querySelector(".poltronas")

const fetchData = async () => {
    try {
        const res = await fetch(`http://localhost:8080/sessoes/${paramSessaoId}/${paramSessaoData}`)
        return await res.json()
    } catch (err) {
        swal("Error", "Não foi possível se conectar com o Banco de Dados.", "error")
    }
}   

let data = await fetchData()

const poltronaDisponivel = numPolt => {
    let poltrona = document.createElement("div")
    poltrona.classList.add("poltrona")
    poltrona.setAttribute("data-id", numPolt)
    poltrona.textContent = numPolt
    
    poltrona.addEventListener("click", event => {

        if (!poltrona.classList.contains("ocupada")) {
            const bilheteObj = {
                pessoaId: 1,
                sessaoId: data.id,
                poltrona: numPolt,
                diaSessao: paramSessaoData,
                meia: false,
                preco: data.tipo.preco
            }
            carrinho.addBilhete(bilheteObj, poltrona)
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

export const preencherDados = async () => {
    data = await fetchData()
    console.log(data)
    sala.innerHTML = ""
    console.log("Poltronas ocupadas: " + data.ocupadas)
    for (let i = 1; i <= data.sala.capacidade; i++) {

        if (data.ocupadas.includes(i)) {
            sala.appendChild(poltronaOcupada())
        } else {
            sala.appendChild(poltronaDisponivel(i))
        }
    }

    document.querySelector(".menu_lateral .top .title").textContent = data.filme.nome
    document.querySelector(".menu_lateral .top .img_poster img").src = data.filme.posterUrl
    document.querySelector(".menu_lateral .top .nomeSala").textContent = data.sala.nome
    document.querySelector(".menu_lateral .top .date").textContent = dataBr(paramSessaoData)
    document.querySelector(".menu_lateral .top .sessaoHorario").textContent = data.horario
    document.querySelector(".menu_lateral .top .sessaoPreco").textContent = monetarioBr(data.tipo.preco)
    document.querySelector(".menu_lateral .top .tipo span").textContent = data.tipo.nome

}

if (!data.descricao) {
    preencherDados()
} else {
    alert(data.descricao)
}

document.querySelector(".footer-total input[type='submit']").addEventListener("click", async event => {

    let data = await fetchData()

    let todasPoltDisp = true
    carrinho.getBilhetes().forEach(bilhete => {
        if (data.ocupadas.includes(bilhete.bilheteObj.poltrona)) {
            todasPoltDisp = false
            swal("Ops!", `Poltrona ${bilhete.bilheteObj.poltrona} não está mais disponível`, "error")
            carrinho.destacarUmBilhete(bilhete)
        }
    })

    if (todasPoltDisp) {
        axios.all(carrinho.getBilhetes().map(bilhete => {
            return axios.post('http://localhost:8080/bilhetes', bilhete.bilheteObj)
        })).then(el => {
            console.log(el)
            resetar()
            swal("Success!", "Compra finalizada.", "success")
        })
    }

})

const resetar = () => {
    carrinho.limparCarrinho()
    preencherDados()
}

