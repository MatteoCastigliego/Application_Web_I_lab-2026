import dayjs from 'dayjs'
import sqlite from 'sqlite3'

const db = new sqlite.Database('films.db', (err) => {
    if(err) console.log("Database not connected");
});

function Film(filmID, title, favourite = false, date, rating = null, userID = 1){
    this.filmID = filmID;
    this.title = title;
    this.favourite = favourite;
    this.date = dayjs(date);
    this.rating = rating;
    this. userID = userID;

    this.printFilm = () => {
        console.log("Id: ", this.filmID, "Title: ", this.title, "Favoutite: ", this.favourite, "Watch Date: ", dayjs(this.date).format('MMMM D, YYYY'), "Rating: ", this.rating, "User id: ", this.userID);
    }
}

function print_films(films){
    for(const film of films){
    let new_film = new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating, film.userId)
    favourite_films.push(new_film);
    new_film.printFilm();
    }
}

function Film_Library(){
    this.film = [];

    this.getAllFilms = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films'
            db.all(query, (err, rows) => {
                if(err) reject("Error during selection of all elements");
                else resolve(rows);
            })
        })
    };

    this.getALLFavourite = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE isFavorite = ?';
            db.all(query, [1], (err, rows) => {
                if(err) reject("Error during selection of favourite films");
                else resolve(rows);
            })
        })
    }

    this.getFilmsAfterDate = (date) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE watchDate > ?';
            db.all(query, [date], (err, rows) => {
                if(err) reject("Error during selection of films after date");
                else resolve(rows);
            })
        })
    };

    this.getFilmWithString = (string) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films WHERE title LIKE ?';
            db.all(query, [`%${string}%`], (err, rows) => {
                if(err) reject("Error during finding a film title with a given string");
                else resolve(rows);
            })
        })
    }

}

const film_library = new Film_Library();
const favourite_films = [];

console.log("\nSELECT ALL FILMS FROM THE DATABASE:")
film_library.getAllFilms().then(films => {
    print_films(films);
}).catch(err => console.log(err))
.then(() => {
    console.log("\nSELECT ONLY FAVOURITE FILMS FROM THE DATABASE:")
    return film_library.getALLFavourite();
})
.then(films => {
    print_films(films);
})
.then(() => {
    const date = "2026-03-12";
    console.log("\nFILM AFTER DATE: ", date)
    return film_library.getFilmsAfterDate(date);
})
.then(films => {
    print_films(films);
})
.then(() => {
    console.log("\nFILM WITH A TITLE WITH A GIVEN STRING:");
    const string = "Star";
    return film_library.getFilmWithString(string);
})
.then(films => {
    print_films(films);
}).catch(err => console.log(err));






