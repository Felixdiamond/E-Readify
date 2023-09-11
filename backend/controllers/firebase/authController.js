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

class AuthController {
  constructor() {
    this.auth = getAuth();
  }

  async createUser(email, password) {
    try {
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      const { user } = credentials;
      return user;
    } catch (error) {
      throw error;
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async updateUser(data) {
    try {
      const user = this.getCurrentUser();
      if (user) {
        const userData = { ...user, ...data };
        await updateProfile(user, { userData });
        const updatedUser = this.getCurrentUser();
        return updatedUser;
      }

      throw new Error('User is not logged in');
    } catch (error) {
      throw error;
    }
  }

  async deleteUser() {
    try {
      const user = this.getCurrentUser();
      await deleteUser(user);
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const credentials = await signInWithEmailAndPassword(this.auth, email, password);
      const { user } = credentials;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async logOutUser() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthController;
