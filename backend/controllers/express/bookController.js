const storageOpsController = require('../firebase/bookStorageOpsController');
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

  async postBook(bookDetails, userId){
    const resp = await this.preStorage.uploadBookInfo(bookDetails, userId);
    const remotePath = `pdfs/${userId}/${resp.id}/${bookDetails.localPath}`;
    const paths = {
      localPath: bookDetails.localPath,
      remotePath
    }
    const response = await this.storage.uploadBook(paths);
    return {pdfDetails: response, pdfInfo: resp, remotePath};
  }

  async deleteBook(bookId, userId, remotePath){
    const resp = await this.preStorage.deleteBookInfo(userId, bookId);
    const response = await this.storage.deleteBook(remotePath);
    return {bookInfo: resp, fileInfo: response};
  }
}

module.exports = BookController;
