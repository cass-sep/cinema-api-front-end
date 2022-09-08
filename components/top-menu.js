export function topMenu() {
    var logo = document.createElement("a");
    logo.classList.add("top-menu-logo");

    var relatorios = document.createElement("a");
    relatorios.innerHTML = "Relatórios";
<<<<<<< Updated upstream
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
=======
    relatorios.href = "/relatorios/index.html"
    relatorios.classList.add("top-menu-btn")

    var compra = document.createElement("a");
    compra.innerHTML = "Compra";
    compra.href = "../../compra/index.html"
    compra.classList.add("top-menu-btn")
>>>>>>> Stashed changes

    var gerenciamento = document.createElement("a");
    gerenciamento.innerHTML = "Gerenciamento";
    gerenciamento.classList.add("top-menu-btn")
    gerenciamento.classList.add("top-menu-pointer")

    var drop = document.createElement("div");
    drop.classList.add("top-menu-dropdown");

<<<<<<< Updated upstream
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
        tag.href = `../../admin/${categoria.link}/`
        tag.style.textDecoration = "none";
=======
    var categorias = [{ nome: "Filmes", link: "filmes" }, { nome: "Salas", link: "salas" }, { nome: "Sessões", link: "sessoes" }, { nome: "Pessoas", link: "pessoas" }, { nome: "Tipos", link: "tipos" }, { nome: "Bilhetes", link: "bilhetes" }]
    categorias.forEach(categoria => {
        var tag = document.createElement("a");
        tag.innerHTML = categoria.nome;
        tag.href = `../../admin/${categoria.link}/index.html`
        tag.classList.add("top-menu-tag");
>>>>>>> Stashed changes

        drop.appendChild(tag)

        gerenciamento.addEventListener('mouseover', function () {
            drop.classList.add("top-menu-dropdown-atv");
        });
        gerenciamento.addEventListener('mouseout', function () {
            drop.classList.remove("top-menu-dropdown-atv");
        });
        drop.addEventListener('mouseout', function () {
            drop.classList.remove("top-menu-dropdown-atv");
        });
    })

    gerenciamento.appendChild(drop);


<<<<<<< Updated upstream
    logo.style.display = "block";
    logo.style.backgroundImage = "url(../../assets/blue.svg)";
    logo.style.backgroundRepeat = "no-repeat";
    logo.style.backgroundSize = "68px";
    logo.style.backgroundPosition = "center";
    logo.style.width = "83px";
    logo.style.height = "41px";
    logo.style.marginLeft = "25px";
    logo.href = "../../home/index.html"
=======
    logo.href = "../../home/index.html";
>>>>>>> Stashed changes

    var topMenu = document.createElement("header");
    topMenu.classList.add("top-menu")
    topMenu.appendChild(logo);
    topMenu.appendChild(relatorios);
    topMenu.appendChild(compra);
    topMenu.appendChild(gerenciamento);


    document.querySelector("body").insertBefore(topMenu, document.querySelector("body").firstChild);
}