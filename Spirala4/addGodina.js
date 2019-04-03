var lolo = document.getElementsByName("nazivGod");
var vjezbe = document.getElementsByName("nazivRepVje");
var spirale = document.getElementsByName("nazivRepSpi");
var div = document.getElementById("side");
var validacija = new Validacija(div);
function validiraj(){
    return (validacija.godina(lolo[0]) && validacija.naziv(vjezbe[0]) && validacija.naziv(spirale[0]));
}

function load(){
    var id = document.getElementById("glavniSadrzaj");
    var nesto = new GodineAjax(id);
    nesto.osvjezi();
}