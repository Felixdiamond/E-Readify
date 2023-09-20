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
      // const resp = await updateProfile(user, );
      await this.updateUser({
        displayName: `${firstName} ${lastName}`,
        photoURL: avatarUrl
      });
      console.log(user.uid, favorites);
      await this.storeFavorites.postUserFavorites(user.uid, favorites);
    //   const db = yourFirestoreInstance; // Initialize Firestore as needed
    // await db.collection('users').doc(user.uid).set({ favorites });
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
        data: [user.providerData[0].displayName, user.providerData[0].photoURL]
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

  async updateUser(data) {
    try {
      const user = this.auth.currentUser;
      if (user && data){
        const userData = {...user, ...data}
        await updateProfile(user, userData);
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
      console.log(user);
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
