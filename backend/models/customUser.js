class customUser{
  constructor (email, password, firstName, lastName, favorites = [], avatarUrl){
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.firstName = firstName;
    this.lastName = lastName;
    this.favorites = favorites;
  }
}

module.exports = customUser;
