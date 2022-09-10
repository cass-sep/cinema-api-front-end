export function topMenu() {
    var logo = document.createElement("a");
    logo.classList.add("top-menu-logo");

    var relatorios = document.createElement("a");
    relatorios.innerHTML = "Relatórios";
    relatorios.href = "../relatorios/index.html"
    relatorios.classList.add("top-menu-btn")

    var compra = document.createElement("a");
    compra.innerHTML = "Compra";
    compra.href = "../compra/index.html"
    compra.classList.add("top-menu-btn")

    var gerenciamento = document.createElement("a");
    gerenciamento.innerHTML = "Gerenciamento";
    gerenciamento.classList.add("top-menu-btn")
    gerenciamento.classList.add("top-menu-pointer")

    var drop = document.createElement("div");
    drop.classList.add("top-menu-dropdown");

    var categorias = [{ nome: "Filmes", link: "filmes" }, { nome: "Salas", link: "salas" }, { nome: "Sessões", link: "sessoes" }, { nome: "Pessoas", link: "pessoas" }, { nome: "Tipos", link: "tipos" }, { nome: "Bilhetes", link: "bilhetes" }]
    categorias.forEach(categoria => {
        var tag = document.createElement("a");
        tag.innerHTML = categoria.nome;
        tag.href = `../admin/${categoria.link}/index.html`
        tag.classList.add("top-menu-tag");

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


    logo.href = "../home/index.html";

    var topMenu = document.createElement("header");
    topMenu.classList.add("top-menu")
    topMenu.appendChild(logo);
    topMenu.appendChild(relatorios);
    topMenu.appendChild(compra);
    topMenu.appendChild(gerenciamento);


    document.querySelector("body").insertBefore(topMenu, document.querySelector("body").firstChild);
}