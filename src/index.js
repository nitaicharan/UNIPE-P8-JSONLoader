"use strict";

//import * as fs from 'fs';
//import {jsonReader} from 'lib/reader.mjs';
//import {join} from 'path';

const fs = require('fs');
const reader = require('readjson');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const files = fs.readdirSync('tmp/');

files.forEach(file => {
    var path = 'tmp/'+ file;
    reader(path, (err, object)=>{
        run(object, file).catch(console.log)
    });
});


async function run(object, name){
    name = name.split('.',1)
    name = name[0].split('-',2)
    name = name[1];
    await client.bulk({
        index: 'gastos',
        type: '_doc',
        id: name,
        body: object
    });

    const { body } = await client.get({
        index: 'gastos',
        id: '1'
    })
    //console.log(body)
}
