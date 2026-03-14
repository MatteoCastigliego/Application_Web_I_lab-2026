import dayjs from 'dayjs'
import sqlite from 'sqlite3'

const db = new sqlite.Database('films.db', (err) => {
    if(err) console.log("Database not connected");
});

const db_copy = new sqlite.Database('films_copy.db', (err) => {
    if (err) console.log("Database copy not connected");
})

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

    this.addMovie = (title, isFavorite, rating = NULL, watchDate = NULL, userID) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO films(title, isFavorite, rating, watchDate, userID) VALUES(?, ?, ?, ?, ?)';
            db_copy.run(query, [title, isFavorite, rating, watchDate, userID], function(err){
                if(err) reject("Error during insertion of new film");
                else resolve(console.log("Insertion success!"));
            })
        })
    }

    this.deleteMovie = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM films WHERE id = ?';
            db_copy.run(query, [id], function(err) {
                if(err) reject("Error during elimination of a film");
                else resolve(console.log("Elimination success!"));
            })
        })
    }

    this.deleteWatchDate = () => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE films SET watchDate = NULL";
            db_copy.run(query, function(err){
                if(err) reject("Error during deleting all watchDate");
                else resolve(console.log("All watchDate cancelled!"));
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
})
/*.then(() => {
    console.log("\nINSERT A NEW FILM:");
    return film_library.addMovie("Suits", 1, 4, "2025-10-21", 3);
})*/
.then(() => {
    console.log("\nELIMINATION OF A FILM:");
    return film_library.deleteMovie(9)
})
.then(() => {
    console.log("\nDELETING OF ALL WATCHDATE");
    return film_library.deleteWatchDate();
}).catch(err => console.log(err));






