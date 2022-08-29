import { topMenu } from '../components/top-menu.js';

window.onload = function () {
    topMenu();

    var sessaoWindow = document.getElementsByTagName("template")[0];
    var main = document.querySelector(".content-box");

    var cloneWindow = sessaoWindow.content.cloneNode(true);
    var cloneWindow2 = sessaoWindow.content.cloneNode(true);

    main.appendChild(cloneWindow);
    main.appendChild(cloneWindow2);
}