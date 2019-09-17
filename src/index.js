"use strict";

//import * as fs from 'fs';
//import {jsonReader} from 'lib/reader.mjs';
//import {join} from 'path';

const fs = require('fs');
const reader = require('readjson');


onInit();

var files = fs.readdirSync('tmp/');

files.forEach(file => {
    var objects = new Array();
    file = 'tmp/'+file;
    reader(file, (err, object)=>{
        objects.push(object);
    });
});

function onInit(){
}
