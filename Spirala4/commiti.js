var mojDiv;
var tabela;
var validacija ;
var broj;

function kreiraj(){
    mojDiv=document.getElementById("tabela");
    var brojRedova = document.getElementById("kreiranjeTabele");
    broj=brojRedova.value;
    var labela = document.getElementById("mojaMalaLabela");
    
    if(brojRedova.value<=0) brojRedova.style.backgroundColor="orangered";
    else {
        brojRedova.style.backgroundColor="white";
        document.getElementById("kreiranje").disabled=true;
    }
    tabela = new CommitTabela(mojDiv, brojRedova.value);
    validacija= new Validacija(mojDiv);
    
}

function dodaj(){
    
    var brCommita = document.getElementById("commit1");
    if(brCommita.value<0 || brCommita.value>broj-1) brCommita.style.backgroundColor="orangered";
    else brCommita.style.backgroundColor="white";
    var link = document.getElementById("link1");  
    validacija.url(link);
    if(brCommita.style.backgroundColor=="white" && link.style.backgroundColor=="white") {
        tabela.dodajCommit(Number(brCommita.value),link.value);
    }  


}

function edituj(){
    var brCommita = document.getElementById("commit2");
    var link = document.getElementById("link2");
    var brReda = document.getElementById("red1");
    tabela.editujCommit(Number(brReda.value),Number(brCommita.value),link.value);
    
}

function obrisi(){
    var brCommita = document.getElementById("commit3");
    var brReda = document.getElementById("red2");
    tabela.obrisiCommit(Number(brReda.value),Number(brCommita.value));

}
