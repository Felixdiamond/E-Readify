"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dotenv = require('dotenv');
const axios = require('axios');
const authController = require('../express/authController');
dotenv.config();
class BookDetailsController {
    constructor() {
        this.BASEURL = process.env.DATABASE_URL || "defaultUrl";
        this.userController = authController;
    }
    getAllBooksInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booksObject = yield axios.get(`${this.BASEURL}/books.json`);
                return booksObject.data;
            }
            catch (error) {
                return error;
            }
        });
    }
    getAllUserBooksInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                return { error: 'missing user_id' };
            }
            if (typeof userId !== "string") {
                return { error: 'id must be a string' };
            }
            try {
                const myBooks = yield axios.get(`${this.BASEURL}/books/${userId}.json`);
                return myBooks.data;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteAllUserBooksInfo(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                return { error: 'missing user_id' };
            }
            if (typeof userId !== "string") {
                return { error: 'id must be a string' };
            }
            try {
                yield axios.delete(`${this.BASEURL}/books/${userId}.json`);
                return { status: 'infos deleted' };
            }
            catch (error) {
                return error;
            }
        });
    }
    uploadBookInfo(bookDetails, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bookDetails || !userId) {
                return { error: 'bad request' };
            }
            const { title, description, addedDate, imagePreviewUrl, author, rating, genres, pages, localPath } = bookDetails;
            if (!title || !description || !addedDate || !rating || !author || !genres || !pages || !localPath || !imagePreviewUrl) {
                return { error: 'incomplete book information' };
            }
            if (typeof title !== "string" ||
                typeof description !== "string" ||
                typeof addedDate !== "string" ||
                typeof imagePreviewUrl !== "string" ||
                typeof author !== "string" ||
                typeof rating !== "number" ||
                typeof pages !== "number" ||
                genres.length === 0 ||
                typeof localPath !== "string") {
                return { error: "invalid parameters for book details" };
            }
            try {
                const response = yield axios.post(`${this.BASEURL}/books/${userId}.json`, bookDetails);
                return { id: response.data.name, status: response.status, text: response.statusText };
            }
            catch (error) {
                return error;
            }
        });
    }
    getBookInfo(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !bookId) {
                return { error: 'missing user_id or book_id' };
            }
            if (typeof userId !== "string" ||
                typeof bookId !== "string") {
                return { error: "user id or book id must be a string" };
            }
            try {
                const bookDetails = yield axios.get(`${this.BASEURL}/books/${userId}/${bookId}.json`);
                return bookDetails.data;
            }
            catch (error) {
                return error;
            }
        });
    }
    editBookInfo(bookInfo, userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bookInfo || !userId || !bookId) {
                return { error: 'bad request' };
            }
            const { title, description, addedDate, imagePreviewUrl, author, rating, genres, pages, localPath } = bookInfo;
            if (!title || !description || !addedDate || imagePreviewUrl || !rating || !author || !genres || !pages || !localPath) {
                return { error: 'missing book information' };
            }
            if (typeof title !== "string" ||
                typeof description !== "string" ||
                typeof addedDate !== "string" ||
                typeof imagePreviewUrl !== "string" ||
                typeof author !== "string" ||
                typeof rating !== "number" ||
                typeof pages !== "number" ||
                typeof localPath !== "string" ||
                genres.length === 0 ||
                typeof userId !== "string" ||
                typeof bookId !== "string") {
                return { error: "invalid parameters for book details" };
            }
            try {
                const response = yield axios.put(`${this.BASEURL}/books/${userId}/${bookId}.json`, bookInfo);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteBookInfo(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !bookId) {
                return { error: 'missing user_id or book_id' };
            }
            if (typeof userId !== "string" ||
                typeof bookId !== "string") {
                return { error: "user id or book id must be a string" };
            }
            try {
                yield axios.delete(`${this.BASEURL}/books/${userId}/${bookId}.json`);
                return { status: 'info deleted' };
            }
            catch (error) {
                return error;
            }
        });
    }
    postUserFavorites(userId, favorites) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !favorites) {
                return { error: 'missing parameters' };
            }
            if (typeof userId !== "string") {
                return { error: 'user id must be a string' };
            }
            try {
                const response = yield axios.post(`${this.BASEURL}/favorites/${userId}.json`, favorites);
                return { id: response.data.name, status: response.status, text: response.statusText };
            }
            catch (error) {
                return error;
            }
        });
    }
    editUserFavorites(userId, favId, favorites) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !favorites || !favId) {
                return { error: 'missing parameters' };
            }
            if (typeof userId !== "string" ||
                typeof favId !== "string") {
                return { error: "favorite id or user id must be a string" };
            }
            try {
                const response = yield axios.put(`${this.BASEURL}/favorites/${userId}/${favId}.json`, favorites);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
    }
    getUserFavorites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                return { error: 'missing parameters' };
            }
            if (typeof userId !== "string") {
                return { error: "user id must be a string" };
            }
            try {
                const response = yield axios.get(`${this.BASEURL}/favorites/${userId}.json`);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteUserFavorites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                return { error: 'missing parameters' };
            }
            if (typeof userId !== "string") {
                return { error: "user id must be a string" };
            }
            try {
                yield axios.delete(`${this.BASEURL}/favorites/${userId}.json`);
                return { status: 'favorites deleted' };
            }
            catch (error) {
                return error;
            }
        });
    }
}
module.exports = BookDetailsController;
