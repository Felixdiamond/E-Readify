const firebaseAuthController = require('../firebase/firebaseAuthController');



class AuthController{
  constructor(){
    this.firebaseAuth = firebaseAuthController;
  }

  static async addUser(email, password){
    const response = await this.firebaseAuth.createUser(email, password);
    return response;
  }

  static getUser(){
    return this.firebaseAuth.getCurrentUser();
  }

  static async updateUser(data){
    const response = await this.firebaseAuth.updateUser(data);
    return response;
  }

  static getverificationStatus(){
    return this.firebaseAuth.isVerified();
  }

  static async deleteUser(){
    const response = await this.firebaseAuth.deleteUser();
    return response;
  }

  static async logIn(){
    const response = await this.firebaseAuth.logInUser();
    return response;
  }

  static async logOut(){
    const response = await this.firebaseAuth.logOutUser();
    return response;
  }

  static async verifyUser(){
    const response = await this.firebaseAuth.verifyUser();
    return response;
  }

  static async resetPassword(){
    const response = await this.firebaseAuth.resetPassword();
    return response;
  }
}


module.exports = AuthController;
