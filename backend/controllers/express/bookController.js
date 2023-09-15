const storageOpsController = require('../firebase/bookStorageOpsController');


class BookController{
  constructor(){
    this.storage = new storageOpsController();
  }

  async getBook(bookPaths){
    const book = await this.storage.downloadBook(bookPaths);
    return book;
  }

  async postBook(bookPaths){
    const response = await this.storage.uploadBook(bookPaths);
    return response;
  }

  async deleteBook(bookPaths){
    const response = await this.storage.deleteBook(bookPaths);
    return response;
  }
}

module.exports = BookController;
