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

class FirebaseAuthController {
  constructor() {
    this.auth = getAuth();
  }

  async createUser(customUser) {
    try {
      const {email, password, avatarUrl, firstName, lastName, favorites} = customUser;
      if (!email || !password){
        return {'error': 'missing email or password'};
      }
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      const { user } = credentials;
      if (!avatarUrl || !firstName || !lastName || !favorites){
        return {'error': 'missing parameters'};
      }
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: avatarUrl
      });
    //   const db = yourFirestoreInstance; // Initialize Firestore as needed
    // await db.collection('users').doc(user.uid).set({ favorites });
      return {id: user.id,
        email: user.email,
        verifiedUser: user.emailVerified,
        info: user.providerData
        };
      
    } catch (error) {
      return error;
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  isVerified(){
    const user = this.getCurrentUser();
    if (user){
      return user.emailVerified;
    }
    return false;
  }

  async updateUser(data) {
    try {
      const user = this.getCurrentUser();
      if (user && data){
        await updateProfile(user, data);
        // const newUser = this.getCurrentUser();
        return {id: user.id,
          email: user.email,
          verifiedUser: user.emailVerified,
          info: user.providerData
          };
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
      const user = this.getCurrentUser();
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
        id: user.id,
        email: user.email,
        verification: user.emailVerified,
        info: user.providerData,
        tokens: user.stsTokenManager
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
      const user = this.getCurrentUser();
      if (user){
        await sendEmailVerification(user);
      }
      else{
        return {"error": "user is not logged in"};
      }
    }catch(error){
      return error;
    }
  }

  async resetPassword(email){
    try{
      await sendPasswordResetEmail(this.auth, email);
      return {"status": "email sent"}
    } catch (error){
      return error;
    }
  }
}


module.exports = FirebaseAuthController;
