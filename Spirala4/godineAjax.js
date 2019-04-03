var GodineAjax = (function(){
    var konstruktor = function(divSadrzaj){
        var nazivGodina = [];
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState==4 && ajax.status==200){
                var godine = JSON.parse(ajax.responseText);
                console.log(godine.length);
                for(var i=0; i<godine.length; i++){
                    nazivGodina.push(godine[i].nazivGod);
                    divSadrzaj.innerHTML+="<div class=godina><p>Naziv godine: " + godine[i].nazivGod + "</p>" +
                    "<p>Naziv repozitorija: " + godine[i].nazivRepVje + "</p>" +
                    "<p>Naziv spirale: " + godine[i].nazivRepSpi + "</p>" +
                    "</div>";
                }
            }
        }
        ajax.open("GET","http://localhost:8080/godine",true);
        ajax.setRequestHeader("Content-Type","application/json");
        ajax.send();
        return {
            osvjezi:function(){
                var ajax = new XMLHttpRequest();
                ajax.onreadystatechange = function(){
                    if(ajax.readyState==4 && ajax.status==200){
                        var godine = JSON.parse(ajax.responseText);
                        console.log(godine.length);
                        for(var i=0; i<godine.length; i++){
                            var istina=false;
                            for(var j=0; j<nazivGodina.length;i++) if(nazivGodina[j]==godine[i]) istina=true;
                            if(istina==true) continue;
                            divSadrzaj.innerHTML+="<div class=godina><p>Naziv godine: " + godine[i].nazivGod + "</p>" +
                            "<p>Naziv repozitorija: " + godine[i].nazivRepVje + "</p>" +
                            "<p>Naziv spirale: " + godine[i].nazivRepSpi + "</p>" +
                            "</div>";
                        }
                    }
                }
            }
        } 
    }
    return konstruktor;
}());