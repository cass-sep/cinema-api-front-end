export function diasArea() {
    var innerData = "<div class=*barra-dias-bg*></div><div class=*titulo-dias*> <h3= class=*txt-titulo-dias*>DIA</h3=> </div> <div class=*dias-barra*> <div class=*dia-box*> <div class=*dia-box-bg*> <p class=*txt-dia*>26</p> <p class=*txt-mes*>AGOSTO</p> </div> </div> <div class=*dia-box db-atv*> <div class=*dia-box-bg*> <p class=*td-atv*>27</p> <p class=*tm-atv*>AGOSTO</p> </div> </div> <div class=*dia-box*> <div class=*dia-box-bg*> <p class=*txt-dia*>28</p> <p class=*txt-mes*>AGOSTO</p> </div> </div> <div class=*dia-box*> <div class=*dia-box-bg*> <p class=*txt-dia*>29</p> <p class=*txt-mes*>AGOSTO</p> </div> </div> </div>"
    var aspas = '"';
    var array = innerData.split("*");
    innerData = array.join(aspas);
    return innerData;
}