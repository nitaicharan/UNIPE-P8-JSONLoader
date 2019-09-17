"use strict";

//import * as fs from 'fs';
//import {jsonReader} from 'lib/reader.mjs';
//import {join} from 'path';

const fs = require('fs');
const reader = require('readjson');


onInit();

var files = fs.readdirSync('tmp/');

files.forEach(file => {
    file = 'tmp/'+file;
    reader(file, (err, object)=>{
        console.log(object);
    });
});

function onInit(){
}
