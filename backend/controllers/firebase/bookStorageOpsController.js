const fs = require('fs');
const admin = require('../../admin');


class BookStorageOpsController{
  constructor(){
    this.storageBucket = admin.storage().bucket();
  }

  async uploadBook(filePaths){
    try{
      const {localPath, remotePath} = filePaths;
      if (!localPath || !remotePath){
       return {error: "missing file paths"};
      }
      await this.storageBucket.upload(localPath, {
      destination: remotePath
      });
      return {status: 'file successfully uploaded'};
    }catch(error){
      return error;
    }
  }

  async downloadBook(filePaths){
    try{
      const {localPath, remotePath} = filePaths;
      if (!localPath || !remotePath){
        return {error: "missing file paths"};
      }
      const file = this.storageBucket.file(remotePath);
      file.createReadStream().
      on('error', (error) => {
        console.log(error);
        return error;
      }).on('end', ()=>{
      return {'status': 'file downloaded successfully'};
      }).pipe(fs.createWriteStream(localPath));
    }catch(error){
      return error;
    }
  }

  async deleteBook(filePaths){
    try{
      const {localPath, remotePath} = filePaths;
      if (!localPath || !remotePath){
        return {error: "missing file paths"};
      }
      const file = this.storageBucket.file(remotePath);
      await file.delete();
      return {'status': 'file deleted'};
    }catch(error){
      return error;
    }
  }
}

module.exports = BookStorageOpsController;
