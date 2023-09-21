class BookModel{
  constructor(title, description, addedDate, author, genres, pages, rating, imagePreviewUrl, localPath){
    this.title = title;
    this.description = description;
    this.addedDate = addedDate;
    this.imagePreviewUrl = imagePreviewUrl;
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
      imahePreviewUrl: this.imagePreviewUrl,
      author: this.author,
      rating: this.rating,
      genres: this.genres,
      pages: this.pages,
      localPath: this.localPath,
    };
  }
}

module.exports = BookModel;
