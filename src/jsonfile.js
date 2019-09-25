const em = require('./controllers/elasticmanager');
const fs = require('fs');
var util = require('util');


var jsonerrors = { errors:[] };
var jsonimports = { imports:[] };

const files = fs.readdirSync('tmp/');

run();

async function run(){
    for(var j=0; j < files.length; j++){
        const path = 'tmp/';
        const gastos = JSON.parse(fs.readFileSync(path + files[j]));
        const ano = files[j].split('-')[1].split('.')[0];
        for(var i=0; i < Object.keys(gastos.dados).length; i++){
            await em.run(ano,gastos.dados.slice(i,i+=5000));
        }
    }
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

async function writeFile(name,json){
    return new Promise((resolve,reject)=>{
        fs.writeFile(name, JSON.stringify(json),'utf8',(err) => {
            if (err) throw err;
        });
    });
}
