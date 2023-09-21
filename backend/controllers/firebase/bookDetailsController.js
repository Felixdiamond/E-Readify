const dotenv = require('dotenv');
const axios = require('axios');
const authController = require('../express/authController');


dotenv.config();


class BookDetailsController{
  constructor(){
    this.BASEURL = process.env.DATABASE_URL;
    this.userController = authController;
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
      const myBooks = await axios.get(`${this.BASEURL}/books/${userId}.json`);
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
    const {title, description, addedDate, imagePreviewUrl, author, rating, genres, pages, localPath} = bookDetails;
    if (!title || !description || !addedDate || !rating || !author || !genres || !pages || !localPath || !imagePreviewUrl){
      return {error: 'incomplete book information'};
    }
    try{
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
      return bookDetails.data;
    }
    catch(error){
      return error;
    }
  }

  async editBookInfo(bookInfo, userId, bookId){
    if (!bookInfo || !userId || !bookId){
        return {error: 'bad request'};
      }
      const {title, description, addedDate, author, rating, genres, pages, localPath} = bookInfo;
      if (!title || !description || !addedDate || !rating || !author || !genres || !pages || !localPath){
        return {error: 'missing book information'};
      }
      try{
        const response = await axios.put(`${this.BASEURL}/books/${userId}/${bookId}.json`, bookInfo);
        return response.data;
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

  async postUserFavorites(userId, favorites){
    if (!userId || !favorites){
      return {error: 'missing parameters'};
    }
    try{
      const response = await axios.post(`${this.BASEURL}/favorites/${userId}.json`, favorites);
      return {id: response.data.name, status: response.status, text: response.statusText};
    }catch(error){
      return error;
    }
  }

  async editUserFavorites(userId, favId, favorites){
    if (!userId || !favorites || !favId){
      return {error: 'missing parameters'};
    }
    try{
      const response = await axios.put(`${this.BASEURL}/favorites/${userId}/${favId}.json`, favorites);
      return response.data;
    }catch(error){
      return error;
    }
  }

  async getUserFavorites(userId){
    if (!userId){
      return {error: 'missing parameters'};
    }
    try{
      const response = await axios.get(`${this.BASEURL}/favorites/${userId}.json`);
      return response.data;
    }catch(error){
      return error;
    }
  }

  async deleteUserFavorites(userId){
    if (!userId){
      return {error: 'missing parameters'};
    }
    try{
      await axios.delete(`${this.BASEURL}/favorites/${userId}.json`);
      return {status: 'favorites deleted'};
    }catch(error){
      return error;
    }
  }
}


module.exports = BookDetailsController;
