var BitBucket = (function(){
    var konstruktor = function(key, secret){
        var token  = new Promise(function(resolve,reject){
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {
                if(ajax.readyState == 4 && ajax.status == 200) {
                    resolve(ajax.responseText);
                }
                if(ajax.readyState == 4 && ajax.status != 200) {
                    reject(ajax.responseText);
                }
            }
            ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("Authorization", 'Basic ' + window.btoa(key+':'+secret));
            ajax.send("grant_type="+encodeURIComponent("client_credentials"));
        })
        return{
            ucitaj: function(nazivRepSpi, nazivRepVje, callback){
                token.then(function(rezultat){
                    var ajax = new XMLHttpRequest();
                    var studenti = [];
                    ajax.onreadystatechange = function(){
                        if(ajax.readyState==4 && ajax.status==200){
                            var repo =  JSON.parse(ajax.responseText).values;
                            for(var i=0; i<repo.length; i++){
                                var ponavljanje = true;
                                var index=repo[i].name.substring(repo[i].name.length-5);
                                for(var j=0; j<studenti.length;j++){
                                    if(studenti[j].index==index){
                                        ponavljanje=false;
                                        break;
                                    }
                                }
                                if(ponavljanje==true) studenti.push({imePrezime:repo[i].owner.display_name,index:index});
                            }
                            callback(null,studenti);
                        }
                        if(ajax.readyState==4 && ajax.status!=200) {
                            callback(JSON.parse(ajax.responseText).error_description,null);
                        } 
                    }
                    ajax.open("GET", "https://api.bitbucket.org/2.0/repositories/?role=member&q=name+%7E+%22"+nazivRepSpi+"%22+OR+name+%7E+%22"+nazivRepVje+"%22",false);
                    ajax.setRequestHeader("Authorization", 'Bearer '+JSON.parse(rezultat).access_token);
                    ajax.send();
                }).catch(function(err){
                    callback(JSON.parse(err).error_description,null);
                })
            }
        }
    }
    return konstruktor;
}())
