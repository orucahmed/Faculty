var GodineAjaxSelect = (function(){
    var konstruktor = function(){
        var  brojac=0;
        return{
            selectGodine: function(select){
                var ajaxGodine = new XMLHttpRequest();
                ajaxGodine.onreadystatechange = function(){
                    if(ajaxGodine.readyState==4 && ajaxGodine.status==200){
                        var niz = JSON.parse(ajaxGodine.responseText);
                        for(var i=0; i<niz.length; i++) {
                            select.innerHTML+="<option value="+niz[i].id+">"+niz[i].nazivGod+"</option>";
                        }
                    }
                }
                ajaxGodine.open("GET", "http://localhost:8080/godineSaID",true);
                ajaxGodine.setRequestHeader('Content-Type', 'application/json');
                ajaxGodine.send();
            },

            selectVjezbe: function(select){
                brojac++;
                var ajaxVjezbe = new XMLHttpRequest();
                ajaxVjezbe.onreadystatechange = function(){
                    if(ajaxVjezbe.readyState==4 && ajaxVjezbe.status==200){
                        var niz = JSON.parse(ajaxVjezbe.responseText);
                        for(var i=0; i<niz.length; i++) {
                            select.innerHTML+="<option value="+niz[i].id+">"+niz[i].naziv+"</option>";
                        }
                    }
                }
                var istina=true;
                if(brojac<=2) istina=false;
                ajaxVjezbe.open("GET", "http://localhost:8080/vjezbeSaID",istina);
                ajaxVjezbe.setRequestHeader('Content-Type', 'application/json');
                ajaxVjezbe.send();
            },

            selectZadaci: function(select){
                var ajaxZadaci = new XMLHttpRequest();
                ajaxZadaci.onreadystatechange = function(){
                    if(ajaxZadaci.readyState==4 && ajaxZadaci.status==200){
                        var niz = JSON.parse(ajaxZadaci.responseText);
                        for(var i=0; i<niz.length; i++) {
                            select.innerHTML+="<option value="+niz[i].id+">"+niz[i].naziv+"</option>";
                            
                        }
                    }
                }
                ajaxZadaci.open("GET", "http://localhost:8080/zadaciSaID",true);
                ajaxZadaci.setRequestHeader('Content-Type', 'applicaton/json');
                ajaxZadaci.send("vjezba="+select1.options[select1.selectedIndex].text);
            },


            selectZadaciVjezba: function(select, select1) {
                var ajaxZadaci=new XMLHttpRequest();

                ajaxZadaci.onreadystatechange = function() {
                    if(ajaxZadaci.readyState==4 && ajaxZadaci.status==200) {
                        //primamo response u JSON formatu, možemo dobiti
                        //objekte koristeći JSON.parse
                        let niz=JSON.parse(ajaxZadaci.responseText);

                        select.innerHTML="";
                        for(let i=0; i<niz.length; i++) {
                            select.innerHTML+="<option value="+niz[i].id+">"+niz[i].naziv+"</option>";
                        }
                    }
                }

                ajaxZadaci.open("POST", "http://localhost:8080/zadaciBezVjezbe", true);
                ajaxZadaci.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                ajaxZadaci.send("vjezba="+select1.options[select1.selectedIndex].text);
            }
        }
    }
    return konstruktor;
    
}())