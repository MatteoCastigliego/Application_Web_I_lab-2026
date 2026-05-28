/**
 * Script di inizializzazione del database.
 * Crea le tabelle e inserisce dati di esempio.
 * Eseguire una volta sola: node init_db.js
 */

import sqlite from 'sqlite3';
import crypto from 'crypto';

const db = new sqlite.Database('films.sqlite', (err) => {
  if (err) throw err;
  console.log('Database opened.');
});

// Helper per creare password hashata
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(8).toString('hex');
    crypto.scrypt(password, salt, 16, (err, hash) => {
      if (err) reject(err);
      else resolve({ hash: hash.toString('hex'), salt });
    });
  });
}

async function init() {
  // DROP + CREATE tables
  await run(`DROP TABLE IF EXISTS film`);
  await run(`DROP TABLE IF EXISTS user`);

  await run(`
    CREATE TABLE user (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      email   TEXT NOT NULL UNIQUE,
      name    TEXT NOT NULL,
      password TEXT NOT NULL,
      salt    TEXT NOT NULL
    )
  `);

  await run(`
    CREATE TABLE film (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT NOT NULL,
      isFavorite INTEGER NOT NULL DEFAULT 0,
      rating     INTEGER,
      watchDate  TEXT,
      userId     INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES user(id)
    )
  `);

  // Utenti
  const users = [
    { email: 'matteo@test.it', name: 'Matteo', password: 'password' },
    { email: 'luca@test.it',   name: 'Luca',   password: 'password' },
    { email: 'anna@test.it',   name: 'Anna',   password: 'password' },
  ];

  const userIds = [];
  for (const u of users) {
    const { hash, salt } = await hashPassword(u.password);
    const id = await runInsert(
      `INSERT INTO user(email, name, password, salt) VALUES (?, ?, ?, ?)`,
      [u.email, u.name, hash, salt]
    );
    userIds.push(id);
    console.log(`Inserted user: ${u.email} (id=${id})`);
  }

  // Film di esempio (userId 1 = Matteo, userId 2 = Luca)
  const films = [
    { title: 'Mare Fuori',       isFavorite: 1, rating: 4, watchDate: '2025-03-10', userId: userIds[0] },
    { title: 'Quo Vado?',        isFavorite: 1, rating: 3, watchDate: '2019-02-14', userId: userIds[0] },
    { title: 'Suits',            isFavorite: 1, rating: 5, watchDate: '2020-12-16', userId: userIds[0] },
    { title: 'Harry Potter',     isFavorite: 0, rating: 3, watchDate: null,         userId: userIds[0] },
    { title: 'Benvenuti al Sud', isFavorite: 0, rating: 3, watchDate: '1974-01-11', userId: userIds[0] },
    { title: 'Fast And Furious', isFavorite: 1, rating: 4, watchDate: '1975-07-24', userId: userIds[1] },
  ];

  for (const f of films) {
    const id = await runInsert(
      `INSERT INTO film(title, isFavorite, rating, watchDate, userId) VALUES (?, ?, ?, ?, ?)`,
      [f.title, f.isFavorite, f.rating, f.watchDate, f.userId]
    );
    console.log(`Inserted film: "${f.title}" (id=${id})`);
  }

  db.close();
  console.log('\nDatabase initialized successfully.');
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function runInsert(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

init().catch(console.error);
