const fs = require('fs');
const readline = require('readline');
const iso = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const path = require('path');
var config = require('../config/globalConf');
const APP_KEY = config.token;
var mongoose = require('mongoose');
var Config = require ('../model/config');

 function getAPI(){

    try{

        console.log('trying to get API');
        let config =  Config.find({});
        console.log(config.db.collection('Config'));
    }
    catch(error){
        return Error('error while trying to find investor ' + error.message);
    }
}

exports.getFileList = async function () {
    getAPI();
    let dbx = new Dropbox({ accessToken: APP_KEY });
        let res = await dbx.filesListFolder({path: ''})
        .then(function(response) {
            return response;
        })
        .catch(function(error) {
            console.log(error);
        });


    return res;
}

exports.uploadFile =  async function (name,data,cb) {

    fs.writeFile(name, data, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
            uploadFile(name,data,cb);
        }
    });

          } ;
async function  uploadFile(name,fileCont,cb) {
    console.log(fileCont);
         let dbx =  new Dropbox({ accessToken: APP_KEY });
         await dbx.filesUpload({ path: '/'+name, contents: fileCont })
         .then(function (response) {
           cb(response);
         })
        .catch(function (err) {
             console.log(err);
         });
}

exports.downloadFile =async function (filename,cb)
{
    console.log('Download - Service');
    let dbx =  new Dropbox({ accessToken: APP_KEY });
    let args ={path:'/basic3.txt'};
    await dbx.filesDownload(args)
        .then((data)=>{
            console.log(data);
            fs.writeFile(data.name, data.fileBinary, {encoding: 'binary'}, (error) => {
                            if (error) {
                                throw error;
                            }
                            console.log('File: ' + data.name + ' saved');
                        })
        })
        .catch((error)=>{
            console.log(error);
            throw error;
        })
}