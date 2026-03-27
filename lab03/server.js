import express from 'express'
import morgan from 'morgan'
import * as filmDao from './film-dao.js'
import Film from './film-constructor.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());


/* This function gets all the films that respect the requested filter */
app.get('/api/films', (req, res) => {
    const filter = req.query.filter;
    if(filter === 'filter-favorite'){
        filmDao.getFavouriteFilms().then(films => res.json(films)).catch((err) => res.status(500).json(err));
    }else if(filter === 'filter-best'){
        filmDao.getMostRated().then(films => res.json(films)).catch((err) => res.status(500).json(err));
    }else if(filter === 'filter-unseen'){
        filmDao.getUnseenFilms().then(films => res.json(films)).catch((err) => res.status(500).json(err));
    }else if(filter === 'filter-lastmonth'){
        filmDao.getFilmSeenLastMonth().then(films => res.json(films)).catch((err) => res.status(500).json(err));
    }else{
        filmDao.getAllFilms().then(films => res.json(films)).catch((err) => res.status(500).json(err));
    }
});


/* This function gets the film with an id given as parameter */
app.get('/api/films/:id', async (req, res) => {
    try {
        const result = await filmDao.getFilmById(req.params.id);
        if (result.error)
            res.status(404).json(result);
        else
            res.json(result);
    } catch (err) {
        res.status(500).end();
    }
});


/* Function that adds a new film in the db */
app.post('/api/films', async (req, res) => {
    const favourite = req.body.isFavorite ? req.body.isFavorite : false;
    const rating = req.body.rating ? req.body.rating : false;
    const watchDate = req.body.watchDate ? req.body.watchDate : false;
    const film = new Film(undefined, req.body.title, favourite, rating, watchDate, req.body.userId);
    try {
        const result = await filmDao.addNewFilm(film);
        res.json(result);
    } catch (err) {
        res.status(503).json({ error: `Database error during the creation of new film: ${err}` });
    }
});


/* This function is used to delete a film in the db */
app.delete('/api/films/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const changes = await filmDao.deleteFilm(id);
        if (changes === 0) {
            return res.status(404).json({ error: `Film with id ${id} not found` });
        }
        res.json(200);
    } catch (err) {
        res.status(503).json({ error: `Database error for film ${req.params.id}: ${err}` });
    }
});


/* This function modifies all parameters of a film with a given id */
app.put('/api/films/:id', async(req, res) => {
    const title = req.body.title;
    const favorite = req.body.isFavorite;
    const rating = req.body.rating;
    const watchDate = req.body.watchDate;
    try{
        const film = await filmDao.getFilmById(req.params.id);
        if (film.error) return res.status(404).json(film);
        film.title = title;
        film.favorite = favorite;
        film.rating = rating;
        film.watchDate = watchDate;
        const result = await filmDao.updateFilm(film);
        if (result.error) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    }catch (err){
        res.status(503).json({ error: `Database error for film ${req.params.id}: ${err}` });
    }
})


/* Modifies only the parameter isFavorite of a film */
app.put('/api/films/:id/favorite', async (req, res) => {
    const favorite = req.body.favorite;
    
    try {
        const film = await filmDao.getFilmById(req.params.id);
        if (film.error) return res.status(404).json(film);
        film.isFavorite = favorite;
        const result = await filmDao.updateFilm(film);
        if (result.error) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    } catch (err) {
        res.status(503).json({ error: `Database error for film ${req.params.id}: ${err}` });
    }
});


/* Modifies only the parameter rating of a film */
app.put('/api/films/:id/rating', async (req, res) => {
    const rating = req.body.rating;
    try {
        const film = await filmDao.getFilmById(req.params.id);
        if (film.error) return res.status(404).json(film);
        film.rating = rating;
        const result = await filmDao.updateFilm(film);
        if (result.error) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    } catch (err) {
        res.status(503).json({ error: `Database error for film ${req.params.id}: ${err}` });
    }
});


/* Start the server */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

