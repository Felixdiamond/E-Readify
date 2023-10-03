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
const fs = require('fs');
const admin = require('../../admin');
const { Readable } = require('stream');
class BookStorageOpsController {
    constructor() {
        this.storageBucket = admin.storage().bucket();
    }
    uploadBook(filePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { localPath, remotePath } = filePaths;
                if (!localPath || !remotePath) {
                    return { error: "missing file paths" };
                }
                if (typeof localPath !== "string" ||
                    typeof remotePath !== "string") {
                    return { error: "file paths must be strings" };
                }
                const response = yield this.storageBucket.upload(localPath, {
                    destination: remotePath
                });
                return { status: 'file successfully uploaded', response: response.name };
            }
            catch (error) {
                return error;
            }
        });
    }
    downloadBook(filePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { localPath, remotePath } = filePaths;
                if (!localPath || !remotePath) {
                    return { error: "missing file paths" };
                }
                const file = this.storageBucket.file(remotePath);
                if (!file) {
                    return { error: 'file not found' };
                }
                file.createReadStream().
                    on('error', (error) => {
                    console.log(error);
                    return error;
                }).on('end', () => {
                    return { status: 'file downloaded successfully' };
                }).pipe(fs.createWriteStream(localPath));
            }
            catch (error) {
                return error;
            }
        });
    }
    readBook(remotePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!remotePath) {
                    return { error: 'missing file path' };
                }
                if (typeof remotePath !== "string") {
                    return { error: "remote file path must be a string" };
                }
                const file = this.storageBucket.file(remotePath);
                if (!file) {
                    return { error: 'file not found' };
                }
                const stream = file.createReadStream();
                const contentStream = new Readable().wrap(stream);
                return { status: 'OK', content: contentStream };
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteBook(remotePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!remotePath) {
                    return { error: "missing file paths" };
                }
                const file = this.storageBucket.file(remotePath);
                if (!file) {
                    return { error: 'file not found' };
                }
                yield file.delete();
                return { status: 'file deleted' };
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteFolder(remoteFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!remoteFolder) {
                    return { error: 'missing file folder' };
                }
                const [files] = yield this.storageBucket.getFiles({ prefix: remoteFolder });
                const deletePromises = [];
                for (const file of files) {
                    deletePromises.push(file.delete());
                }
                yield Promise.all(deletePromises);
                yield this.storageBucket.deleteFiles({ prefix: remoteFolder });
                return { status: 'folder deleted' };
            }
            catch (error) {
                return error;
            }
        });
    }
}
module.exports = BookStorageOpsController;
