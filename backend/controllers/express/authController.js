const firebaseAuthController = require('../firebase/firebaseAuthController');
const bookDetailsController = require('../firebase/bookDetailsController');



class AuthController{
  constructor(){
    this.firebaseAuth = new firebaseAuthController();
    this.bookDetails = new bookDetailsController();
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
      await this.firebaseAuth.deleteUser();
    });
    return {response: 'file deleted'};
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

  async resetPassword(){
    const response = await this.firebaseAuth.resetPassword();
    return response;
  }
}


module.exports = AuthController;
