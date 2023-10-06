const storageOpsController = require('../firebase/storageOpsController');
const bookDetailsController = require('../firebase/bookDetailsController');
const cloudinary = require('../../utils/imageProcessor');


class BookController{
  constructor(){
    this.storage = new storageOpsController();
    this.preStorage = new bookDetailsController();
  }

  async getBook(bookPaths){
    book = await this.storage.downloadBook(bookPaths);
    return book;
  }

  async readBook(remotepath){
    const contentJson = await this.storage.readBook(remotepath);
    return contentJson;
  }

  async postBook(bookDetails, userId){
    // const imagePath = bookDetails.imagePreviewUrl;
    const localPathCopy = bookDetails.localPath;
    const path = bookDetails.localPath.split('/');
    const trimmedPath = path[path.length - 1];
    bookDetails.localPath = trimmedPath;
    // const previewUrl = await cloudinary.uploader.upload(imagePath,
    //   {
    //     public_id: `${userId}/${trimmedPath}`
    //   },
    //   (error, result)=>{
    //   if (error){
    //     return null;
    //   }
    //   return result;
    // });
    // bookDetails.imagePreviewUrl = previewUrl.url.toString();
    const resp = await this.preStorage.uploadBookInfo(bookDetails, userId);
    if (resp.error){
      return {error: 'upload failed'};
    }
    const remotePath = `pdfs/${userId}/${resp.id}/${bookDetails.localPath}`;
    const paths = {
      localPath: localPathCopy,
      remotePath
    };
    const response = await this.storage.uploadBook(paths);
    return {pdfDetails: response, pdfInfo: resp, remotePath};
  }

  async deleteBook(bookId, userId, remotePath){
    await this.preStorage.deleteBookInfo(userId, bookId);
    await this.storage.deleteBook(remotePath);
    return {status: 'deleted'};
  }

  async deleteAllUserBooks(remoteFolder){
    await this.storage.deleteFolder(remoteFolder);
    const userId = remoteFolder.split('/')[1];
    await this.preStorage.deleteAllUserBooksInfo(userId);
    return {status: 'deleted'};
  }

  async editFavorites(userId, favId, favorites){
    const response = await this.preStorage.editUserFavorites(userId, favId, favorites);
    return response;
  }

  async getFavorites(userId){
    const response = await this.preStorage.getUserFavorites(userId);
    return response;
  }

  async deleteFavorites(userId){
    const response = await this.preStorage.deleteUserFavorites(userId);
    return response;
  }
}

module.exports = BookController;
