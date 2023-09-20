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
      const response = await this.storageBucket.upload(localPath, {
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
      if (!file){
        return {error: 'file not found'};
      }
      file.createReadStream().
      on('error', (error) => {
        console.log(error);
        return error;
      }).on('end', ()=>{
      return {status: 'file downloaded successfully'};
      }).pipe(fs.createWriteStream(localPath));
    }catch(error){
      return error;
    }
  }

  async deleteBook(remotePath){
    try{
      if (!remotePath){
        return {error: "missing file paths"};
      }
      const file = this.storageBucket.file(remotePath);
      if (!file){
        return {error: 'file not found'};
      }
      await file.delete();
      return {'status': 'file deleted'};
    }catch(error){
      return error;
    }
  }

  async deleteFolder(remoteFolder){
    try{
      if (!remoteFolder){
        return {error: 'missing file folder'}
      }
      const [files] = await this.storageBucket.getFiles({ prefix: remoteFolder });
      const deletePromises = [];

      for (const file of files) {
        deletePromises.push(file.delete());
      }
      await Promise.all(deletePromises);
      await this.storageBucket.deleteFiles({ prefix: remoteFolder });
      return {status: 'folder deleted'};
    }catch(error){
      return error;
    }
  }
}

module.exports = BookStorageOpsController;
