import { topMenu } from '../components/top-menu.js';
import { monetarioBr } from "../compra/js/util/Util.js"

window.onload = function () {
    topMenu();
    var tabela = document.querySelector(".tabela");
    var tabelaTotal = document.querySelector(".tabela-totais");
    var btnFiltrar = document.querySelector(".btn-comprar");
    var inputDe = document.querySelector("#de");
    var inputAte = document.querySelector("#ate");

    btnFiltrar.addEventListener('click', function () {
        tabela.innerHTML = "";
        tabelaTotal.innerHTML = "";
        var param = `?de=${inputDe.value}&ate=${inputAte.value}`;

        pegarComIntervalo(param).then(itens => {
            itens.salas.forEach(sala => {
                criarSala(sala, tabela);
            });
            criarTotal(itens, tabelaTotal)
        })
    })

    pegarRelatorio().then(itens => {
        itens.salas.forEach(sala => {
            criarSala(sala, tabela);
        });

        criarTotal(itens, tabelaTotal)
    })
}

function criarSala(sala, tabela) {
    var tempItem = document.querySelector("#temp-item").cloneNode(true);
    tempItem.content.querySelector(".thead").innerHTML = sala.nome.toUpperCase();
    tempItem.content.querySelector(".faturamento").innerHTML = monetarioBr(sala.faturamento);
    tempItem.content.querySelector(".bilhetes").innerHTML = sala.bilhetes_vendidos;
    tempItem.content.querySelector(".sessoes").innerHTML = sala.qtd_sessoes;
    tempItem.content.querySelector(".filmes").innerHTML = sala.filmes;


    tabela.appendChild(tempItem.content);
}

function criarTotal(item, tabelaTotal) {
    var tempTotais = document.querySelector("#temp-totais").cloneNode(true);
    tempTotais.content.querySelector(".arrecadao").innerHTML = monetarioBr(item.arrecadaoTotal);
    tempTotais.content.querySelector(".ocupacao").innerHTML = item.ocupacaoTotal;
    tempTotais.content.querySelector(".sessoes").innerHTML = item.totalSessoes;


    tabelaTotal.appendChild(tempTotais.content);
}

async function pegarRelatorio() {
    var file = await fetch(`http://localhost:8080/relatorios/salas`)
    var json = await file.json();
    return json
}


async function pegarComIntervalo(params) {
    var file = await fetch(`http://localhost:8080/relatorios/salas${params}`)
    var json = await file.json();
    return json
}

// http://localhost:8080/relatorios/salas?de=2022-08-21&ate=2022-08-21