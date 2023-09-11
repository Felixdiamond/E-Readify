class BookModel{
  constructor(title, description, addedDate, author, genres, pages, rating){
    this.title = title;
    this.description = description;
    this.addedDate = addedDate;
    this.author = author;
    this.rating = rating;
    this.genres = genres;
    this.pages = pages;
  }
}

module.exports = BookModel;
