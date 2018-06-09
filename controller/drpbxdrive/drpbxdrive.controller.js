var goolgeDriveService = require('../../services/drpbxdrive.service');
const fs = require('fs');
var formidable = require('formidable');

_this=this;

exports.getFileList =  async function getFilesList(req,res,next){
    console.log('inside getFiles controller');
    try {

        let files =  await goolgeDriveService.getFileList();
        return res.status(200).json({success:true,data:files,message:'list of files recived'});
    }
    catch (exception){
        return res.status(400).json({success:false,data:{},message:exception.message});
    }
};


exports.uploadFile =  async function uploadFile(req,res,next){

    const data = req.body;

     // var form = new formidable.IncomingForm();
     //
     //  form.parse(req.body);

    //  form.on('fileBegin', function (name, file){
    //      console.log('Here');
    //      console.log(file.name)
    //      file.path = __dirname + '/uploads/' + file.name;
    //  });
    //
    //  form.on('file', function (name, file){
    //      console.log('Uploaded ' + file.name);
    //  });
            console.log(req.body);
          goolgeDriveService.uploadFile('excelNewTransactions.xlsx',data,function(success) {
              return res.status(200).json({success: true, data: success, message: 'file was saved successfully'});
          })
          .catch((error)=>{
              return res.status(400).json({success: false, data: {}, message: error.message});
          })
};

exports.downloadFile = async function downloadFile(req,res,next){
            console.log('Download - controller');
            goolgeDriveService.downloadFile('text.text',function(success) {
             return res.status(200).json({success: true, data: success, message: 'file downloaded successfully'});
         })
        .catch((error)=>{
            return res.status(400).json({success: false, data: {}, message: error.message});
        })
}