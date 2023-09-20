const firebaseAuthController = require('../firebase/firebaseAuthController');
const bookDetailsController = require('../firebase/bookDetailsController');
const pdfController = require('../firebase/bookStorageOpsController');



class AuthController{
  constructor(){
    this.firebaseAuth = new firebaseAuthController();
    this.bookDetails = new bookDetailsController();
    this.pdfStorage =new pdfController();
  }

  async addUser(credentials){
    const response = await this.firebaseAuth.createUser(credentials);
    return response;
  }

  getUser(){
    return this.firebaseAuth.getCurrentUser();
  }

  async updateUser(data){
    const response = await this.firebaseAuth.updateUser(data);
    return response;
  }

  getverificationStatus(){
    return this.firebaseAuth.isVerified();
  }

  async deleteUser(userId){
    await this.bookDetails.deleteAllUserBooksInfo(userId).then(async (_)=>{
      await this.bookDetails.deleteUserFavorites(userId);
      const remoteFolder = `pdfs/${userId}`;
      await this.pdfStorage.deleteFolder(remoteFolder);
      await this.firebaseAuth.deleteUser();
    });
    return {response: 'user deleted'};
  }

  async logIn(credentials){
    const response = await this.firebaseAuth.logInUser(credentials);
    return response;
  }

  async logOut(){
    const response = await this.firebaseAuth.logOutUser();
    return response;
  }

  async verifyUser(){
    const response = await this.firebaseAuth.verifyUser();
    return response;
  }

  async resetPassword(email){
    const response = await this.firebaseAuth.resetPassword(email);
    return response;
  }
}


module.exports = AuthController;
