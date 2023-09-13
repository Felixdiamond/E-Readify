const firebaseAuthController = require('../firebase/firebaseAuthController');



class AuthController{
  constructor(){
    this.firebaseAuth = new firebaseAuthController();
  }

  async addUser(email, password){
    const response = await this.firebaseAuth.createUser(email, password);
    return { response };
  }

  getUser(){
    return this.firebaseAuth.getCurrentUser();
  }

  async updateUser(data){
    const response = await this.firebaseAuth.updateUser(data);
    return {response};
  }

  getverificationStatus(){
    return this.firebaseAuth.isVerified();
  }

  async deleteUser(){
    const response = await this.firebaseAuth.deleteUser();
    return {response};
  }

  async logIn(email, password){
    const response = await this.firebaseAuth.logInUser(email, password);
    return {response};
  }

  async logOut(){
    const response = await this.firebaseAuth.logOutUser();
    return {response};
  }

  async verifyUser(){
    const response = await this.firebaseAuth.verifyUser();
    return {response};
  }

  async resetPassword(){
    const response = await this.firebaseAuth.resetPassword();
    return {response};
  }
}


module.exports = AuthController;
