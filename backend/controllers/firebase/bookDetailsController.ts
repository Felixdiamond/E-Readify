const dotenv = require('dotenv');
const axios = require('axios');
const authController = require('../express/authController');


dotenv.config();


class BookDetailsController{
  private BASEURL: string;
  private userController: any;

  constructor(){
    this.BASEURL = process.env.DATABASE_URL || "defaultUrl";
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

  async getAllUserBooksInfo(userId: string):Promise< any | {error: any}>{
    if (!userId){
      return {error: 'missing user_id'};
    }
    if (typeof userId !== "string"){
      return {error: 'id must be a string'};
    }
    try{
      const myBooks = await axios.get(`${this.BASEURL}/books/${userId}.json`);
      return myBooks.data;
    }catch(error: any){
      return error;
    }
  }

  async deleteAllUserBooksInfo(userId: string): Promise<{status: string} | {error: any}>{
    if(!userId){
      return {error: 'missing user_id'};
    }
    if (typeof userId !== "string"){
      return {error: 'id must be a string'};
    }
    try{
      await axios.delete(`${this.BASEURL}/books/${userId}.json`);
      return {status: 'infos deleted'};
    }catch(error: any){
      return error;
    }
  }

  async uploadBookInfo(bookDetails: {
    title: string,
    description: string,
    addedDate: string,
    imagePreviewUrl: string,
    author: string,
    rating: number,
    genres: string[],
    pages: number,
    localPath: string
  }, userId: string): Promise<{
    id: string,
    status: string,
    text: string
  } | {error: any}> {
    if (!bookDetails || !userId){
      return {error: 'bad request'};
    }
    const {title, description, addedDate, imagePreviewUrl, author, rating, genres, pages, localPath} = bookDetails;
    if (!title || !description || !addedDate || !rating || !author || !genres || !pages || !localPath || !imagePreviewUrl){
      return {error: 'incomplete book information'};
    }
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof addedDate !== "string" ||
      typeof imagePreviewUrl !== "string" ||
      typeof author !== "string" ||
      typeof rating !== "number" ||
      typeof pages !== "number" ||
      genres.length === 0 ||
      typeof localPath !== "string"
    ){
      return {error: "invalid parameters for book details"};
    }
    try{
      const response = await axios.post(`${this.BASEURL}/books/${userId}.json`, bookDetails);
      return {id: response.data.name, status: response.status, text: response.statusText};
    }catch(error: any){
      return error;
    }
  }

  async getBookInfo(userId: string, bookId: string):
  Promise< any | {error: any}>{
    if (!userId || !bookId){
      return {error: 'missing user_id or book_id'};
    }
    if (
      typeof userId !== "string" ||
      typeof bookId !== "string"
    ){
      return {error: "user id or book id must be a string"};
    }
    try{
      const bookDetails = await axios.get(`${this.BASEURL}/books/${userId}/${bookId}.json`);
      return bookDetails.data;
    }
    catch(error: any){
      return error;
    }
  }

  async editBookInfo(bookInfo: {
    title: string,
    description: string,
    addedDate: string,
    imagePreviewUrl: string,
    author: string,
    rating: number,
    genres: string[],
    pages: number,
    localPath: string
  }, userId: string, bookId: string):
  Promise< any | {error: any}>{
    if (!bookInfo || !userId || !bookId){
        return {error: 'bad request'};
      }
      const {title, description, addedDate, imagePreviewUrl, author, rating, genres, pages, localPath} = bookInfo;
      if (!title || !description || !addedDate || imagePreviewUrl || !rating || !author || !genres || !pages || !localPath){
        return {error: 'missing book information'};
      }
      if (
        typeof title !== "string" ||
        typeof description !== "string" ||
        typeof addedDate !== "string" ||
        typeof imagePreviewUrl !== "string" ||
        typeof author !== "string" ||
        typeof rating !== "number" ||
        typeof pages !== "number" ||
        typeof localPath !== "string" ||
        genres.length === 0 ||
        typeof userId !== "string" ||
        typeof bookId !== "string"
      ){
        return {error: "invalid parameters for book details"};
      }
      try{
        const response = await axios.put(`${this.BASEURL}/books/${userId}/${bookId}.json`, bookInfo);
        return response.data;
      }catch(error: any){
        return error;
      }
  }

  async deleteBookInfo(userId: string, bookId: string):
  Promise<{status: string} | {error: any}>{
    if (!userId || !bookId){
      return {error: 'missing user_id or book_id'};
    }
    if (
      typeof userId !== "string" ||
      typeof bookId !== "string"
    ){
      return {error: "user id or book id must be a string"};
    }
    try{
      await axios.delete(`${this.BASEURL}/books/${userId}/${bookId}.json`);
      return {status: 'info deleted'};
    }catch(error: any){
      return error
    }
  }

  async postUserFavorites(userId: string, favorites: string[]):
  Promise<{
    id: string,
    status: string,
    text: string
  } | {error: any}>{
    if (!userId || !favorites){
      return {error: 'missing parameters'};
    }
    if (typeof userId !== "string"){
      return {error: 'user id must be a string'};
    }
    try{
      const response = await axios.post(`${this.BASEURL}/favorites/${userId}.json`, favorites);
      return {id: response.data.name, status: response.status, text: response.statusText};
    }catch(error: any){
      return error;
    }
  }

  async editUserFavorites(userId: string, favId: string, favorites: string[]):
  Promise< any | {error: any}>
  {
    if (!userId || !favorites || !favId)
    {
      return {error: 'missing parameters'};
    }
    if (
      typeof userId !== "string" ||
      typeof favId !== "string"
    ){
      return {error: "favorite id or user id must be a string"};
    }
    try{
      const response = await axios.put(`${this.BASEURL}/favorites/${userId}/${favId}.json`, favorites);
      return response.data;
    }catch(error){
      return error;
    }
  }

  async getUserFavorites(userId: string): Promise< any | {error: any}>{
    if (!userId){
      return {error: 'missing parameters'};
    }
    if (typeof userId !== "string"){
      return {error: "user id must be a string"};
    }
    try{
      const response = await axios.get(`${this.BASEURL}/favorites/${userId}.json`);
      return response.data;
    }catch(error){
      return error;
    }
  }

  async deleteUserFavorites(userId: string): Promise< {status: string} | {error: any}>{
    if (!userId){
      return {error: 'missing parameters'};
    }
    if (typeof userId !== "string"){
      return {error: "user id must be a string"};
    }
    try{
      await axios.delete(`${this.BASEURL}/favorites/${userId}.json`);
      return {status: 'favorites deleted'};
    }catch(error: any){
      return error;
    }
  }
}


module.exports = BookDetailsController;
