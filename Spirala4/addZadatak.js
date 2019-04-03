var naziv = document.getElementsByName("naziv");
var div = document.getElementById("glavniSadrzaj");
var validacija = new Validacija(div);
function validiraj(){
    
    return validacija.naziv(naziv[0]);

}