import dayjs from 'dayjs';

function Film(id, title, isFavorite = false, rating = null, watchDate, userId) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    this.rating = rating;
    // Salva come oggetto dayjs solo se la data è valida
    this.watchDate = watchDate ? dayjs(watchDate) : null;
    this.userId = userId;
}

export {Film};