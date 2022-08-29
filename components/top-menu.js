export function topMenu() {

    var topMenu = document.createElement("header");
    topMenu.style.background = "black";
    topMenu.style.height = "60px";

    document.querySelector("body").insertBefore(topMenu, document.querySelector("body").firstChild);
}