const em = require('./controllers/elasticmanager');
const fs = require('fs');
var util = require('util');


var jsonerrors = { errors:[] };
var jsonimports = { imports:[] };

function onInit(){
    const ano = process.argv[2];
    const path = 'tmp/Ano-'+ano+'.json';
    const type = '_doc';
    const url = 'localhost:9200/'+ano+'/'+type+'/';
    const file = fs.readFileSync(path);
    const gastos = JSON.parse(file);
    run(ano,gastos,url,type);
}
onInit();

function run(ano,gastos,url,type){
    em.mappings(ano,response =>{
        loger(ano,'mapping',url,response);
        writeFile(ano+'-error.json',jsonerrors,url);
    },response =>{
        logsc(ano,'mapping',url,response);
        gastos.dados.forEach((gasto,index)=>{
            em.create(ano,type,index,gasto,response =>{
                loger(ano,index,url+index,response);
            },response=>{
                logsc(ano,index,url+index,response);
            });
        });
        writeFile(ano+'-imported.json',jsonimports,url);
    });
}

function loger(index,id,url,response){
    const filename = index+'-error.json';

    var error = {
        index: index
        ,id: id
        ,url: url
        ,filename: filename
        ,status:  response.statusCode
        ,headers: response.headers
        ,body: response.body
    }
    jsonerrors.errors.push(error);
    console.log(url);
}

function logsc(index,id,url,response){
    const filename = index+'-imported.json';

    var imports = {
        index: index
        ,id: id
        ,url: url
        ,filename: filename
        ,status:  response.statusCode
        ,headers: response.headers
        ,body: response.body
    }
    jsonimports.imports.push(imports);
    console.log(url);
}

function writeFile(name,json,url){
    fs.writeFile(name, JSON.stringify(json),'utf8',(err) => {
        if (err) throw err;
    });
}
