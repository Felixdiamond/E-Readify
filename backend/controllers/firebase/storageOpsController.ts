const fs = require('fs');
const admin = require('../../admin');
const {Readable} = require('stream');


class BookStorageOpsController{
  private storageBucket: any;

  constructor(){
    this.storageBucket = admin.storage().bucket();
  }

  async uploadBook(filePaths: 
    { 
      localPath: string, 
      remotePath: string 
    }): Promise<{ status: string, response: string} | { error: any }>{
    try{
      const {localPath, remotePath} = filePaths;
      if (!localPath || !remotePath){
       return {error: "missing file paths"};
      }
      if (
        typeof localPath !== "string" ||
        typeof remotePath !== "string"
      ){
        return {error: "file paths must be strings"};
      }
      console.log(remotePath, localPath);
      const response = await this.storageBucket.upload(localPath, {
      destination: remotePath
      });
      return {status: 'file successfully uploaded', response: response.name};
    }catch(error: any){
      return error;
    }
  }

  async downloadBook(filePaths: { 
    localPath: string, 
    remotePath: string 
  }){
    try{
      const {localPath, remotePath} = filePaths;
      if (!localPath || !remotePath){
        return {error: "missing file paths"};
      }
      if (
        typeof localPath !== "string" ||
        typeof remotePath !== "string"
      ){
        return {error: "file paths must be strings"};
      }
      const file = this.storageBucket.file(remotePath);
      if (!file){
        return {error: 'file not found'};
      }
      const resp = file.createReadStream().
      on('error', ( error: any ) => {
        return error;
      }).on('end', ()=>{
      return {status: 'file downloaded successfully'};
      }).pipe(fs.createWriteStream(localPath));
      return resp;
    }catch(error: any){
      return error;
    }
  }

  async readBook(remotePath: string){
    try{
      if (!remotePath){
        return {error: 'missing file path'};
      }
      if (typeof remotePath !== "string"){
        return {error: "remote file path must be a string"};
      }
      const file = await this.storageBucket.file(remotePath);
      if (!file){
        return {error: 'file not found'};
      }
      const stream = await file.createReadStream();
      const chunks: any[] = [];
      const resp = await new Promise((resolve, reject) => {
        stream.on('data', (chunk: any) => {
          chunks.push(chunk);
        });
  
        stream.on('end', () => {
          const content = Buffer.concat(chunks).toString('utf8');
          resolve({ status: 'OK', content });
        });
  
        stream.on('error', (error: any) => {
          reject({ error: 'Error reading file' });
        });
      });
      return resp;
    }catch(error: any){
      return error;
    }
  }

  async deleteBook(remotePath: string): Promise<{ status: string } | { error: any }>{
    try{
      if (!remotePath){
        return {error: "missing file paths"};
      }
      const file = this.storageBucket.file(remotePath);
      if (!file){
        return {error: 'file not found'};
      }
      await file.delete();
      return {status: 'file deleted'};
    }catch(error: any){
      return error;
    }
  }

  async deleteFolder(remoteFolder: string):
  Promise<{ status: string } | { error: any }> {
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
    }catch(error: any){
      return error;
    }
  }
}

module.exports = BookStorageOpsController;
