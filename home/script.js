

function scrollMais(elemento) {
    var areaHorarios = elemento.parentElement.querySelector('.horarios-area');
    var lado = elemento.getAttribute("data-lado");
    var offset = 200;
    if (areaHorarios.scrollLeft < (areaHorarios.scrollWidth - areaHorarios.clientWidth)) {
        areaHorarios.scrollBy({
            top: 0,
            left: offset,
            behavior: 'smooth'
        });
    }

    if ((areaHorarios.scrollWidth - areaHorarios.clientWidth) <= (areaHorarios.scrollLeft + offset)) {
        elemento.classList.add("btn-off");
    }
    console.log(areaHorarios.scrollLeft);
    if ((areaHorarios.scrollLeft + offset) > 0) {
        var btnMenos = elemento.parentElement.querySelector('#btn-mh-a');
        btnMenos.classList.add("btn-on");
        btnMenos.classList.remove("btn-off");
    }
}

function scrollMenos(elemento) {
    var areaHorarios = elemento.parentElement.querySelector('.horarios-area');
    var lado = elemento.getAttribute("data-lado");
    var offset = 200;
    if (areaHorarios.scrollLeft >= 0) {
        areaHorarios.scrollBy({
            top: 0,
            left: -offset,
            behavior: 'smooth'
        });
        console.log(areaHorarios.scrollLeft);
    }
    if ((areaHorarios.scrollLeft - offset) <= 0) {
        elemento.classList.add("btn-off");
    }

    var btnMais = elemento.parentElement.querySelector('#btn-mh-p');
    if ((areaHorarios.scrollWidth - areaHorarios.clientWidth) > (areaHorarios.scrollLeft - offset) && btnMais.classList.contains("btn-off")) {
        btnMais.classList.add("btn-on");
        btnMais.classList.remove("btn-off");
    }
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

}