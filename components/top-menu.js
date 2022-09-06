export function topMenu() {
    var logo = document.createElement("a");
    var relatorios = document.createElement("a");
    relatorios.innerHTML = "Relatórios";
    relatorios.style.color = "#fff";
    relatorios.style.font = "var(--rubik)";
    relatorios.style.fontSize = "20px";
    relatorios.href = "/relatorios/index.html"
    relatorios.style.textDecoration = "none";
    relatorios.style.padding = "10px";

    var compra = document.createElement("a");
    compra.innerHTML = "Compra";
    compra.style.color = "#fff";
    compra.style.font = "var(--rubik)";
    compra.style.fontSize = "20px";
    compra.href = "/compra/index.html"
    compra.style.textDecoration = "none";
    compra.style.padding = "10px";

    var gerenciamento = document.createElement("a");
    gerenciamento.innerHTML = "Gerenciamento";
    gerenciamento.style.color = "#fff";
    gerenciamento.style.font = "var(--rubik)";
    gerenciamento.style.fontSize = "20px";
    gerenciamento.style.textDecoration = "none";
    gerenciamento.style.position = "relative";
    gerenciamento.style.padding = "10px";
    gerenciamento.style.cursor = "pointer";

    var drop = document.createElement("div");
    drop.style.backgroundColor = "#000";
    drop.style.display = "flex";
    drop.style.flexDirection = "column";
    drop.style.position = "absolute";
    drop.style.top = "35px";
    drop.style.display = "none";
    drop.style.padding = "10px 50px 20px 30px";
    drop.style.gap = "10px";
    drop.style.boxShadow = "0 5px 5px 0 black";

    var categorias = [
        { nome: "Filmes", link: "filmes" },
        { nome: "Salas", link: "salas" },
        { nome: "Tipos", link: "tipos" },
        { nome: "Sessões", link: "sessoes" },
        { nome: "Pessoas", link: "pessoas" },
        { nome: "Bilhetes", link: "bilhetes" }
    ]
    categorias.forEach(categoria => {
        var tag = document.createElement("a");
        tag.innerHTML = categoria.nome;
        tag.style.color = "#fff";
        tag.style.font = "var(--rubik)";
        tag.style.fontSize = "20px";
        tag.href = `/admin/${categoria.link}/`
        tag.style.textDecoration = "none";

        drop.appendChild(tag)

        gerenciamento.addEventListener('mouseover', function () {
            drop.style.display = "flex";
        });
        gerenciamento.addEventListener('mouseout', function () {
            drop.style.display = "none";
        });
        drop.addEventListener('mouseout', function () {
            drop.style.display = "none";
        });
    })

    gerenciamento.appendChild(drop);


    logo.style.display = "block";
    logo.style.backgroundImage = "url(/assets/blue.svg)";
    logo.style.backgroundRepeat = "no-repeat";
    logo.style.backgroundSize = "68px";
    logo.style.backgroundPosition = "center";
    logo.style.width = "83px";
    logo.style.height = "41px";
    logo.style.marginLeft = "25px";
    logo.href = "/home/index.html"

    var topMenu = document.createElement("header");
    topMenu.style.backgroundColor = "#000";
    topMenu.style.height = "60px";
    topMenu.style.position = "fixed";
    topMenu.style.top = "0";
    topMenu.style.width = "100%";
    topMenu.style.zIndex = "100";
    topMenu.style.display = "flex";
    topMenu.style.alignItems = "center";
    topMenu.style.gap = "6px";
    topMenu.appendChild(logo);
    topMenu.appendChild(relatorios);
    topMenu.appendChild(compra);
    topMenu.appendChild(gerenciamento);

    document.querySelector("body").style.paddingTop = "60px";

    document.querySelector("body").insertBefore(topMenu, document.querySelector("body").firstChild);
}