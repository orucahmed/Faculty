var Validacija=(function(){ 
    var imeBool=true;
    var nazivBool=true;
    var godinaBool=true;
    var repoBool=true;
    var indexBool=true;
    var passwordBool=true;
    var urlBool=true;
    var konstruktor=function(divElementPoruke){ 
    
    paragraf=document.createElement("p");
    divElementPoruke.appendChild(paragraf);
    
    return{
            ime:function(inputElement){ 
                var trazeno=inputElement.value;
                var istina=true;
                var brSpace=0;
                var brCrta=0;
                if(trazeno.length===0) istina=false;
                for(var i=0;i<trazeno.length;i++){
                    if(trazeno.charAt(i)===" ") brSpace++;
                    if(trazeno.charAt(i)==="-") brCrta++;
                }
                if(brCrta+brSpace>3) istina=false;
                var stariIndex=-1;
                for(var i=0;i<4;i++){
                    if(trazeno.length===0) break;
                    var indexSpace=trazeno.indexOf(" ");
                    var indexCrta=trazeno.indexOf("-");
                    var index;
                    if(indexSpace<indexCrta && indexSpace>0 && indexCrta>0) index=indexSpace;
                    else if(indexSpace>indexCrta && indexSpace>0 && indexCrta>0) index=indexCrta;
                    else if(indexSpace<0 && indexCrta>0) index=indexCrta;
                    else if(indexSpace>0 && indexCrta<0) index=indexSpace;
                    else index=trazeno.length;
                    var pom=trazeno.substr(0,index);
                    trazeno=trazeno.replace(pom,"");
                    trazeno=trazeno.substr(1,trazeno.length);
                    if(pom.length<2) istina=false;
                    var istina1=false;
                    for(var j=65; j<=90;j++) if(pom.charAt(0)===String.fromCharCode(j)) istina1=true;
                    if(!istina1) istina=false;
                    for(var j=1;j<pom.length;j++){
                        var istina2=false;
                        for(var t=97; t<=122;t++) {
                            if(pom.charAt(j)=="'") istina2=true;
                            if(pom.charAt(j)===String.fromCharCode(t)) istina2=true;
                        }
                        for(var t=65; t<=90;t++) {
                            if(pom.charAt(j)=="'") istina2=true;
                            if(pom.charAt(j)===String.fromCharCode(t)) istina2=true;
                        }
                        if(!istina2) istina=false;
                    }
                    for(var j=1;j<pom.length-1;j++)if(pom.charAt(j)==="'" && pom.charAt(j+1)==="'") istina=false;
                }
                
                if(!istina) {
                    inputElement.style.backgroundColor="orangered";
                    imeBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:ime";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    imeBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
                return istina;
                
            }, 
            godina:function(inputElement){ 
                var trazeno=inputElement.value;
                var godina = /20\d\d\/20\d\d/;            
                var istina = godina.test(trazeno);
                if(trazeno.length!=9) istina=false;
                var str1 = trazeno.substring(2,4);
                var str2 = trazeno.substring(7,9);
                if(Number(str1)!=Number(str2)-1) istina=false;
                if(!istina) {
                    inputElement.style.backgroundColor="orangered";
                    godinaBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:godina";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    godinaBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
                return istina;
            }, 
            repozitorij:function(inputElement,regex){
                var trazeno=inputElement.value;
                var istina = regex.test(trazeno);
                if(!istina) {
                    inputElement.style.backgroundColor="orangered";
                    repoBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:repozitorij";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    repoBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    i++;
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
                return istina;
            }, 
            index:function(inputElement){ 
                
                var trazeno=inputElement.value;
                var index = /\d\d\d\d\d/;
                var pom = String(trazeno);
                var istina = index.test(pom);
                if (pom.length!=5) istina = false;
                pom = pom.substring(0,2);  
                var pom1 = false;
                for(var i=14;i<=20;i++) if(pom===String(i)) pom1=true;
                if(!pom1) istina=false;
                if(!istina) {
                    inputElement.style.backgroundColor="orangered";
                    indexBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:index";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    indexBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
                return istina;
                
            }, 
            naziv:function(inputElement){ 
                var trazeno=inputElement.value;
                var prvoSlovo = trazeno.substring(0,1);
                var istina=false;
                for(var i=65; i<=90;i++) if(prvoSlovo===String.fromCharCode(i)) istina=true;
                for(var i=97; i<=122;i++) if(prvoSlovo===String.fromCharCode(i)) istina=true;
                if(trazeno.length<3) istina=false;
                var zadnjeSlovo = trazeno.substring(trazeno.length-1,trazeno.length);
                var istina1 = false;
                for(var i=97; i<=122;i++) if(zadnjeSlovo===String.fromCharCode(i)) istina1=true;
                for(var i=48; i<=57;i++) if(zadnjeSlovo===String.fromCharCode(i)) istina1=true;
                if(!istina1) istina=false;
                for(var i=1;i<trazeno.length-1;i++){
                    var temp = trazeno.charAt(i);
                    var istina1 = false;
                    for(var j=97; j<=122;j++) if(temp===String.fromCharCode(j)) istina1=true;
                    for(var j=48; j<=57;j++) if(temp===String.fromCharCode(j)) istina1=true;
                    for(var j=65; j<=90;j++) if(temp===String.fromCharCode(j)) istina1=true;
                    if(temp==="\\") istina1=true; 
                    else if(temp==="/") istina1=true;
                    else if(temp==="-") istina1=true;
                    else if(temp==='"') istina1=true; 
                    else if(temp==="'") istina1=true;
                    else if(temp==="!") istina1=true;
                    else if(temp==="?") istina1=true;
                    else if(temp===":") istina1=true;
                    else if(temp===";") istina1=true;
                    else if(temp===",") istina1=true;
                    if(!istina1){
                        istina=false;
                        break;
                    }
                
                }
                if(!istina) {
                    inputElement.style.backgroundColor="orangered";
                    nazivBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:naziv";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    nazivBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }  
                
                return istina;
                

            },
            password:function(inputElement){
                var trazeno=inputElement.value;
                var istina=false;
                if(trazeno.length>=8) istina=true;
                var brojMalih=0;
                var brojVelikih=0;
                var brojBrojeva=0;
                for(var i=0; i<trazeno.length;i++){
                    var temp = trazeno.charAt(i);
                    for(var j=97; j<=122;j++) if(temp===String.fromCharCode(j)) brojMalih++;
                    for(var j=48; j<=57;j++) if(temp===String.fromCharCode(j)) brojBrojeva++;
                    for(var j=65; j<=90;j++) if(temp===String.fromCharCode(j)) brojVelikih++;
                }
                if(brojBrojeva+brojMalih+brojVelikih!=trazeno.length) istina=false;
                var istina1=false;
                if(brojMalih>0 && brojBrojeva>0) istina1=true;
                else if(brojMalih>0 && brojVelikih>0) istina1=true;
                else if(brojBrojeva>0 && brojVelikih>0) istina1=true;
                if(!istina1) istina=false;
                if(!istina) {
                    inputElement.style.backgroundColor="orangered";
                    passwordBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:password";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    passwordBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!imeBool) paragraf.textContent+=",ime";
                    if(!urlBool) paragraf.textContent+="url";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
                return istina;
            }, 
            url:function(inputElement){ 
                var trazeno=inputElement.value;
                var url=/^(http|https|ftp|ssh)\:\/\/([a-z0-9]+([-]*[a-z0-9]+)*(\.[a-z0-9]+([-]*[a-z0-9]+)*)*)+(\/[a-z0-9]+([-]*[a-z0-9]+)*)*(\?([a-z0-9]+([-]*[a-z0-9]+)*\=[a-z0-9]+([-]*[a-z0-9]+)(\&[a-z0-9]+([-]*[a-z0-9]+)*\=[a-z0-9]+([-]*[a-z0-9]+)*)*)+)*$/
                var istina=url.test(trazeno);
                
                if(!istina) {
                    inputElement.style.backgroundColor="orangered";
                    urlBool=false;
                    paragraf.textContent="Sljedeća polja nisu validna:url";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!imeBool) paragraf.textContent+="ime";
                    paragraf.textContent+="!";
                }
                else {
                    inputElement.style.backgroundColor="white";
                    urlBool=true;
                    paragraf.textContent="Sljedeća polja nisu validna:";
                    if(!nazivBool) paragraf.textContent+=",naziv";
                    if(!godinaBool) paragraf.textContent+=",godina";
                    if(!repoBool) paragraf.textContent+=",repozitorij";
                    if(!indexBool) paragraf.textContent+=",index";
                    if(!passwordBool) paragraf.textContent+=",password";
                    if(!imeBool) paragraf.textContent+="ime";
                    paragraf.textContent+="!";
                    var i=paragraf.textContent.indexOf(":");
                    if(paragraf.textContent.charAt(i+1)=="!") paragraf.textContent="";
                    else {
                        paragraf.textContent=paragraf.textContent.substring(0,i)+paragraf.textContent.substring(i+1,paragraf.textContent.length);
                    }
                }
                return istina;
            }
        } 

    }
return konstruktor; 
}());
