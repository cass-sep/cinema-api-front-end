export function horariosArea() {
    var innerData = "<div class=*horarios-area*><div class=*horas-bg*></div> <div class=*salas-box prim-sb*></div> <div class=*salas-box*> <div class=*sala-titulo*> <div class=*sala-nome*>SALA 1</div> <div class=*sala-lingua leg*>LEG</div> </div> <div class=*sala-horas*> <div class=*hora*>16:00</div> <div class=*hora*>18:00</div> <div class=*hora*>20:00</div> </div> </div> <div class=*salas-box*> <div class=*sala-titulo*> <div class=*sala-nome*>SALA 3</div> <div class=*sala-lingua dub*>DUB</div><img class=*sala-tipo* src=*/assets/3D.png* alt=**> </div> <div class=*sala-horas*> <div class=*hora*>16:00</div> <div class=*hora*>18:00</div> <div class=*hora*>20:00</div> </div> </div> <div class=*salas-box*> <div class=*sala-titulo*> <div class=*sala-nome*></div> <div class=*sala-lingua dub*>DUB</div> </div> <div class=*sala-horas*> <div class=*hora*>16:00</div> <div class=*hora*>18:00</div> <div class=*hora*>20:00</div> </div> </div> </div>"
    var aspas = '"';
    var array = innerData.split("*");
    innerData = array.join(aspas);
    return innerData;
}