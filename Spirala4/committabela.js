var CommitTabela=(function(){ 
        var div;
        var id_tabele="commiti";
        var konstruktor=function(divElement,brojZadataka){ 

        
        if(brojZadataka>0){
            div=divElement;
            var temp="<table id="+id_tabele+">";
            temp+="<tr><th>Zadaci</th><th>Commiti</th></tr>";
            for(var i=1;i<=brojZadataka;i++){
                var pom="<tr><td>Zadatak " + i + "</td><td></td></tr>";
                temp+=pom;
            }
            temp+="</table>";
            div.innerHTML+=temp;
        }
        


        return{
            dodajCommit:function(rbZadatka,url){
                var maxCelija=0;
                var t=document.getElementById(id_tabele);
                var brojcelija=1;

                for(var k=1;k<t.rows[rbZadatka+1].cells.length;k++) if(t.rows[rbZadatka+1].cells[k].innerHTML!='') brojcelija++;
                
                var elementiCelije = [];
                for(var i=1;i<brojcelija;i++){
                    if(t.rows[rbZadatka+1].cells[i].textContent==="") continue;
                    elementiCelije.push(t.rows[rbZadatka+1].cells[i].textContent);
                }

                t.deleteRow(rbZadatka+1);
                var red = t.insertRow(rbZadatka+1);
                var naziv = "Zadatak " + (rbZadatka+1);
                var celija1 = red.insertCell(0);
                celija1.innerHTML = naziv;

                for(var i=0;i<elementiCelije.length;i++){
                    var celija = red.insertCell(i+1);
                    celija.innerHTML = "<a href="+url+">"+elementiCelije[i]+"</a>";
                }

                var celija = red.insertCell(elementiCelije.length+1);
                if(elementiCelije.length==0) celija.innerHTML = "<a href="+url+">"+1+"</a>";
                else celija.innerHTML = "<a href="+url+">"+(Number(elementiCelije[elementiCelije.length-1])+1)+"</a>";
                console.log(elementiCelije);

                for(var i=1;i<t.rows.length;i++){
                    if(t.rows[i].cells.length>maxCelija) maxCelija=t.rows[i].cells.length;
                }
                
                t.rows[0].cells[1].colSpan=maxCelija;
                
                for(var i=1;i<t.rows.length;i++){
                    var brojcelija1;
                    if(t.rows[i].cells[1].innerHTML===''){
                        brojcelija1=1;
                    }
                    else brojcelija1=t.rows[i].cells.length;
                    
                    if(brojcelija1<maxCelija){
                        if(t.rows[i].cells[1].innerHTML==='') t.rows[i].cells[1].colSpan=maxCelija-brojcelija1;
                        else if(t.rows[i].cells[brojcelija1-1].innerHTML!=''){
                            var celija=t.rows[i].insertCell(brojcelija1);
                            t.rows[i].cells[brojcelija1].colSpan=maxCelija-brojcelija1+1;
                        }
                        else {
                            t.rows[i].cells[brojcelija1-1].colSpan=maxCelija-brojcelija1+1;
                        }
                    }
                }
            }, 
            editujCommit:function(rbZadatka,rbCommita,url){
                var t=document.getElementById("commiti");
                if(rbZadatka<0 || rbZadatka>t.rows.length-2) return -1;
                if(rbCommita<0 || rbCommita>t.rows[rbZadatka+1].cells.length-2) {
                    return -1;
                }
                t.rows[rbZadatka+1].cells[rbCommita+1].innerHTML="<a href="+String(url)+">"+(rbCommita+1)+"</a>";
                console.log(t.rows[rbZadatka+1].cells[rbCommita+1].innerHTML);
            }, 
            obrisiCommit:function(rbZadatka,rbCommita){
                var t=document.getElementById("commiti");
                if(rbZadatka<0 || rbZadatka>t.rows.length-2) return -1;
                if(rbCommita<0 || rbCommita>t.rows[rbZadatka+1].cells.length-2) {
                    return -1;
                }
                
                for(var i=rbCommita+1;i<t.rows[rbZadatka+1].cells.length-1;i++) t.rows[rbZadatka+1].cells[i].innerHTML=t.rows[rbZadatka+1].cells[i+1].innerHTML;
                t.rows[rbZadatka+1].cells[t.rows[rbZadatka+1].cells.length-1].innerHTML="";
                
                var maxCelija=0;
                
                var brojcelija=1;

                for(var k=1;k<t.rows[rbZadatka+1].cells.length;k++) if(t.rows[rbZadatka+1].cells[k].innerHTML!='') brojcelija++;
                
                var elementiCelije = [];
                for(var i=1;i<brojcelija;i++){
                    if(t.rows[rbZadatka+1].cells[i].textContent==="") continue;
                    elementiCelije.push(t.rows[rbZadatka+1].cells[i].textContent);
                }
                if(elementiCelije.length===0) elementiCelije.push("");
                t.deleteRow(rbZadatka+1);
                var red = t.insertRow(rbZadatka+1);
                var naziv = "Zadatak " + (rbZadatka+1);
                var celija1 = red.insertCell(0);
                celija1.innerHTML = naziv;

                for(var i=0;i<elementiCelije.length;i++){
                    var celija = red.insertCell(i+1);
                    if(elementiCelije[0]==="") celija.innerHTML = "";
                    else celija.innerHTML = elementiCelije[i];
                }
                for(var i=1;i<t.rows.length;i++){
                    if(t.rows[i].cells.length>maxCelija) maxCelija=t.rows[i].cells.length;
                }
                t.rows[0].cells[1].colSpan=maxCelija;
                for(var i=1; i<t.rows.length; i++){
                    var brojcelija1= t.rows[i].cells.length;
                    console.log(i+" "+brojcelija1);
                    if(brojcelija1===2){
                        if(t.rows[i].cells[1].innerHTML!=""){
                            var celija=t.rows[i].insertCell(brojcelija1);
                            celija.innerHTML="";
                            t.rows[i].cells[brojcelija1].colSpan=maxCelija-brojcelija1+1;
                        }
                        else t.rows[i].cells[1].colSpan=maxCelija-1;
                    }
                    else if(brojcelija1<maxCelija){
                        if(t.rows[i].cells[brojcelija1-1].innerHTML!=""){
                            var celija=t.rows[i].insertCell(brojcelija1);
                            celija.innerHTML="";
                            t.rows[i].cells[brojcelija1].colSpan=maxCelija-brojcelija1+1;
                        }
                        else{
                            t.rows[i].cells[brojcelija1-1].colSpan=maxCelija-brojcelija1+1;
                        }
                    }
                }
                for(var i=1;i<t.rows.length;i++){
                    if(t.rows[i].cells.length>maxCelija) maxCelija=t.rows[i].cells.length;
                }
                var istina=true;
                for(var i=1; i<t.rows.length; i++){
                    var brojcelija1= t.rows[i].cells.length;
                    if(brojcelija1===maxCelija){
                        for(var j=1; j<t.rows.length; j++){
                            if(t.rows[i].cells[brojcelija1-1].innerHTML!="" && brojcelija1===maxCelija) istina=false;
                        }
                    }
                }
                if(istina){
                    for(var i=1; i<t.rows.length; i++){
                        var brojcelija1= t.rows[i].cells.length;
                        if(brojcelija1===maxCelija){
                            t.rows[i].deleteCell(brojcelija1-1);
                        }
                    }
                }
                var istina1 = true
                for(var i=1; i<t.rows.length; i++){
                    var brojcelija1= t.rows[i].cells.length;
                    if(brojcelija1!=1) istina1=false;
                }
                if(istina1){
                    for(var i=1; i<t.rows.length; i++){
                        var celija=t.rows[i].insertCell(1);
                        celija.innerHTML="";
                        t.rows[i].cells[brojcelija1].colSpan=1;
                    }
                }
            }
        } 
    }
    return konstruktor;
}());


