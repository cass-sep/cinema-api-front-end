window.onload = function () {
    var topMenu = document.createElement("nav");
    topMenu.style.background = "black";
    topMenu.style.height = "60px";
    document.querySelector("body").insertBefore(topMenu, document.querySelector("body").firstChild);

    var tabela = document.querySelector(".tabela");
    var tabelaTotal = document.querySelector(".tabela-totais");
    var btnFiltrar = document.querySelector(".btn-comprar");
    var inputDe = document.querySelector("#de");
    var inputAte = document.querySelector("#ate");

    // btnFiltrar.addEventListener('click', function () {
    //     tabela.innerHTML = "";
    //     tabelaTotal.innerHTML = "";
    //     var param = `?de=${inputDe.value}&ate=${inputAte.value}`;

    //     // pegarComIntervalo(param).then(itens => {
    //     //     itens.salas.forEach(sala => {
    //     //         criarSala(sala, tabela);
    //     //     });
    //     //     criarTotal(item, tabelaTotal)
    //     // })
    // })

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
    tempItem.content.querySelector(".faturamento").innerHTML = sala.faturamento;
    tempItem.content.querySelector(".bilhetes").innerHTML = sala.bilhetes_vendidos;
    tempItem.content.querySelector(".sessoes").innerHTML = sala.qtd_sessoes;
    tempItem.content.querySelector(".filmes").innerHTML = sala.filmes;


    tabela.appendChild(tempItem.content);
}

function criarTotal(item, tabelaTotal) {
    var tempTotais = document.querySelector("#temp-totais").cloneNode(true);
    tempTotais.content.querySelector(".arrecadao").innerHTML = item.arrecadaoTotal;
    tempTotais.content.querySelector(".ocupacao").innerHTML = item.ocupacaoTotal;
    tempTotais.content.querySelector(".sessoes").innerHTML = item.totalSessoes;


    tabelaTotal.appendChild(tempTotais.content);
}

async function pegarRelatorio() {
    var file = await fetch(`./relatorios.json`)
    var json = await file.json();
    return json
}


// async function pegarComIntervalo(params) {
//     var file = await fetch(`./relatorios${params}.json`)
//     var json = await file.json();
//     return json
// }

// http://localhost:8080/relatorios/salas?de=2022-08-21&ate=2022-08-21