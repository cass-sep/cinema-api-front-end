import { topMenu } from "../../components/top-menu.js"

const form = document.querySelector("form#cadastro")
const formEdicao = document.querySelector("form#edicao")
const modalPessoa = document.querySelector(".container-modal-pessoa")
const formCadastro = document.querySelector(".thread-cadastro")
const tbody = document.querySelector("table tbody")

topMenu()

export const init = (url, obj) => {
    formSubmitEvent(url, obj)
    render(url, obj)
}

export const formSubmitEvent = (url, objj) => {

    if (formEdicao) {
        formEditEvent(url, objj)
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let obj = serializarForm(form)

        axios.post(`http://localhost:8080/${url}`, obj).then(res => {
            console.warn(res)
            if (res.status == 201) {
                swal("Success", "Sessão criada!", "success")
            }
        }).catch(err => {
            console.log(err)
            swal("Error", err.response.data.descricao, "error")
        }).finally(e => {
            render(url, objj)
        })
    })
}

const formEditEvent = (url, objj) => {

    formEdicao.addEventListener("submit", e => {

        e.preventDefault()
        let obj = serializarForm(formEdicao)
        console.log(obj)


        axios.put(`http://localhost:8080/${url}/${formEdicao.dataset.id}`, obj).then(res => {
            console.warn(res)
            if (res.status == 200) {
                swal("Success", "Editado com sucesso!", "success")

            }
        }).catch(err => {
            console.log(err)
            swal("Error", err.response.data.descricao, "error")
        }).finally(e => {
            render(url, objj)
            modalPessoa.classList.remove("show")
        })
    })
}

export const fetchData = async (url = "sessoes") => {
    try {
        const res = await fetch(`http://localhost:8080/${url}`)
        return await res.json()
    } catch (err) {
        swal("Error", "Não foi possível se conectar com o Banco de Dados.", "error")
    }
}

if (modalPessoa) {
    modalPessoa.addEventListener("click", e => {
        if (e.target.classList.contains("container-modal-pessoa")) {
            e.target.classList.toggle("show")
        }
    })
}


export const criaTr = (tabela, itens, id, url, obj) => {
    let tr = document.createElement('tr')
    itens.forEach(item => {
        let td = document.createElement('td')
        td.innerHTML = item
        tr.appendChild(td)
    })

    let td = document.createElement('td')
    let a = document.createElement("span")

    a.classList.add("material-symbols-outlined", "delete")
    a.innerHTML = "delete_forever"
    a.addEventListener("click", e => {
        swal("Deseja realmente deletar? (Essa ação é irreversível)", {
            buttons: {
                catch: {
                    text: "Sim",
                    value: "sim",
                },
                cancel: "Não"
            },
        })
            .then((value) => {
                switch (value) {
                    case "sim":
                        deletarItem(id, url, obj)
                        break;
                    default:
                }
            })
    })

    td.appendChild(a)

    if (formEdicao) {
        let b = document.createElement("span")
        b.classList.add("material-symbols-outlined", "edit")
        b.innerHTML = "edit"
        b.addEventListener("click", e => {

            let inputs = formCadastro.querySelectorAll("th")
            modalPessoa.querySelector("form").innerHTML = ""
            modalPessoa.querySelector("form").dataset.id = id;

            inputs.forEach((el, index) => {
                let element = el.cloneNode(true)
                element.removeAttribute("width")
                let input = element.querySelector("input")
                if (input) {
                    if (input.type == "submit") {
                        input.value = "SALVAR"
                    }

                    else {
                        input.value = itens[index]
                    }

                    modalPessoa.querySelector("form").append(element)
                }
            })
            modalPessoa.classList.add("show")
            modalPessoa.querySelectorAll("form input")[0].focus()
        })
        td.appendChild(b)
    }

    tr.appendChild(td)
    tr.setAttribute('data-id', id)
    tabela.append(tr)
}

const deletarItem = (id, url, obj) => {
    axios.delete(`http://localhost:8080/${url}/${id}`).then(res => {
        render(url, obj)
        swal("Success", "Deletado com sucesso!", "success")
    }).catch(err => {
        console.log(err)
        swal("Error", "Erro", "error")
    })
}

export const serializarForm = form => {
    let data = {}
    Object.keys(form.elements).forEach(el => {
        let value = form[el].value
        let name = form[el].name
        data[name] = value
    })
    return data;
}

export const render = async (url, obj) => {

    let datas = await fetchData(url)
    tbody.innerHTML = ""
    datas.forEach(item => {
        let dadosDaTabela = []
        obj.forEach(el => {

            let val

            if (el.includes(".")) {
                let a = el.split(".")
                let total = a.reduce((acumulador, numero, i, original) => acumulador[a[i]], item)
                val = total.toString()
            } else {
                console.log(item[el])
                val = item[el].toString()
            }

            if (val.includes(".jpg")) {
                val = `<img src="${val}"/>`
            }
            dadosDaTabela.push(val)


        })

        criaTr(tbody, dadosDaTabela, item.id, url, obj)
    })
}

