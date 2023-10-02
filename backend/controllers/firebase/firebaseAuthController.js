const {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require('firebase/auth');
const bookDetails = require('../firebase/bookDetailsController');
const encodeImage = require('../../utils/imageProcessor');

class FirebaseAuthController {
  constructor() {
    this.auth = getAuth();
    this.storeFavorites = new bookDetails();
  }

  async createUser(customUser) {
    try {
      const {email, password, avatarUrl, firstName, lastName, favorites} = customUser;
      if (!email || !password){
        return {'error': 'missing email or password'};
      }
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      const {user}  = credentials;
      if (!avatarUrl || !firstName || !lastName || !favorites){
        return {'error': 'missing parameters'};
      }
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        avatarUrl: avatarUrl
      }).then(async () => {
        await this.storeFavorites.postUserFavorites(user.uid, favorites);
      }).catch((error)=>{
        return error;
      });
      return {
        id: user.uid,
        verifiedUser: user.emailVerified,
      };
    } catch (error) {
      return error;
    }
  }

  getCurrentUser() {
    try{
      const user = this.auth.currentUser;
      if (!user){
        return user;
      }
      return {
        id: user.uid,
        verified: user.emailVerified,
        data: [user.displayName, user.avatarUrl],
      };
    }
    catch(error){
      return error;
    }
  }

  isVerified(){
    const user = this.getCurrentUser();
    if (user){
      return user.verified;
    }
    return false;
  }

  async updateUser(displayName, avatarUrl) {
    try {
      if (!displayName || !avatarUrl){
        return {error: 'missing update parameter'}
      }
      const user = this.auth.currentUser;
      if (user){
        await updateProfile(user, {
          avatarUrl: avatarUrl,
          displayName: displayName
        });
        const updatedUser = this.getCurrentUser();
        return updatedUser;
      }
      else {
        return {'error': 'missing request data'};
      }
    } catch (error) {
      return error;
    }
  }

  async deleteUser() {
    try {
      const user = this.auth.currentUser;
      await deleteUser(user);
      return {'status': 'deleted'}
    } catch (error) {
      return error;
    }
  }

  async logInUser(credential) {
    try {
      const { email, password } = credential;
      if (!email || !password){
        return {'error': 'invalid login credentials'};
      }
      const credentials = await signInWithEmailAndPassword(this.auth, email, password);
      const { user } = credentials;
      return {
        id: user.uid,
        verification: user.emailVerified,
        };
    } catch (error) {
      return error;
    }
  }

  async logOutUser() {
    try {
      const loggedOut = await signOut(this.auth);
      return {"status": loggedOut};
    } catch (error) {
      return error;
    }
  }

  async verifyUser(){
    try {
      const user = this.auth.currentUser;
      if (user){
        await sendEmailVerification(user);
        return {emailStatus: 'verification email sent'};
      }
      else{
        return {error: "user is not logged in"};
      }
    }catch(error){
      return error;
    }
  }

  async resetPassword(email){
    try{
      await sendPasswordResetEmail(this.auth, email);
      return {status: "reset password link sent"};
    } catch (error){
      return error;
    }
  }
}


module.exports = FirebaseAuthController;
