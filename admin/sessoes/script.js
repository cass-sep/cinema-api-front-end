import { init } from "../script.js"

const obj = ["ativo", "id", "dataInicio", "dataFinal", "horario", "sala.nome", "filme.nome", "tipo.nome", "bilhetes.length"]
const url = "sessoes"

init(url, obj)

const select = document.querySelector("select[name='salaId']")

axios.get("http://localhost:8080/salas")
   .then(res => res.data)
   .then(data => preencherSelect(data))

const preencherSelect = (data) => {
   data.forEach(sala => {
      let option = document.createElement("option")
      option.text = sala.nome
      option.value = sala.id
      select.add(option)
   })
}