import dayjs from 'dayjs'
import sqlite from 'sqlite3'

const db = new sqlite.Database('films.db', (err) => {
    if(err) console.log("Database not connected");
    else console.log("Database connected!");
});

function Film(filmID, title, favourite = false, date, rating = null, userID = 1){
    this.filmID = filmID;
    this.title = title;
    this.favourite = favourite;
    this.date = dayjs(date, "YYYY-MM-DD");
    this.rating = rating;
    this. userID = userID;

    this.printFilm = () => {
        console.log("Id: ", this.filmID, "Title: ", this.title, "Favoutite: ", this.favourite, "Watch Date: ", dayjs(this.date).format('MMMM D, YYYY'), "Rating: ", this.rating, "User id: ", this.userID);
    }
}

function Film_Library(){
    this.film = [];

    this.getAllFilms = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM films'
            db.all(query, (err, rows) => {
                if(err) reject("Error durins selection of all elements");
                else resolve(rows);
            })
        })
    };

}

const film_library = new Film_Library();

film_library.getAllFilms().then(films => {
    for(const film of films){
        let favourite = false;
        if(film.isFavourite === 1) favourite = true;
        let new_film = new Film(film.id, film.title, favourite, film.watchDate, film.rating, film.userId)
        film_library.film.push(new_film);
        new_film.printFilm();
    }
})






/*console.log("sorted film by watch date");
film_library.film.sort((a, b) => a.date - b.date);

for(const film of film_library.film){
    film.printFilm();
}

console.log("sorted film by rating")
film_library.film.sort((a, b) => b.rating - a.rating);

for(const film of film_library.film){
    film.printFilm();
}

console.log("Delete films with id = 1")
film_library.removeFilm(1);

for(const film of film_library.film){
    film.printFilm();
}

console.log("Update rating of film with id 4 from 3 to 1")
film_library.updateRating(4, 1);

for(const film of film_library.film){
    film.printFilm();
}*/

