const {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail
} = require('firebase/auth');
const encodeImage = require('../../utils/imageProcessor');

class FirebaseAuthController {
  private auth: any;

  constructor() {
    this.auth = getAuth();
  }

  async createUser(customUser: {
    email: string;
    password: string;
    photoUrl: string | null;
    firstName: string;
    lastName: string;
  }): Promise<{ id: string; verifiedUser: boolean } | { error: any }> {
    try {
      const {email, 
            password,
            photoUrl,
            firstName,
            lastName} = customUser;
      if (
          !email || 
          !password ||  
          !firstName || 
          !lastName){
        return {'error': 'Incomplete user model'};
      }
      if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof firstName !== "string" ||
            typeof lastName !== "string"
          ) {
        return { error: "parameters must be strings"};
      }
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      const {user}  = credentials;
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: photoUrl
      }).catch((error: any)=>{
        return error;
      });
      return {
        id: user.uid,
        verifiedUser: user.emailVerified,
      };
    } catch (error: any) {
      return error;
    }
  }

  getCurrentUser(): {
    id: string,
    verified: boolean,
    data: [string | null, string | null]
  } | {error: any} {
    try{
      const user = this.auth.currentUser;
      if (!user){
        return user;
      }
      return {
        id: user.uid,
        verified: user.emailVerified,
        data: [user.displayName || null, user.photoURL || null],
      };
    }
    catch(error: any){
      return error;
    }
  }

  isVerified(): boolean {
    const user = this.auth.currentUser;
    return user ? user.emailVerified : false;
  }

  async updateUser(displayName:string, photoURL: string):
  Promise<{
    id: string,
    verified: boolean,
    data: [string | null, string | null]
  } | { error: any }> {
    try {
      if (!displayName || !photoURL) {
        return {error: 'missing parameter'}
      }
      if (
        typeof displayName !== "string" ||
        typeof photoURL !== "string"
      ){
        return {error: 'parameters must be strings'}
      }
      const user = this.auth.currentUser;
      if (user){
        await updateProfile(user, {
          photoURL: photoURL,
          displayName: displayName
        });
        const updatedUser = this.getCurrentUser();
        return updatedUser;
      }
      else {
        return {'error': 'missing request data'};
      }
    } catch (error: any) {
      return error;
    }
  }

  async deleteUser(): Promise<{ status: string } | { error: any }> {
    try {
      const user = this.auth.currentUser;
      await deleteUser(user);
      return {status: 'deleted'};
    } catch (error: any) {
      return error;
    }
  }

  async logInUser(credential: {
    email: string,
    password: string
  }): Promise<{ 
    id: string,
    verification: boolean
  } | { error: any }> {
    try {
      const { email, password } = credential;
      if (!email || !password){
        return {error: 'invalid login credentials'};
      }
      if (
        typeof email !== "string" ||
        typeof password !== "string"
      ){
        return {error: "parameters must be strings"};
      }
      const credentials = await signInWithEmailAndPassword(this.auth, email, password);
      const { user } = credentials;
      return {
        id: user.uid,
        verification: user.emailVerified,
        };
    } catch (error: any) {
      return error;
    }
  }

  async logOutUser(): Promise<{ status: any } | { error: any }> {
    try {
      const loggedOut = await signOut(this.auth);
      return {status: loggedOut};
    } catch (error: any) {
      return error;
    }
  }

  async verifyUser(): Promise<{ emailStatus: string } | {error: any}> {
    try {
      const user = this.auth.currentUser;
      if (user){
        await sendEmailVerification(user);
        return {emailStatus: 'verification email sent'};
      }
      else{
        return {error: "user is not logged in"};
      }
    }catch(error: any){
      return error;
    }
  }

  async resetPassword(email: string): Promise<{ status: string } | {error: any}>{
    try{
      await sendPasswordResetEmail(this.auth, email);
      return {status: "reset password link sent"};
    } catch (error: any){
      return error;
    }
  }
}


module.exports = FirebaseAuthController;
