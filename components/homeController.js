import { topMenu } from '../components/top-menu.js';
import { sessoes } from '../components/horariosService.js';

window.onload = function () {


    // var salasBox = document.querySelector(".salas-box");
    // var salaNome = document.querySelector(".sala-nome");
    // var salaLingua = document.querySelector(".sala-lingua");

    // var salaHorarios = document.querySelector(".sala-horas");
    // var hora = document.querySelector(".hora");
    // var horariosBox = sessaoWindow.content.querySelector(".horarios-area");
    // var mesmaSala = [];

    // organizar(sessoes);

    // var horarios = {
    //     "sala": "",
    //     "horas": ""
    // }
    // var variosHorario = []

    // var i = 1;
    // sessoes.map(sessao => {
    //     if (mesmaSala.includes(sessao.sala.id) === false) {
    //         if (mesmaSala !== "") {
    //             variosHorario.push(horarios)
    //             variosHorario.map(horario => {
    //                 variosHorario.map(novoHorario => {
    //                     if (novoHorario.sala === horario.sala) {
    //                         hora.innerHTML = horario.horas;
    //                         salaHorarios.appendChild(hora);
    //                     }
    //                 })
    //             })
    //             horariosBox.appendChild(salasBox)
    //         }
    //         mesmaSala.push(sessao.sala.id)
    //         salaNome.innerHTML = sessao.sala.nome;
    //         salaLingua.innerHTML = sessao.tipo.lingua;
    //     } else {
    //         horarios.horas = sessao.horario;
    //         horarios.sala = sessao.sala.id;
    //     }
    //     i++;
    // })

    // horariosArea.appendChild(salaHorarios)

    // console.log(variosHorario);



    topMenu();

    var sessaoWindow = document.getElementById("sessao-window");
    var main = document.querySelector(".content-box");
    var tempDiaSemana = document.getElementById("temp-dia-box");
    var tempHorario = document.getElementById("temp-horario");


    var salahora = document.querySelector(".sala-horas");
    console.log(salahora);

    // teste()

    pegarFilmes().then(filme => {
        filme.forEach(element => {
            var estudioBox = sessaoWindow.content.querySelector(".filme-estudio");
            var filmeBox = sessaoWindow.content.querySelector(".filme-nome");
            var posterBox = sessaoWindow.content.querySelector(".filme-poster");
            var diretorBox = sessaoWindow.content.querySelector(".diretor-nome");
            var sinopseBox = sessaoWindow.content.querySelector(".txt-sinopse");
            var generoBox = sessaoWindow.content.querySelector(".filme-genero");
            var duracaoBox = sessaoWindow.content.querySelector(".filme-duracao");
            var paisBox = sessaoWindow.content.querySelector(".filme-pais");
            var btnComprar = sessaoWindow.content.querySelector(".btn-comprar");
            var horariosArea = sessaoWindow.content.querySelector(".horarios-area");


            var diaAtivoBox = tempDiaSemana.content.querySelector(".dia-box");
            var diaNomeBox = tempDiaSemana.content.querySelector(".txt-dia-semana");
            var diaBox = tempDiaSemana.content.querySelector(".txt-dia");
            var mesBox = tempDiaSemana.content.querySelector(".txt-mes");



            var filmePego = element.filme;

            estudioBox.innerHTML = filmePego.estudio;
            filmeBox.innerHTML = filmePego.filmeNome;
            diretorBox.innerHTML = filmePego.diretor;
            sinopseBox.innerHTML = filmePego.sinopse;
            generoBox.innerHTML = filmePego.genero;
            duracaoBox.innerHTML = filmePego.duracao;
            paisBox.innerHTML = filmePego.pais;
            posterBox.innerHTML = filmePego.filmePoster;
            btnComprar.setAttribute("data-filmeid", filmePego.id);



            var cloneWindow = sessaoWindow.content.cloneNode(true);
            var diasBox = cloneWindow.querySelector(".dias-barra");



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
                diaAtivoBox.setAttribute("data-dia", thisDay.toLocaleString('pt-br', { day: '2-digit' }));
                diaNomeBox.innerHTML = diaDaSemana.replace("-feira", "").toUpperCase();
                diaBox.innerHTML = thisDay.toLocaleString('pt-br', { day: '2-digit' });
                mesBox.innerHTML = thisDay.toLocaleString('pt-br', { month: 'long' }).toUpperCase();
                thisDay.setDate(startingDay.getDate() + 1);
                diasBox.appendChild(tempDiaSemana.content.cloneNode(true));
                startingDay.setDate(thisDay.getDate());
                diaAtivo = false;
            }


            // sessoes.forEach(sessao => {
            //     if (mesmaSala.includes(sessao.sala.id) === false) {
            //         if (mesmaSala !== "") {
            //             horarioArea.appendChild(salaBox);
            //         } else {
            //             mesmaSala.push(sessao.sala.id)
            //         }
            //         salaNome.innerHTML = sessao.sala.nome;
            //         salaLingua.innerHTML = sessao.tipo.lingua;
            //         salaTipo.innerHTML = sessao.tipo.nome;
            //         hora.innerHTML = sessao.horario;
            //         horasPai.appendChild(hora);
            //     } else {
            //         hora.innerHTML = sessao.horario;
            //         horasPai.appendChild(hora);
            //     }
            // });


            main.appendChild(cloneWindow);

        })



        var testando = document.querySelector(".filme-box")
        console.log(testando)



    });


    async function teste() {
        let data = await fetch("http://localhost:8080/sessoes/pesquisa?de=2022-08-15&ate=2022-08-16");
        let jaison = await data.json();
    }

    async function pegarFilmes() {
        let x = await fetch('../components/import.json');
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

}