var naziv = document.getElementsByName("naziv");
var div = document.getElementById("glavniSadrzaj");
var select0 = document.getElementById("id0");
var select1 = document.getElementById("id1");
var select2 = document.getElementById("id2");
var select3 = document.getElementById("id3");
var select4 = document.getElementById("id4");
var ajax;

function load(){
    ajax = new GodineAjaxSelect();
    ajax.selectGodine(select0);
    ajax.selectGodine(select1);
    ajax.selectVjezbe(select2);
    ajax.selectVjezbe(select3);
    ajax.selectZadaciVjezba(select4,select3);
}

function loadZadaci(){
    ajax.selectZadaciVjezba(select4,select3);
}


function posaljiZahtjev() {
    var forma=document.getElementById("id18");
    forma.action="http://localhost:8080/vjezba/"+select3.options[select3.selectedIndex].value+"/zadatak";
}


var validacija = new Validacija(div);
function validiraj(){
    
    validacija.naziv(naziv[0]);

}