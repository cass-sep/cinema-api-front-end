window.onload = function () {

}

function comprarPage(btnComprar) {
    var diaTag = document.querySelector(".db-atv");
    var dia = diaTag.getAttribute("data-dia");
    var filmeId = btnComprar.getAttribute("data-filmeid");
    console.log(btnComprar.getAttribute("data-filmeid"));
    if (dia !== null && filmeId !== null) {
        var params = `?filme=${filmeId}&horario=${hora}&dia=${dia}`;
        // window.location = window.location.origin.concat(`/compra${params}`)
    }
}

function voltarInfo(btnVoltar) {
    var paiBox = btnVoltar.parentElement;
    var pages = paiBox.querySelectorAll(".page")
    var infoAtiva = paiBox.querySelector(".page-ativo");
    var numeroAtiva = Number(infoAtiva.getAttribute("data-page"));

    if (numeroAtiva !== 1) {
        pages.forEach(element => {
            var numero = Number(element.getAttribute("data-page"))
            if (numero < numeroAtiva) {
                if ((numeroAtiva - numero) === 1) {
                    infoAtiva.classList.remove("page-ativo");
                    element.classList.add("page-ativo");
                }
            }
        });
    }
    var tote = document.querySelector(".db-atv").parentElement
}
function avancarInfo(btnAvancar) {
    var paiBox = btnAvancar.parentElement;
    var pages = paiBox.querySelectorAll(".page")
    var infoAtiva = paiBox.querySelector(".page-ativo");
    var numeroAtiva = Number(infoAtiva.getAttribute("data-page"));

    if (numeroAtiva < pages.length) {
        pages.forEach(element => {
            var numero = Number(element.getAttribute("data-page"))
            if (numero > numeroAtiva) {
                if ((numero - numeroAtiva) === 1) {
                    infoAtiva.classList.remove("page-ativo");
                    element.classList.add("page-ativo");
                }
            }
        });
    }
    var tote = document.querySelector(".db-atv").parentElement

}