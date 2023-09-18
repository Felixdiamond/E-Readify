class BookModel{
  constructor(title, description, addedDate, author, genres, pages, rating, localPath){
    this.title = title;
    this.description = description;
    this.addedDate = addedDate;
    this.author = author;
    this.rating = rating;
    this.genres = genres;
    this.pages = pages;
    this.localPath = localPath;
  }

  toJSON(){
    return {
      title: this.title,
      description: this.description,
      addedDate: this.addedDate,
      author: this.author,
      rating: this.rating,
      genres: this.genres,
      pages: this.pages,
      localPath: this.localPath,
    };
  }
}

module.exports = BookModel;
