import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { check, validationResult } from 'express-validator';
import dayjs from 'dayjs';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

import { listFilms, getFilm, addFilm, updateFilm, deleteFilm, getUser } from './dao.js';

// init
const app = express();
const port = 3001;

// middlewares
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// --- PASSPORT ---

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await getUser(username, password);
    if (!user) return cb(null, false, 'Incorrect username or password.');
    return cb(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

// --- SESSION ---

app.use(
  session({
    secret: 'film-library-secret!',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate('session'));

// --- MIDDLEWARE isLoggedIn ---

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Not authorized' });
};

/* ========== AUTH ROUTES ========== */

// POST /api/sessions  →  login
app.post('/api/sessions', passport.authenticate('local'), function (req, res) {
  return res.status(201).json(req.user);
});

// GET /api/sessions/current  →  check session
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) res.json(req.user);
  else res.status(401).json({ error: 'Not authenticated' });
});

// DELETE /api/sessions/current  →  logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => res.end());
});

/* ========== FILM ROUTES ========== */

// GET /api/films  →  lista film dell'utente loggato
app.get('/api/films', isLoggedIn, async (req, res) => {
  try {
    const films = await listFilms(req.user.id);
    res.json(films);
  } catch {
    res.status(500).end();
  }
});

// GET /api/films/:id
app.get('/api/films/:id', isLoggedIn, async (req, res) => {
  try {
    const film = await getFilm(req.params.id, req.user.id);
    if (film.error) res.status(404).json(film);
    else res.json(film);
  } catch {
    res.status(500).end();
  }
});

// POST /api/films  →  aggiunge un film
app.post(
  '/api/films',
  isLoggedIn,
  [check('title').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const newFilm = {
      title: req.body.title,
      isFavorite: req.body.isFavorite ?? false,
      rating: req.body.rating ?? null,
      watchDate: req.body.watchDate
        ? dayjs(req.body.watchDate).format('YYYY-MM-DD')
        : null,
      userId: req.user.id,
    };

    try {
      const id = await addFilm(newFilm);
      res.status(201).json({ id });
    } catch (e) {
      console.error(e.message);
      res.status(503).json({ error: 'Impossible to create the film.' });
    }
  }
);

// PUT /api/films/:id  →  aggiorna un film
app.put(
  '/api/films/:id',
  isLoggedIn,
  [check('title').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const filmToUpdate = {
      id: req.params.id,
      title: req.body.title,
      isFavorite: req.body.isFavorite ?? false,
      rating: req.body.rating ?? null,
      watchDate: req.body.watchDate
        ? dayjs(req.body.watchDate).format('YYYY-MM-DD')
        : null,
    };

    try {
      const result = await updateFilm(filmToUpdate, req.user.id);
      if (result.error) res.status(404).json(result);
      else res.status(200).end();
    } catch {
      res.status(503).json({ error: `Impossible to update film #${req.params.id}.` });
    }
  }
);

// DELETE /api/films/:id  →  elimina un film
app.delete('/api/films/:id', isLoggedIn, async (req, res) => {
  try {
    const result = await deleteFilm(req.params.id, req.user.id);
    if (result.error) res.status(404).json(result);
    else res.status(200).end();
  } catch {
    res.status(503).json({ error: `Impossible to delete film #${req.params.id}.` });
  }
});

// start
app.listen(port, () => {
  console.log(`Film server started at http://localhost:${port}`);
});
