var ZadaciAjax = (function(){
    var konstruktor = function(callbackFn){

        var xmlBool=false;
        var jsonBool=false;
        var csvBool=false;
        return {
            dajXML:function() {
                if(xmlBool || csvBool || jsonBool) {
                    callbackFn('{greska:"Već ste uputili zahtjev"}');
                }

                xmlBool=true;

                var xml=new XMLHttpRequest();

                xml.onreadystatechange = function() {
                    if(xml.readyState==4 && xml.status==200) {
                        xmlBool=false;
                        callbackFn(xml.responseText);
                    }
                }

                xml.ontimeout = function(err) {
                    console.log("prekinuto");
                    xmlBool=false;
                }

                xml.open("GET", "http://localhost:8080/zadaci", true);
                xml.timeout=2000;
                xml.setRequestHeader('Accept', 'application/xml');
                xml.send();
            },
            dajCSV:function() {
                if(xmlBool || csvBool || jsonBool) {
                    callbackFn('{greska:"Već ste uputili zahtjev"}');
                }

                csvBool=true;

                var csv=new XMLHttpRequest();
                
                csv.onreadystatechange = function() {
                    if(csv.readyState==4 && csv.status==200) {
                        csvBool=false;
                        callbackFn(csv.responseText);
                    }
                }

                csv.ontimeout = function(err) {
                    console.log("prekinuto");
                    csvBool=false;
                }

                csv.open("GET", "http://localhost:8080/zadaci", true);
                csv.timeout=2000;
                csv.setRequestHeader('Accept', 'text/csv');
                csv.send();
            },
            dajJSON:function() {
                if(xmlBool || csvBool || jsonBool) {
                    callbackFn('{greska:"Već ste uputili zahtjev"}');
                }

                jsonBool=true;

                var json=new XMLHttpRequest();
                
                json.onreadystatechange = function() {
                    if(json.readyState==4 && json.status==200) {
                        jsonBool=false;
                        callbackFn(json.responseText);
                    }
                }

                json.ontimeout = function(err) {
                    console.log("prekinuto");
                    jsonBool=false;
                }

                json.open("GET", "http://localhost:8080/zadaci", true);
                json.timeout=2000;
                json.setRequestHeader('Accept', 'application/json');
                json.send();
            }
        }
    }
    return konstruktor;
}());