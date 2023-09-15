const dotenv = require('dotenv');
const axios = require('axios');
const authController = require('../express/authController');


dotenv.config();


class BookDetailsController{
  constructor(){
    this.BASEURL = process.env.DATABASE_URL;
    this.userController = new authController();
  }

  async getAllBooksInfo(){
    try {
      const booksObject = await axios.get(`${this.BASEURL}`);
      return booksObject;
    }catch(error){
      return error;
    }
  }

  async getAllUserBooksInfo(userId){
    if (!userId){
      return {error: 'missing user_id'};
    }
    try{
      const myBooks = await axios.get(`${this.BASEURL}/${this.userId}`);
      return myBooks;
    }catch(error){
      return error;
    }
  }

  async deleteAllUserBooksInfo(userId){
    if(!userId){
      return {error: 'missing user_id'};
    }
    try{
      await axios.delete(`${this.BASEURL}/${userId}`);
      return {status: 'infos deleted'};
    }catch(error){
      return error;
    }
  }

  async uploadBookInfo(bookInfo, userId){
    if (!bookInfo || !userId){
      return {error: 'bad request'};
    }
    const {title, description, addedDate, author, rating, genres, pages, localPath, remotePath} = bookInfo;
    if (!title || !description || !addedDate || !rating || !author || !genres || !pages || !localPath || !remotePath){
      return {error: 'incomplete book information'};
    }
    try{
      const response = await axios.post(`${this.BASEURL}/${userId}`, bookInfo);
      return response;
    }catch(error){
      return error;
    }
  }

  async getBookInfo(userId, bookId){
    if (!userId || !bookId){
      return {error: 'missing user_id or book_id'};
    }
    try{
      const bookDetails = await axios.get(`${this.BASEURL}/${userId}/${bookId}`);
      return bookDetails;
    }
    catch(error){
      return error;
    }
  }

  async editBookInfo(bookInfo, userId, bookId){
    if (!bookInfo || !userId || !bookId){
        return {error: 'bad request'};
      }
      const {title, description, addedDate, author, rating, genres, pages, localPath, remotePath} = bookInfo;
      if (!title || !description || !addedDate || !rating || !author || !genres || !pages || !localPath || !remotePath){
        return {error: 'missing book information'};
      }
      try{
        const response = await axios.put(`${this.BASEURL}/${userId}/${this.bookId}`, bookInfo);
        return response;
      }catch(error){
        return error;
      }
  }

  async deleteBookInfo(userId, bookId){
    if (!userId || !bookId){
      return {error: 'missing user_id or book_id'};
    }
    try{
      await axios.delete(`${this.BASEURL}/${userId}/${bookId}`);
      return {status: 'info deleted'};
    }catch(error){
      return error
    }
  }
}