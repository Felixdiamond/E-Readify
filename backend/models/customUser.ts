class CustomUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  favorites: string[];
  avatarUrl: string;

  constructor(email: string, password: string, firstName: string, lastName: string, favorites: string[], avatarUrl: string) {
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.firstName = firstName;
    this.lastName = lastName;
    this.favorites = favorites;
  }

  toJSON(): object {
    return {
      email: this.email,
      password: this.password,
      avatarUrl: this.avatarUrl,
      firstName: this.firstName,
      lastName: this.lastName,
      favorites: this.favorites,
    };
  }
}

module.exports = CustomUser;