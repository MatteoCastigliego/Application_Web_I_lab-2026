import dayjs from 'dayjs'

function Film(filmID, title, favourite = false, date, rating = null, userID = 1){
    this.filmID = filmID;
    this.title = title;
    this.favourite = favourite;
    this.date = dayjs(date, "D//M/YYYY");
    this.rating = rating;
    this. userID = userID;

    this.printFilm = () => {
        console.log("Id: ", this.filmID, "Title: ", this.title, "Favoutite: ", this.favourite, "Watch Date: ", dayjs(this.date).format('MMMM D, YYYY'), "Rating: ", this.rating, "User id: ", this.userID);
    }
}

function Film_Library(){
    this.film = [];

    this.addFilm = (f) => {
        this.film.push(f)
    }

    this.removeFilm = (IDfilm) => {
        this.film = this.film.filter(f => f.filmID !== IDfilm);
    }

    /*
    con cilo for
    this.updateRating = (id, rating) =>{
        for(const f of this.film){
            if(f.filmID === id){
                f.rating = rating;
            }
        }
    }*/

    this.updateRating = (id, rating) => {
        const filmRchange = this.film.find(f => f.filmID === id);
        filmRchange.rating = rating;
    }

}

const film1 = new Film(1, "Mare Fuori", true, "10/03/2025", 4, 2);
const film2 = new Film(2, "Quo Vado?", true, "14/02/2019", 3, 1);
const film3 = new Film(3, "Suits", true, "16/12/2020", 5, 1);
const film4 = new Film(4, "Harry Potter", false,"25/05/1991", 3, 3);
const film5 = new Film(5, "Benvenuti al Sud", false, "11/01/1974", 3, 4);
const film6 = new Film(6, "Fast And Furious", true, "24/07/1975", 4, 2);

const film_library = new Film_Library();

film_library.addFilm(film1);
film_library.addFilm(film2);
film_library.addFilm(film3);
film_library.addFilm(film4);
film_library.addFilm(film5);
film_library.addFilm(film6);



console.log("sorted film by watch date");
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
}

