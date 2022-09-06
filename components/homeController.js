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


            // sessaoWindow.content.querySelector(".trailer-btn").setAttribute("data-src", "https://www.youtube.com/embed/ur0rw-SaFmU?autoplay=1")
            sessaoWindow.content.querySelector(".filme-nome").innerHTML = filmePego.nome;
            sessaoWindow.content.querySelector(".fn-2").innerHTML = filmePego.nome;

            sessaoWindow.content.querySelector(".diretor-nome").innerHTML = filmePego.diretor;
            sessaoWindow.content.querySelector(".txt-sinopse").innerHTML = filmePego.sinopse;
            sessaoWindow.content.querySelector(".filme-genero").innerHTML = filmePego.generos;
            sessaoWindow.content.querySelector(".filme-duracao").innerHTML = Math.floor(Number(filmePego.duracao) / 60) + "h" + (Number(filmePego.duracao) % 60) + "min";
            sessaoWindow.content.querySelector(".filme-poster").src = filmePego.posterUrl;
            sessaoWindow.content.querySelector(".filme-info").style.backgroundImage = `url('../../assets/screenshots/${filmePego.bannerUrl}')`;
            sessaoWindow.content.querySelector(".btn-comprar").setAttribute("data-filmeid", filmePego.id);
            sessaoWindow.content.querySelector(".filme-box").setAttribute("data-filme-id", filmePego.id);



            var diaAtivoBox = tempDiaSemana.content.querySelector(".dia-box");
            var diaNomeBox = tempDiaSemana.content.querySelector(".txt-dia-semana");
            var diaBox = tempDiaSemana.content.querySelector(".txt-dia");
            var mesBox = tempDiaSemana.content.querySelector(".txt-mes");
            var diaSemanaBox = tempDiaSemana.content.querySelector(".txt-dia-semana");

            var salasBox = tempHorario.content.querySelector(".salas-box");
            var salaNome = tempHorario.content.querySelector(".sala-nome");
            var salaLingua = tempHorario.content.querySelector(".sala-lingua");

            var cloneWindow = sessaoWindow.content.cloneNode(true);
            var diasBox = cloneWindow.querySelector(".dias-barra");
            var horarioAreas = cloneWindow.querySelector(".horarios-area");


            var atores = filmePego.atores.split(', ');
            atores.forEach(ator => {
                var atoresBox = document.createElement("div");
                atoresBox.innerHTML = ator;
                atoresBox.setAttribute("class", "ator-nome cursor");
                cloneWindow.querySelector(".cast-info").appendChild(atoresBox);
            })

            var startingDay = new Date();
            var thisDay = new Date();
            var diaAtivo = true;
            for (let i = 0; i <= 3; i++) {
                let diaDaSemana = thisDay.toLocaleString('pt-br', { weekday: 'long' })
                if (diaAtivo !== false) {
                    diaAtivoBox.classList.add("db-atv");
                    diaBox.classList.add("td-atv");
                    mesBox.classList.add("tm-atv");
                    diaSemanaBox.classList.add("tds-atv");
                }
                else {
                    diaAtivoBox.classList.remove("db-atv");
                    diaBox.classList.remove("td-atv");
                    mesBox.classList.remove("tm-atv");
                    diaSemanaBox.classList.remove("tds-atv");
                }
                diaAtivoBox.setAttribute("data-data", thisDay.toISOString({ timeZone: 'America/Sao_Paulo' }).slice(0, 10));
                diaNomeBox.innerHTML = diaDaSemana.replace("-feira", "").toUpperCase();
                diaBox.innerHTML = thisDay.toLocaleString('pt-br', { day: '2-digit' }, { timeZone: "America/Sao_Paulo" });
                mesBox.innerHTML = thisDay.toLocaleString('pt-br', { month: 'long' }).toUpperCase();
                thisDay.setDate(startingDay.getDate() + 1);
                diasBox.appendChild(tempDiaSemana.content.cloneNode(true));
                startingDay.setDate(thisDay.getDate());
                diaAtivo = false;
            }


            salasAtivas.forEach(salaAtiva => {
                organizar(salaAtiva.sessoes);
                salaNome.innerHTML = salaAtiva.sala.nome.toUpperCase();
                // salaLingua.innerHTML = salaAtiva.tipo.lingua;
                salaAtiva.sessoes.forEach(sessao => {
                    var horaHo = document.createElement("div")
                    var salaHoras = document.createElement("div")
                    horaHo.classList.add("hora", "interact")
                    horaHo.setAttribute("data-sessao", sessao.id);
                    horaHo.setAttribute("data-de", sessao.dataInicio);
                    horaHo.setAttribute("data-ate", sessao.dataFinal);
                    horaHo.innerHTML = sessao.horario.split(":")[0] + ":" + sessao.horario.split(":")[1];
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
                var horarioSala = sala.parentElement.parentElement.querySelector(".hora")
                var diaSelecionado = new Date(document.querySelector(".db-atv").getAttribute("data-data"));
                var de = new Date(horarioSala.getAttribute("data-de"));
                var ate = new Date(horarioSala.getAttribute("data-ate"));

                if (nomesColetados.includes(sala.innerHTML)) {

                    if (!(diaSelecionado >= de && diaSelecionado <= ate)) {
                        horarioSala.classList.add("hora-off");
                    } else {
                        horarioSala.classList.add("hora-on");
                    }

                    var elementoParaInserirHora = elementoParaInserirOHorario.querySelector(".sala-horas");
                    elementoParaInserirHora.parentElement.classList.add("sala-off");
                    elementoParaInserirHora.appendChild(horarioSala);
                    sala.parentElement.parentElement.remove();
                } else {
                    if (!(diaSelecionado >= de && diaSelecionado <= ate)) {
                        horarioSala.classList.add("hora-off");
                    } else {
                        horarioSala.classList.add("hora-on");
                    }
                    nomesColetados.push(sala.innerHTML);
                    elementoParaInserirOHorario = sala.parentElement.parentElement;
                    sala.parentElement.parentElement.classList.add("sala-off");
                }
            })

            var salaAtual = filme.querySelector(".hora-on");
            if (salaAtual !== null) {
                salaAtual.parentElement.parentElement.classList.add("sala-on");
                salaAtual.parentElement.parentElement.classList.remove("sala-off");
            }


            var filmeInfo = filme.querySelector(".filme-info");
            var btnTrailer = filmeInfo.querySelector(".trailer-btn");
            btnTrailer.addEventListener('click', function () {
                var tempTrailer = document.querySelector("#temp-trailer").cloneNode(true);
                var iTrailer = tempTrailer.content.querySelector(".trailer-iframe");
                var btnFecharTrailer = tempTrailer.content.querySelector(".fechar-trailer");

                iTrailer.src = btnTrailer.getAttribute("data-src");

                filmeInfo.childNodes.forEach(elemento => {
                    if (elemento.nodeName === "DIV") {
                        elemento.classList.add("trailer-on")
                    }
                })
                filmeInfo.appendChild(tempTrailer.content);

                filmeInfo.addEventListener("mouseover", function () {
                    btnFecharTrailer.classList.add("bf-on")
                })
                filmeInfo.addEventListener("mouseout", function () {
                    btnFecharTrailer.classList.remove("bf-on")
                })

                btnFecharTrailer.addEventListener("click", function () {
                    iTrailer.remove();
                    filmeInfo.childNodes.forEach(elemento => {
                        if (elemento.nodeName === "DIV") {
                            elemento.classList.remove("trailer-on")
                        }
                    })
                    btnFecharTrailer.remove();
                })
            })

            pegarLinks().then(json => {
                // if (filmeInfo.filme === json[filmePego.nome]) {
                var filmeNome = filme.querySelector(".filme-nome").innerHTML;
                filme.querySelector(".filme-estudio").innerHTML = json[filmeNome].estudio;
                filme.querySelector(".filme-pais").innerHTML = json[filmeNome].pais;
                console.log(json[filmeNome].saibaMais);
                filme.querySelector("#botao-sb").setAttribute("href", json[filmeNome].saibaMais);
                filme.querySelector(".trailer-btn").setAttribute("data-src", json[filmeNome].trailer);
                // }
            })

        })




        var btnDia = document.querySelectorAll(".dia-box");
        btnDia.forEach(botao => {
            botao.addEventListener('click', function () {
                if (!botao.classList.contains('db-atv')) {
                    var dia = botao.getAttribute("data-data");
                    var horas = document.querySelectorAll(".hora");
                    horas.forEach(hora => {
                        var diaSelecionado = new Date(botao.getAttribute("data-data"));
                        var sala = hora.parentElement.parentElement;
                        var de = new Date(hora.getAttribute("data-de"));
                        var ate = new Date(hora.getAttribute("data-ate"));

                        if (diaSelecionado >= de && diaSelecionado <= ate) {
                            console.log("dia entre intervalo!");
                            if (hora.classList.contains("hora-off")) {
                                hora.classList.add("hora-on");
                                hora.classList.remove("hora-off");
                            }
                        } else {
                            hora.classList.remove("hora-on");
                            hora.classList.add("hora-off");
                        }
                        if (sala.querySelector(".hora-on") === null) {
                            sala.classList.add("sala-off");
                            sala.classList.remove("sala-on");
                        } else {
                            sala.classList.add("sala-on");
                            sala.classList.remove("sala-off");
                        }
                    });
                    var btnAtivos = document.querySelectorAll(".db-atv");
                    btnAtivos.forEach(botaoAtivo => {
                        var diaAtivos = botaoAtivo.querySelector(".td-atv");
                        var mesAtivos = botaoAtivo.querySelector(".tm-atv");
                        var diaSemanaAtivos = botaoAtivo.querySelector(".txt-dia-semana");
                        botaoAtivo.classList.remove("db-atv");
                        diaAtivos.classList.remove("td-atv");
                        mesAtivos.classList.remove("tm-atv");
                        diaSemanaAtivos.classList.remove("tds-atv");
                    })

                    var dataEscolhida = document.querySelectorAll(`[data-data='${dia}']`);
                    dataEscolhida.forEach(data => {
                        var diaEscolhido = data.querySelector(".txt-dia");
                        var mesEscolhido = data.querySelector(".txt-mes");
                        var diaSemanaAtivos = data.querySelector(".txt-dia-semana");
                        data.classList.add('db-atv');
                        diaEscolhido.classList.add("td-atv");
                        mesEscolhido.classList.add("tm-atv");
                        diaSemanaAtivos.classList.add("tds-atv");
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
                            hora.classList.add('hora-dtv');
                        } else if (hora !== botao) {
                            hora.classList.add('hora-dtv');
                        }
                    })
                    if (botao.classList.contains('hora-dtv')) {
                        botao.classList.remove('hora-dtv');
                    }
                    botao.classList.add('hb-atv');
                } else {
                    horas.forEach(hora => {
                        if (hora.classList.contains('hb-atv')) {
                            hora.classList.remove("hb-atv");
                        } else if (hora.classList.contains('hora-dtv')) {
                            hora.classList.remove('hora-dtv');
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
        // let x = await fetch('http://localhost:8080/sessoes/ativas');
        let x = await fetch('../../components/json-sessoes.json');
        let y = await x.json();
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

    async function pegarLinks() {
        var file = await fetch("../components/links.json");
        var json = await file.json();
        return json
    }

}