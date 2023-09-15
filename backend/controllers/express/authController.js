const firebaseAuthController = require('../firebase/firebaseAuthController');



class AuthController{
  constructor(){
    this.firebaseAuth = new firebaseAuthController();
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

  async deleteUser(){
    const response = await this.firebaseAuth.deleteUser();
    return response;
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
