const fs = require('fs');
const admin = require('../../admin');


class StorageOpsController{
  constructor(){
    this.storageBucket = admin.storage().bucket();
  }

  async uploadBook(filePaths){
    const {localPath, remotePath} = filePaths;
    if (!localPath || !remotePath){
      return {error: "missing file paths"};
    }
    await this.storageBucket.upload(localPath, {
      destination: remotePath
    }).then((response) => {
      return response;
    }).catch((error)=> {
      return error;
    });
  }

  async downloadBook(filePaths){
    const {localPath, remotePath} = filePaths;
    if (!localPath || !remotePath){
      return {error: "missing file paths"};
    }
    const file = this.storageBucket.file(remotePath);
    file.createReadStream().
    on('error', (error) => {
      return error;
    }).on('end', ()=>{
      return {'status': 'file downloaded successfully'};
    }).pipe(fs.createWriteStream(localPath));
  }

  async deleteBook(filePaths){
    const {localPath, remotePath} = filePaths;
    if (!localPath || !remotePath){
      return {error: "missing file paths"};
    }
    const file = this.storageBucket.file(remotePath);
    await file.delete().
    then(() => {
      return {'status': 'file deleted'};
    }).catch((error) => {
      return error;
    })
  }
}

module.exports = StorageOpsController;
