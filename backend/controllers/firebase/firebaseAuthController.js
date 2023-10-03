"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, deleteUser, sendEmailVerification, sendPasswordResetEmail } = require('firebase/auth');
const encodeImage = require('../../utils/imageProcessor');
class FirebaseAuthController {
    constructor() {
        this.auth = getAuth();
    }
    createUser(customUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, photoUrl, firstName, lastName } = customUser;
                if (!email ||
                    !password ||
                    !photoUrl ||
                    !firstName ||
                    !lastName) {
                    return { 'error': 'Incomplete user model' };
                }
                if (typeof email !== "string" ||
                    typeof password !== "string" ||
                    typeof photoUrl !== "string" ||
                    typeof firstName !== "string" ||
                    typeof lastName !== "string") {
                    return { error: "parameters must be strings" };
                }
                const credentials = yield createUserWithEmailAndPassword(this.auth, email, password);
                const { user } = credentials;
                yield updateProfile(user, {
                    displayName: `${firstName} ${lastName}`,
                    photoURL: photoUrl
                }).catch((error) => {
                    return error;
                });
                return {
                    id: user.uid,
                    verifiedUser: user.emailVerified,
                };
            }
            catch (error) {
                return error;
            }
        });
    }
    getCurrentUser() {
        try {
            const user = this.auth.currentUser;
            if (!user) {
                return user;
            }
            return {
                id: user.uid,
                verified: user.emailVerified,
                data: [user.displayName || null, user.photoURL || null],
            };
        }
        catch (error) {
            return error;
        }
    }
    isVerified() {
        const user = this.auth.currentUser;
        return user ? user.emailVerified : false;
    }
    updateUser(displayName, photoURL) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!displayName || !photoURL) {
                    return { error: 'missing parameter' };
                }
                if (typeof displayName !== "string" ||
                    typeof photoURL !== "string") {
                    return { error: 'parameters must be strings' };
                }
                const user = this.auth.currentUser;
                if (user) {
                    yield updateProfile(user, {
                        photoURL: photoURL,
                        displayName: displayName
                    });
                    const updatedUser = this.getCurrentUser();
                    return updatedUser;
                }
                else {
                    return { 'error': 'missing request data' };
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.auth.currentUser;
                yield deleteUser(user);
                return { status: 'deleted' };
            }
            catch (error) {
                return error;
            }
        });
    }
    logInUser(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = credential;
                if (!email || !password) {
                    return { error: 'invalid login credentials' };
                }
                if (typeof email !== "string" ||
                    typeof password !== "string") {
                    return { error: "parameters must be strings" };
                }
                const credentials = yield signInWithEmailAndPassword(this.auth, email, password);
                const { user } = credentials;
                return {
                    id: user.uid,
                    verification: user.emailVerified,
                };
            }
            catch (error) {
                return error;
            }
        });
    }
    logOutUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loggedOut = yield signOut(this.auth);
                return { status: loggedOut };
            }
            catch (error) {
                return error;
            }
        });
    }
    verifyUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.auth.currentUser;
                if (user) {
                    yield sendEmailVerification(user);
                    return { emailStatus: 'verification email sent' };
                }
                else {
                    return { error: "user is not logged in" };
                }
            }
            catch (error) {
                return error;
            }
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sendPasswordResetEmail(this.auth, email);
                return { status: "reset password link sent" };
            }
            catch (error) {
                return error;
            }
        });
    }
}
module.exports = FirebaseAuthController;
