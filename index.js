const express = require('express');
const Sequelize = require('sequelize');
const db = require('./Spirala4/modeli/db.js');
db.sequelize.sync();
//db.sequelize.sync({force:true});
const bodyParser = require('body-parser');
var fs = require('fs');
const app = express();
app.use(express.static('Spirala4'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const multer = require('multer');
const upload = multer({dest:__dirname+"/"});

app.get('/zadatak',function(req,res){
    db.zadatak.findOne({
        where:{
            naziv:req.param('naziv')
        }
    }).then(function(rezultat){
        res.sendFile(__dirname+'/Spirala4/Zadaci/'+rezultat.naziv+'/'+rezultat.naziv+'.pdf');
    }).catch(function(err){
        res.sendFile(__dirname+'/Spirala4/greska.html');
    })
})

app.post('/addZadatak', upload.single('postavka'), function(req, res, next) {
    var naziv = req.param('naziv');
    if(fs.existsSync(__dirname+"/Spirala4/Zadaci/"+naziv) || req.file.mimetype!='application/pdf'){
        fs.unlink(__dirname+"/"+req.file.filename, function(err){
            if(err) throw err;
        })
        res.sendFile(__dirname+'/Spirala4/greska.html');
        return;
    }
    fs.mkdirSync(__dirname+"/Spirala4/Zadaci/"+naziv);
    fs.renameSync(__dirname+"/"+req.file.filename,__dirname+"/Spirala4/Zadaci/"+naziv+"/"+naziv+".pdf", function(err){
        if(err) throw err;
    })
    var json = '{"naziv":"'+naziv+'","postavka":"/Spirala4/Zadaci/'+naziv+'/'+naziv+'.pdf"}';

    db.zadatak.create({
        naziv:naziv,
        postavka: "http://localhost:8080/Spirala4/Zadaci/"+naziv+"/"+naziv+".pdf"

    }).then(function(zadatak){
        res.send(json);
    }).catch(function(err){
        res.send(err);
    })

})

app.post('/addGodina', function(req,res){
    var nazivGodine = req.param('nazivGod');
    var nazivVjezve = req.param('nazivRepVje');
    var nazivSpirale = req.param('nazivRepSpi');

    db.godina.create({
        nazivGod:nazivGodine,
        nazivRepSpi:nazivSpirale,
        nazivRepVje:nazivVjezve
    }).then(function(rezultat){
        res.sendFile(__dirname+'/Spirala4/addGodina.html');
    }).catch(function(err){
        res.sendFile(__dirname+'/Spirala4/greska.html');
    })
    
})

app.get('/godine',function(req,res){
    
    db.godina.findAll().then(function(rezultat){

        var niz = [];
        for(var i =0; i<rezultat.length; i++){
            var objekat={nazivGod:rezultat[i].nazivGod,nazivRepVje:rezultat[i].nazivRepVje,nazivRepSpi:rezultat[i].nazivRepSpi};
            niz.push(objekat);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));
    })
})


app.get('/godineSaID',function(req,res){
    
    db.godina.findAll().then(function(rezultat){

        var niz = [];
        for(var i =0; i<rezultat.length; i++){
            var objekat={id:rezultat[i].id,nazivGod:rezultat[i].nazivGod,nazivRepVje:rezultat[i].nazivRepVje,nazivRepSpi:rezultat[i].nazivRepSpi};
            niz.push(objekat);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));
    })
})


app.get('/vjezbe',function(req,res){
    
    db.vjezba.findAll().then(function(rezultat){

        var niz = [];
        for(var i =0; i<rezultat.length; i++){
            var objekat={naziv:rezultat[i].naziv,spirala:rezultat[i].spirala};
            niz.push(objekat);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));
    })
})


app.get('/vjezbeSaID',function(req,res){
    
    db.vjezba.findAll().then(function(rezultat){

        var niz = [];
        for(var i =0; i<rezultat.length; i++){
            var objekat={id:rezultat[i].id,naziv:rezultat[i].naziv,spirala:rezultat[i].spirala};
            niz.push(objekat);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));
    })
})

app.get('/zadaci', function(req,res){
    db.zadatak.findAll().then(function(rezultat){

        if(req.accepts('application/json')){
            var nizJSON = [];
            for(var i=0; i<rezultat.length; i++){
                var objekat = {naziv:rezultat[i].naziv,postavka:rezultat[i].postavka};
                nizJSON.push(objekat);
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(nizJSON));
        }
        else if(req.accepts('application/xml')){
            res.writeHead(200, {'Content-Type': 'application/xml'});
            res.write('<?xml version="1.0" encoding="UTF-8"?>');
            res.write('\n'+'<zadaci>' + '\n');
            for(var i=0; i<rezultat.length; i++){
                res.write('\t'+'<zadatak>'+'\n\t\t' + '<naziv> ' + rezultat[i].naziv + ' </naziv>' + '\n\t\t' + '<postavka >' + rezultat[i].postavka + ' </postavka>' + '\n\t' + '</zadatak>' + '\n');
            }
            res.write('</zadaci>');
            res.end();
        }
        else if(req.accepts('text/csv')){
            res.writeHead(200, {'Content-Type': 'text/csv'});
            for(var i=0; i<rezultat.length; i++){
                res.write(rezultat[i].naziv+','+rezultat[i].postavka+'\n');
            }
            res.end();
        }
    })
})

