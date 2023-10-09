const storageOpsController = require('../firebase/storageOpsController');
const bookDetailsController = require('../firebase/bookDetailsController');


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
    const localPathCopy = bookDetails.localPath;
    const path = bookDetails.localPath.split('/');
    const trimmedPath = path[path.length - 1];
    bookDetails.localPath = trimmedPath;
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

  async getFavorites(userId){
    const response = await this.preStorage.getUserFavorites(userId);
    return response;
  }

  async deleteFavorite(userId, favId){
    const response = await this.preStorage.deleteUserFavorite(userId, favId);
    return response;
  }

  async deleteFavorites(userId){
    const response = await this.preStorage.deleteUserFavorites(userId);
    return response;
  }

  async postFavorite(userId, favorites){
    const response = await this.preStorage.postUserFavorites(userId, favorites);
    return response;
  }
}

module.exports = BookController;
