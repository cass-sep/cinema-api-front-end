export function topMenu() {
    var logo = document.createElement("a");
    var relatorios = document.createElement("a");
    relatorios.innerHTML = "Relatórios";
    relatorios.style.color = "#fff";
    relatorios.style.font = "var(--rubik)";
    relatorios.style.fontSize = "20px";
    relatorios.href = "../relatorios/index.html"
    relatorios.style.textDecoration = "none";

    var compra = document.createElement("a");
    compra.innerHTML = "Compra";
    compra.style.color = "#fff";
    compra.style.font = "var(--rubik)";
    compra.style.fontSize = "20px";
    compra.href = "../compra/index.html"
    compra.style.textDecoration = "none";

    // element {
    //     display: block;
    //     background - image: url("../assets/blue.svg");
    //     background - repeat: no - repeat;
    //     background - size: 80px;
    //     width: 80px;
    //     height: 39px;
    //     margin - left: 25px;
    // }

    logo.style.display = "block";
    logo.style.backgroundImage = "url(../assets/blue.svg)";
    logo.style.backgroundRepeat = "no-repeat";
    logo.style.backgroundSize = "80px";
    logo.style.width = "80px";
    logo.style.height = "39px";
    logo.style.marginLeft = "25px";
    logo.href = "../home/index.html"

    var topMenu = document.createElement("header");
    topMenu.style.backgroundColor = "#000";
    topMenu.style.height = "60px";
    topMenu.style.position = "fixed";
    topMenu.style.top = "0";
    topMenu.style.width = "100%";
    topMenu.style.zIndex = "100";
    topMenu.style.display = "flex";
    topMenu.style.alignItems = "center";
    topMenu.style.gap = "30px";
    topMenu.appendChild(logo);
    topMenu.appendChild(relatorios);
    topMenu.appendChild(compra);

    document.querySelector("body").style.paddingTop = "60px";

    document.querySelector("body").insertBefore(topMenu, document.querySelector("body").firstChild);
}