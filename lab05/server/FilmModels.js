import dayjs from 'dayjs';

function Film(id, title, isFavorite = false, rating = null, watchDate = null, userId) {
  this.id = id;
  this.title = title;
  this.isFavorite = isFavorite;
  this.rating = rating;
  this.watchDate = watchDate ? dayjs(watchDate) : null;
  this.userId = userId;
}

export { Film };
