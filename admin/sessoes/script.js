import { init } from "../script.js"

const obj = ["ativo", "id", "dataInicio", "dataFinal", "horario", "sala.nome", "filme.nome", "tipo.nome", "bilhetes.length"]
const url = "sessoes"

init(url, obj)

const selectSala = document.querySelector("select[name='salaId']")
const selectTipo = document.querySelector("select[name='tipoId']")

axios.get("http://localhost:8080/salas")
   .then(res => res.data)
   .then(data => preencherSelect(selectSala, data))

axios.get("http://localhost:8080/tipos")
   .then(res => res.data)
   .then(data => preencherSelect(selectTipo, data))

const preencherSelect = (select, data) => {
   data.forEach(sala => {
      let option = document.createElement("option")
      option.text = sala.nome
      option.value = sala.id
      select.add(option)
   })
}