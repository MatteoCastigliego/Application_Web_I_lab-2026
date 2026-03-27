import db from './db.js';
import dayjs from 'dayjs'; // Day.js è necessario per formattare la data

export const getAllFilms = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films';
        db.all(query, (err, rows) => {
            if (err) reject(new Error("Error during selection of all elements"));
            else resolve(rows);
        });
    });
};

export const getFavouriteFilms = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE isFavorite = 1';
        db.all(query, (err, rows) => {
            if (err) reject(new Error("Error during selection of favourite films"));
            else resolve(rows);
        });
    });
};

export const getMostRated = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE rating = 5';
        db.all(query, (err, rows) => {
            if (err) reject(new Error("Error during selection of most rated films"));
            else resolve(rows);
        });
    });
};

export const getUnseenFilms = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE watchDate IS NULL';
        db.all(query, (err, rows) => {
            if (err) reject(new Error("Error during selection of unseen films"));
            else resolve(rows);
        });
    });
};

export const getFilmSeenLastMonth = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM films WHERE watchDate >= date('now', '-1 month')";
        db.all(query, (err, rows) => {
            if (err) reject(new Error("Error during selection of films seen last month"));
            else resolve(rows);
        });
    });
};

export const getFilmById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM films WHERE id = ?';
        db.get(query, [id], (err, row) => {
            if (err) reject(new Error("Database error during film selection"));
            else if (!row) resolve({ error: `Film with id ${id} not found` });
            else resolve(row);
        });
    });
};

export const addNewFilm = (film) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO films(title, isFavorite, rating, watchDate, userID) VALUES(?, ?, ?, ?, ?)';
        let rating;
        if (!film.rating || film.rating < 1 || film.rating > 5) rating = null;
        else rating = film.rating;

        const watchDate = film.watchDate ? dayjs(film.watchDate).format("YYYY-MM-DD") : null;
        db.run(query, [film.title, film.isFavorite, rating, watchDate, film.userId], function (err) {
            if (err) reject(new Error("Error during insertion of a new film"));
            else resolve(this.lastID);
        });
    });
};

export const deleteFilm = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM films WHERE id = ?';
        db.run(query, [id], function (err) {
            if (err) reject(new Error("Error during deleting film"));
            else resolve(this.changes);
        });
    });
};

export const updateFilm = (film) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE films SET title = ?, isFavorite = ?, rating = ?, watchDate = ? WHERE id = ?';
        const watchDate = film.watchDate ? dayjs(film.watchDate).format("YYYY-MM-DD") : null;
        let rating;
        if (!film.rating || film.rating < 1 || film.rating > 5) rating = null;
        else rating = film.rating;
        db.run(query, [film.title, film.isFavorite, rating, watchDate, film.id], function (err) {
            if (err) reject(new Error("Error during updating the film"));
            else if (this.changes === 0) resolve({ error: `Film with id ${film.id} not found` });
            else resolve(this.changes);
        });
    });
};
