import dayjs from 'dayjs'

function Film(filmID, title, favourite = false, date, rating = null, userID = 1){
    this.filmID = filmID;
    this.title = title;
    this.favourite = favourite;
    this.date = dayjs(date);
    this.rating = rating;
    this. userID = userID;
}

function Film_Library(){
    this.film = [];

    this.addFilm = (f) => {
        this.film.push(f)
    }


}

const film1 = new Film(1, "Mare Fuori", true, 4, 2);
const film2 = new Film(2, "Quo Vado?", true, 3, 1);
const film3 = new Film(3, "Suits", true, 5, 1);
const film4 = new Film(4, "Harry Potter", 3, 3);
const film5 = new Film(1, "Benvenuti al Sud", 3, 4);
const film6 = new Film(3, "Fast And Furious", true, 4, 2);

const film_library = new Film_Library();

film_library.addFilm(film1);
film_library.addFilm(film2);
film_library.addFilm(film3);
film_library.addFilm(film4);
film_library.addFilm(film5);
film_library.addFilm(film6);