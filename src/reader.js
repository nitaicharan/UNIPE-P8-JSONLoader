/*
 * https://medium.com/@osiolabs/read-write-json-files-with-node-js-92d03cc82824
 */
const fs = require('fs')

function jsonReader(path, cb){
  fs.readFile(require.resolve(path), (err, data) => {
    if (err)
      cb(err)
    else
      cb(null, JSON.parse(data))
  })
};

jsonReader('../tmp/Ano-2018.json',(err, data) => {
    if(err) console.log('Erro: '+err);
    else{
        console.log(data);
    }
});
