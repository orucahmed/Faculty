var naziv = document.getElementsByName("ime");
var lola = document.getElementsByName("index");
var div = document.getElementById("glavniSadrzaj");
var nazivRepVje;
var nazivRepSpi;
var godinaID;
var bitbucket;
var studenti;
var select = document.getElementById("id0");
var dugmeDodaj = document.getElementById("dodaj");

function popuniSelect(){
    var ajax = new GodineAjaxSelect();
    ajax.selectGodine(select);
}

function podaciOGodini(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(ajax.readyState==4 && ajax.status==200){
            nazivRepSpi=JSON.parse(ajax.responseText).nazivRepSpi;
            nazivRepVje=JSON.parse(ajax.responseText).nazivRepVje;
            godinaID=JSON.parse(ajax.responseText).id;
        }
    }
    ajax.open("GET", "http://localhost:8080/dajGodinu?id="+select.options[select.selectedIndex].value,false);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
}

function ispisi(greska,x){
    if(greska==null) studenti=x;
    else{
        alert(greska);
        bitbucket=null;
        dugmeDodaj.disabled=true;
    }
}

function ucitajBB(){
    if(!bitbucket) bitbucket=new BitBucket(document.getElementById("idkljuc").value,document.getElementById("idsecret").value);
    podaciOGodini();    
    bitbucket.ucitaj(nazivRepSpi,nazivRepVje,ispisi);
    dugmeDodaj.disabled=false;
}

function zahtjevPost(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(ajax.readyState==4 && ajax.status==200){
            alert(JSON.parse(ajax.responseText).poruka);
        }
    }
    var objekat = JSON.stringify({godina:godinaID,studenti:studenti});
    ajax.open("POST", "http://localhost:8080/student",false);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(objekat);
}