app.get('/zadaciSaID', function(req,res){
    db.zadatak.findAll().then(function(rezultat){
        if(req.accepts('application/json')){
            var nizJSON = [];
            for(var i=0; i<rezultat.length; i++){
                var objekat={id:rezultat[i].id,naziv:rezultat[i].naziv,postavka:rezultat[i].postavka};
                nizJSON.push(objekat);
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(nizJSON));
        }
    })
})






app.post('/addVjezba', function(req,res){
    if(req.param('naziv')){
        var spirala = false;
        if(req.param('spirala')) spirala=true;

        console.log('\n\n');
        console.log(req.param('sGodine'));
        console.log('\n\n');


        db.godina.findOne({where:{id:req.param('sGodine')}
        }).then(function(rezultat){
            db.vjezba.create({
                naziv: req.param('naziv'),
                spirala: spirala
            }).then(function(rezultat1){
                rezultat1.addGodine([rezultat.id]);
                rezultat.addVjezbe([rezultat1.id]);
                res.sendFile(__dirname+'/Spirala4/addVjezba.html');
            }).catch(function(err){
                console.log(err);
                res.sendFile(__dirname+'/Spirala4/greska.html');
            })
        }).catch(function(err){
            console.log(err);
            res.sendFile(__dirname+'/Spirala4/greska.html');
        })

    }
    else{


        db.godina.findOne({where:{id:req.param('sGodine')}
        }).then(function(rezultat){
            db.vjezba.findOne({where:{id:req.param('sVjezbe')}
            }).then(function(rezultat1){
                rezultat1.addGodine([rezultat.id]);
                rezultat.addVjezbe([rezultat1.id]);
                res.sendFile(__dirname+'/Spirala4/addVjezba.html');
            }).catch(function(err){
                res.sendFile(__dirname+'/Spirala4/greska.html');
            })
        }).catch(function(err){
            res.sendFile(__dirname+'/Spirala4/greska.html');
        })
    }
    
})

app.post('/vjezba/:idVjezbe/zadatak', function(req,res){
    db.vjezba.findOne({where:{id:req.param('idVjezbe')}
    }).then(function(rezultat){
        db.zadatak.findOne({where:{id:req.param('sZadatak')}
        }).then(function(rezultat1){
            rezultat1.addVjezbe([rezultat.id]);
            rezultat.addZadaci([rezultat1.id]);
            res.sendFile(__dirname+'/Spirala4/addVjezba.html');
            return res.redirect('http://localhost:8080/addVjezba.html');
        }).catch(function(err){
            console.log(err);
            return res.redirect('http://localhost:8080/addVjezba.html');
        })
    }).catch(function(err){
        console.log(err);
        return res.redirect('http://localhost:8080/addVjezba.html');
    })
})


app.post('/zadaciBezVjezbe', function(req,res){



    db.vjezba.findOne({where: {naziv: req.param('vjezba')}
    }).then(function(rezultat){
        db.zadatak.findAll().then(function(rezultat1){
            rezultat.getZadaci().then(function(rezultat2){
                for(var i=0; i<rezultat1.length; i++){
                    for(var j=0; j<rezultat2.length;j++){
                        if(rezultat1[i].id==rezultat2[j].id) rezultat1.splice(i,1);
                    }
                }
                var nizJSON = [];
                for(var i=0; i<rezultat1.length; i++){
                    var objekat={id:rezultat1[i].id,naziv:rezultat1[i].naziv,postavka:rezultat1[i].postavka};
                    nizJSON.push(objekat);
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(nizJSON));
            }).catch(function(err){
                console.log(err);
                res.sendFile(__dirname+'/Spirala4/greska.html');
            })
        }).catch(function(err){
            console.log(err);
            res.sendFile(__dirname+'/Spirala4/greska.html');
        })
    }).catch(function(err){
        console.log(err);
        res.sendFile(__dirname+'/Spirala4/greska.html');
    })
})


app.get('/dajGodinu', function(req,res){
    db.godina.findOne({where:{id:req.param('id')}
    }).then(function(rezultat){
        var objekat={id:rezultat.id,nazivGod:rezultat.nazivGod,nazivRepVje:rezultat.nazivRepVje,nazivRepSpi:rezultat.nazivRepSpi};
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(objekat));
    }).catch(function(err){
        console.log(err);
        res.sendFile(__dirname+'/Spirala4/greska.html');
    })
})

app.post('/student', function(req,res){
    var studenti=req.param('studenti');
    var n=0;
    var m=0;
    db.student.findAll().then(function(rezultat){
        for(var i=0; i<studenti.length; i++){
            var imaGaUBazi=false;
            for(var j=0; j<rezultat.length; i++){
                if(studenti[i].index==rezultat[j].index){
                    imaGaUBazi=true;
                    break;
                }
            }
            if(imaGaUBazi==true){
                db.student.findOne({where:{index:studenti[i].index}
                }).then(function(rezultat1){
                    rezultat1.update({studentGod:req.param('godina')})
                })
                m++;
            }
            else{
                db.student.create({
                    imePrezime: studenti[i].imePrezime,
                    index: studenti[i].index,
                    studentGod:req.param('godina')
                })
                n++
            }
        }
        db.godina.findOne({where:{id:req.param('godina')}
        }).then(function(rezultat2){
            var objekat={poruka:"Dodano je "+ n +" novih studenata i upisano "+ m +" na godinu "+rezultat2.nazivGod};
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(objekat));
        }).catch(function(err){
            console.log(err);
            res.sendFile(__dirname+'/Spirala4/greska.html');
        })

    }).catch(function(err){
        console.log(err);
        res.sendFile(__dirname+'/Spirala4/greska.html');
    })
})


app.listen(8080);