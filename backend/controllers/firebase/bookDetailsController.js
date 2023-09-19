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
      const booksObject = await axios.get(`${this.BASEURL}/books.json`);
      return booksObject.data;
    }catch(error){
      return error;
    }
  }

  async getAllUserBooksInfo(userId){
    if (!userId){
      return {error: 'missing user_id'};
    }
    try{
      const myBooks = await axios.get(`${this.BASEURL}/books/${this.userId}.json`);
      console.log(myBooks.data)
      return myBooks.data;
    }catch(error){
      return error;
    }
  }

  async deleteAllUserBooksInfo(userId){
    if(!userId){
      return {error: 'missing user_id'};
    }
    try{
      await axios.delete(`${this.BASEURL}/books/${userId}.json`);
      return {status: 'infos deleted'};
    }catch(error){
      return error;
    }
  }

  async uploadBookInfo(bookDetails, userId){
    if (!bookDetails || !userId){
      return {error: 'bad request'};
    }
    const {title, description, addedDate, author, rating, genres, pages, localPath} = bookDetails;
    if (!title || !description || !addedDate || !rating || !author || !genres || !pages || !localPath){
      return {error: 'incomplete book information'};
    }
    try{
      // console.log(`${this.BASEURL}/books/${userId}/`);
      const response = await axios.post(`${this.BASEURL}/books/${userId}.json`, bookDetails);
      return {id: response.data.name, status: response.status, text: response.statusText};
    }catch(error){
      return error;
    }
  }

  async getBookInfo(userId, bookId){
    if (!userId || !bookId){
      return {error: 'missing user_id or book_id'};
    }
    try{
      const bookDetails = await axios.get(`${this.BASEURL}/books/${userId}/${bookId}.json`);
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
        const response = await axios.put(`${this.BASEURL}/books/${userId}/${this.bookId}.json`, bookInfo);
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
      await axios.delete(`${this.BASEURL}/books/${userId}/${bookId}.json`);
      return {status: 'info deleted'};
    }catch(error){
      return error
    }
  }
}


module.exports = BookDetailsController;
