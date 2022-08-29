export function botoesArea() {
    var innerData = "<div class=,btn-saibamais,><p class=,txt-saiba-mais,>SAIBA MAIS</p></div ><div class=,btn-comprar,><p class=,txt-comprar,>COMPRAR INGRESSO</p></div>"
    var aspas = '"';
    var array = innerData.split(",");
    innerData = array.join(aspas);
    return innerData;
}