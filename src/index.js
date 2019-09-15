var fs = require('fs');
var reader = require('./reader.js');
onInit();

var files = fs.readdirSync('../tmp/');
files.forEach(file => {
    file = '../tmp/'+file;
    reader.jsonReader(file, (err, object)=>{
        console.log(object);
    });
    console.log(reader.toString());
});

function onInit(){
}
