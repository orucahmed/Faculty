var nesto = ZadaciAjax(ispisi);

function XML(){
    nesto.dajXML();
    nesto.dajCSV();
}

function CSV(){
    nesto.dajCSV();
}

function JsON(){
    nesto.dajJSON();
}

function ispisi(a){
    console.log(a);
}