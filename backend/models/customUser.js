class CustomUser{
  constructor (email, password, firstName, lastName, favorites = [], photoUrl){
    this.email = email;
    this.password = password;
    this.photoUrl = photoUrl;
    this.firstName = firstName;
    this.lastName = lastName;
    this.favorites = favorites;
  }

  toJSON() {
    return {
      email: this.email,
      password: this.password,
      photoUrl: this.photoUrl,
      firstName: this.firstName,
      lastName: this.lastName,
      favorites: this.favorites,
    };
  }
}

module.exports = CustomUser;
