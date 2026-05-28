import { Film } from '../models/FilmModels.js';

const SERVER_URL = 'http://localhost:3001';

// Mappa un oggetto JSON del server in un oggetto Film
function filmFromJson(f) {
  return new Film(f.id, f.title, f.isFavorite, f.rating, f.watchDate, f.userId);
}

// GET /api/films  →  lista film dell'utente corrente
async function getFilms() {
  try {
    const response = await fetch(`${SERVER_URL}/api/films`, {
      credentials: 'include',
    });
    if (response.ok) {
      const list = await response.json();
      return list.map(filmFromJson);
    } else {
      throw new Error('HTTP error in getFilms, code=' + response.status);
    }
  } catch (ex) {
    throw new Error('Network error in getFilms', { cause: ex });
  }
}

// POST /api/films  →  aggiunge un film
async function addFilm(film) {
  try {
    const response = await fetch(`${SERVER_URL}/api/films`, {
      method: 'POST',
      body: JSON.stringify({
        title: film.title,
        isFavorite: film.isFavorite,
        rating: film.rating || null,
        watchDate: film.watchDate || null,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      return await response.json(); // { id }
    } else {
      throw new Error('Error in addFilm, code=' + response.status);
    }
  } catch (ex) {
    throw new Error('Network error in addFilm', { cause: ex });
  }
}

// PUT /api/films/:id  →  aggiorna un film
async function updateFilm(film) {
  try {
    const response = await fetch(`${SERVER_URL}/api/films/${film.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: film.title,
        isFavorite: film.isFavorite,
        rating: film.rating || null,
        watchDate: film.watchDate
          ? (typeof film.watchDate === 'string' ? film.watchDate : film.watchDate.format('YYYY-MM-DD'))
          : null,
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) return true;
    else throw new Error('Error in updateFilm, code=' + response.status);
  } catch (ex) {
    throw new Error('Network error in updateFilm', { cause: ex });
  }
}

// DELETE /api/films/:id  →  elimina un film
async function deleteFilm(id) {
  try {
    const response = await fetch(`${SERVER_URL}/api/films/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.ok) return true;
    else throw new Error('Error in deleteFilm, code=' + response.status);
  } catch (ex) {
    throw new Error('Network error in deleteFilm', { cause: ex });
  }
}

export { getFilms, addFilm, updateFilm, deleteFilm };
