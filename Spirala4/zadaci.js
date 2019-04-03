var div = document.getElementById("student");
var ime = document.getElementsByName("query");
var validacija = new Validacija(div);

function validiraj(){
    
    validacija.ime(ime[0]);
}