import { topMenu } from '../components/top-menu.js';
import { sessoes } from '../components/horariosService.js';

window.onload = function () {

    topMenu();

    var sessaoWindow = document.getElementById("sessao-window");
    var main = document.querySelector(".content-box");
    var tempDiaSemana = document.getElementById("temp-dia-box");
    var tempHorario = document.getElementById("temp-horario");


    pegarFilmes().then(elemento => {
        elemento.forEach(element => {
            var filmePego = element.filme;
            var salasAtivas = element.salasAtivas;
            // sessaoWindow.content.querySelector(".filme-estudio").innerHTML = filmePego.estudio;
            // sessaoWindow.content.querySelector(".filme-pais").innerHTML = filmePego.pais;
            sessaoWindow.content.querySelector(".filme-nome").innerHTML = filmePego.nome;
            sessaoWindow.content.querySelector(".diretor-nome").innerHTML = filmePego.diretor;
            sessaoWindow.content.querySelector(".txt-sinopse").innerHTML = filmePego.sinopse;
            sessaoWindow.content.querySelector(".filme-genero").innerHTML = filmePego.generos;
            sessaoWindow.content.querySelector(".filme-duracao").innerHTML = filmePego.duracao;
            sessaoWindow.content.querySelector(".filme-poster").src = filmePego.posterUrl;
            sessaoWindow.content.querySelector(".filme-info").style.backgroundImage = `url('../../assets/screenshots/${filmePego.bannerUrl}')`;
            // sessaoWindow.content.querySelector(".filme-info").style.No = `url('../../assets/screenshots/${filmePego.bannerUrl}')`;
            sessaoWindow.content.querySelector(".btn-comprar").setAttribute("data-filmeid", filmePego.id);
            sessaoWindow.content.querySelector(".filme-box").setAttribute("data-filme-id", filmePego.id);



            var diaAtivoBox = tempDiaSemana.content.querySelector(".dia-box");
            var diaNomeBox = tempDiaSemana.content.querySelector(".txt-dia-semana");
            var diaBox = tempDiaSemana.content.querySelector(".txt-dia");
            var mesBox = tempDiaSemana.content.querySelector(".txt-mes");

            var horariosArea = sessaoWindow.content.querySelector(".horarios-area");
            var salasBox = tempHorario.content.querySelector(".salas-box");
            var salaNome = tempHorario.content.querySelector(".sala-nome");
            var salaLingua = tempHorario.content.querySelector(".sala-lingua");

            var cloneWindow = sessaoWindow.content.cloneNode(true);
            var diasBox = cloneWindow.querySelector(".dias-barra");
            var horarioAreas = cloneWindow.querySelector(".horarios-area");


            var startingDay = new Date();
            var thisDay = new Date();
            var diaAtivo = true;
            for (let i = 0; i <= 3; i++) {
                let diaDaSemana = thisDay.toLocaleString('pt-br', { weekday: 'long' })
                if (diaAtivo !== false) {
                    diaAtivoBox.classList.add("db-atv");
                    diaBox.classList.add("td-atv");
                    mesBox.classList.add("tm-atv");
                } else {
                    diaAtivoBox.classList.remove("db-atv");
                    diaBox.classList.remove("td-atv");
                    mesBox.classList.remove("tm-atv");
                }
                diaAtivoBox.setAttribute("data-data", thisDay.toISOString().slice(0, 10));
                diaNomeBox.innerHTML = diaDaSemana.replace("-feira", "").toUpperCase();
                diaBox.innerHTML = thisDay.toLocaleString('pt-br', { day: '2-digit' });
                mesBox.innerHTML = thisDay.toLocaleString('pt-br', { month: 'long' }).toUpperCase();
                thisDay.setDate(startingDay.getDate() + 1);
                diasBox.appendChild(tempDiaSemana.content.cloneNode(true));
                startingDay.setDate(thisDay.getDate());
                diaAtivo = false;
            }

            // organizar(salasAtivas);

            salasAtivas.forEach(salaAtiva => {

                salaNome.innerHTML = salaAtiva.sala.nome;
                // salaLingua.innerHTML = salaAtiva.tipo.lingua;
                salaAtiva.sessoes.forEach(sessao => {
                    var horaHo = document.createElement("div")
                    var salaHoras = document.createElement("div")
                    horaHo.classList.add("hora", "cursor")
                    horaHo.setAttribute("data-sessao", sessao.id);
                    horaHo.innerHTML = sessao.horario;
                    salaHoras.classList.add("sala-horas")
                    salaHoras.appendChild(horaHo);
                    salaHoras.setAttribute("data-sala", salaAtiva.sala.id);

                    var clonagem = salasBox.cloneNode(true)
                    clonagem.appendChild(salaHoras);

                    horarioAreas.appendChild(clonagem);
                })


            })


            main.appendChild(cloneWindow);

        })

    }).then(finale => {
        var filmesNaPage = document.querySelectorAll(".filme-box");
        filmesNaPage.forEach(filme => {
            var nomesSalas = filme.querySelectorAll(".sala-nome");
            var elementoParaInserirOHorario = "";
            var nomesColetados = [];
            nomesSalas.forEach(sala => {
                if (nomesColetados.includes(sala.innerHTML)) {
                    var horarioSala = sala.parentElement.parentElement.querySelector(".hora")
                    var elementoParaInserirHora = elementoParaInserirOHorario.querySelector(".sala-horas");
                    elementoParaInserirHora.appendChild(horarioSala);
                    sala.parentElement.parentElement.remove();
                } else {
                    nomesColetados.push(sala.innerHTML);
                    elementoParaInserirOHorario = sala.parentElement.parentElement;
                }
            })
        })

        var btnDia = document.querySelectorAll(".dia-box");
        btnDia.forEach(botao => {
            botao.addEventListener('click', function () {
                if (!botao.classList.contains('db-atv')) {
                    var dia = botao.getAttribute("data-data");
                    var btnAtivos = document.querySelectorAll(".db-atv");
                    btnAtivos.forEach(botaoAtivo => {
                        var diaAtivos = botaoAtivo.querySelector(".td-atv");
                        var mesAtivos = botaoAtivo.querySelector(".tm-atv");
                        botaoAtivo.classList.remove("db-atv");
                        diaAtivos.classList.remove("td-atv");
                        mesAtivos.classList.remove("tm-atv");
                    })

                    var dataEscolhida = document.querySelectorAll(`[data-data='${dia}']`);
                    dataEscolhida.forEach(data => {
                        var diaEscolhido = data.querySelector(".txt-dia");
                        var mesEscolhido = data.querySelector(".txt-mes");
                        data.classList.add('db-atv');
                        diaEscolhido.classList.add("td-atv");
                        mesEscolhido.classList.add("tm-atv");
                    })
                }
            })
        })


        var btnHorario = document.querySelectorAll(".hora");
        btnHorario.forEach(botao => {
            botao.addEventListener('click', function () {
                var horas = botao.parentElement.parentElement.parentElement.querySelectorAll('.hora');
                if (!botao.classList.contains('hb-atv')) {
                    horas.forEach(hora => {
                        if (hora.classList.contains('hb-atv')) {
                            hora.classList.remove("hb-atv");
                            hora.classList.add('off');
                        } else if (hora !== botao) {
                            hora.classList.add('off');
                        }
                    })
                    if (botao.classList.contains('off')) {
                        botao.classList.remove('off');
                    }
                    botao.classList.add('hb-atv');
                } else {
                    horas.forEach(hora => {
                        if (hora.classList.contains('hb-atv')) {
                            hora.classList.remove("hb-atv");
                        } else if (hora.classList.contains('off')) {
                            hora.classList.remove('off');
                        }
                    })
                }
            })
        })

        document.querySelectorAll('.horarios-area').forEach(element => {
            var tamanhoSomado = 0;

            if (element.clientWidth < element.scrollWidth) {
                console.log("element.clientWidth: " + element.clientWidth);
                console.log("element.scrollWidth: " + element.scrollWidth);
                // element.style.border = '1px solid red';
                var botaoMais = element.parentElement.querySelector("#btn-mh-p");
                botaoMais.classList.add("btn-on");
                botaoMais.classList.remove("btn-off");
            }

        });

        document.querySelectorAll(".filme-extra-info").forEach(area => {
            area.addEventListener("mouseover", function () {
                area.querySelectorAll(".btn-filme-bg").forEach(botao => {
                    if (!botao.classList.contains("on-hover")) { botao.classList.add("on-hover"); }
                })
            });
            area.addEventListener("mouseout", function () {
                area.querySelectorAll(".btn-filme-bg").forEach(botao => {
                    if (botao.classList.contains("on-hover")) { botao.classList.remove("on-hover"); }
                })
            });
        })





    })



    async function teste() {
        let data = await fetch("http://localhost:8080/sessoes/pesquisa?de=2022-08-15&ate=2022-08-16");
        let jaison = await data.json();
    }

    async function pegarFilmes() {
        let x = await fetch('http://localhost:8080/sessoes/ativas');
        let y = await x.json();
        console.log(y);
        return y;
    }

    function organizar(sessoes) {
        sessoes.sort((a, b) => {
            if (a.sala.id < b.sala.id)
                return -1;
            if (a.sala.id > b.sala.id)
                return 1;
            return 0;
        });

        sessoes.sort((a, b) => {
            if (a.horario < b.horario && a.sala.id == b.sala.id)
                return -1;
            if (a.horario > b.horario && a.sala.id == b.sala.id)
                return 1;
            return 0;
        });

        // return sessoes;
    }

}