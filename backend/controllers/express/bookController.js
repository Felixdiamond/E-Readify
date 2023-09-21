const storageOpsController = require('../firebase/storageOpsController');
const bookDetailsController = require('../firebase/bookDetailsController');
const encodeImage = require('../../utils/imageProcessor');


class BookController{
  constructor(){
    this.storage = new storageOpsController();
    this.preStorage = new bookDetailsController();
  }

  async getBook(bookPaths){
    book = await this.storage.downloadBook(bookPaths);
    return book;
  }

  async postBook(bookDetails, userId){
    const imagePath = bookDetails.imagePreviewUrl;
    bookDetails.imagePreviewUrl = encodeImage(imagePath);
    const resp = await this.preStorage.uploadBookInfo(bookDetails, userId);
    if (resp.error){
      return {error: 'upload failed'};
    }
    const remotePath = `pdfs/${userId}/${resp.id}/${bookDetails.localPath}`;
    const paths = {
      localPath: bookDetails.localPath,
      remotePath
    }
    const response = await this.storage.uploadBook(paths);
    return {pdfDetails: response, pdfInfo: resp, remotePath};
  }

  async deleteBook(bookId, userId, remotePath){
    await this.preStorage.deleteBookInfo(userId, bookId);
    await this.storage.deleteBook(remotePath);
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
