import dayjs from 'dayjs'

function Film(filmID, title, favourite = false, date, rating = null, userID = 1){
    this.filmID = filmID;
    this.title = title;
    this.favourite = favourite;
    this.date = dayjs(date);
    this.rating = rating;
    this. userID = userID;
}