import { init } from "../script.js"

const obj = ["id", "sessao.id", "sessao.horario", "diaSessao", "sessao.filme.nome", "sessao.tipo.nome", "poltrona", "meia", "total"]

const url = "bilhetes"

init(url, obj)