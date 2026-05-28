/* Data Access Object (DAO) per accedere ai film e agli utenti */

import sqlite from 'sqlite3';
import { Film } from './FilmModels.js';
import crypto from 'crypto';

const db = new sqlite.Database('films.sqlite', (err) => {
  if (err) throw err;
});

/** FILMS **/

// Recupera tutti i film di un utente
export const listFilms = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM film WHERE userId = ?';
    db.all(sql, [userId], (err, rows) => {
      if (err) reject(err);
      else {
        const films = rows.map((f) =>
          new Film(f.id, f.title, f.isFavorite === 1, f.rating, f.watchDate, f.userId)
        );
        resolve(films);
      }
    });
  });
};

// Recupera un singolo film (solo se appartiene all'utente)
export const getFilm = (id, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM film WHERE id = ? AND userId = ?';
    db.get(sql, [id, userId], (err, row) => {
      if (err) reject(err);
      else if (row === undefined)
        resolve({ error: 'Film not found or not authorized.' });
      else
        resolve(new Film(row.id, row.title, row.isFavorite === 1, row.rating, row.watchDate, row.userId));
    });
  });
};

// Aggiunge un nuovo film
export const addFilm = (film) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO film(title, isFavorite, rating, watchDate, userId) VALUES (?, ?, ?, ?, ?)';
    db.run(
      sql,
      [film.title, film.isFavorite ? 1 : 0, film.rating || null, film.watchDate || null, film.userId],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};

// Aggiorna un film esistente (solo se appartiene all'utente)
export const updateFilm = (film, userId) => {
  return new Promise((resolve, reject) => {
    const sql =
      'UPDATE film SET title = ?, isFavorite = ?, rating = ?, watchDate = ? WHERE id = ? AND userId = ?';
    db.run(
      sql,
      [film.title, film.isFavorite ? 1 : 0, film.rating || null, film.watchDate || null, film.id, userId],
      function (err) {
        if (err) reject(err);
        else if (this.changes === 0) resolve({ error: 'Film not found or not authorized.' });
        else resolve(this.changes);
      }
    );
  });
};

// Elimina un film (solo se appartiene all'utente)
export const deleteFilm = (id, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM film WHERE id = ? AND userId = ?';
    db.run(sql, [id, userId], function (err) {
      if (err) reject(err);
      else if (this.changes === 0) resolve({ error: 'Film not found or not authorized.' });
      else resolve(this.changes);
    });
  });
};

/** USERS **/

export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: row.id, username: row.email, name: row.name };

        crypto.scrypt(password, row.salt, 16, function (err, hashedPassword) {
          if (err) reject(err);
          if (!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
            resolve(false);
          else
            resolve(user);
        });
      }
    });
  });
};
