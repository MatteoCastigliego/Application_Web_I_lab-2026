import 'bootstrap/dist/css/bootstrap.min.css';
// Puoi rimuovere l'import di App.css se contiene ancora gli stili di default di Vite

import { Film } from './models/FilmModels.js';
import Header from './components/Header.jsx';
import Filters from './components/Filters.jsx';
import ListOfFilms from './components/ListOfFilms.jsx';
import AddFilmButton from './components/AddFilmButton.jsx'
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import './App.css';

function App() {
  const id = -1
  const film1 = new Film(id+1, "Mare Fuori", true, 4, "2025-03-10", 2);
  const film2 = new Film(id+1, "Quo Vado?", true, 3, "2019-02-14", 1);
  const film3 = new Film(id+1, "Suits", true, 5, "2020-12-16", 1);
  const film4 = new Film(id+1, "Harry Potter", false, 3, "1991-05-25", 3);
  const film5 = new Film(id+1, "Benvenuti al Sud", false, 3, "1974-01-11", 4);
  const film6 = new Film(id+1, "Fast And Furious", true, 4, "1975-07-24", 2);

  const FilmsList = [];
  FilmsList.push(film1)
  FilmsList.push(film2)
  FilmsList.push(film3)
  FilmsList.push(film4)
  FilmsList.push(film5)
  FilmsList.push(film6)

  const [film, setFilms] = useState(FilmsList)
  const [activeFilter, setActiveFilter] = useState('All');

  // Funzione per aggiungere un nuovo film alla lista
  const addFilm = (newFilmData) => {
    const newId = Math.max(0, ...film.map(f => f.id)) + 1;
    const newFilm = new Film(newId, newFilmData.title, newFilmData.isFavorite, newFilmData.rating, newFilmData.watchDate, 1);
    setFilms((oldFilms) => [...oldFilms, newFilm]);
  };

  // Logica per calcolare dinamicamente i film da mostrare in base al filtro
  const getFilteredFilms = () => {
    switch (activeFilter) {
      case 'Favourite': return film.filter(f => f.isFavorite);
      case 'Best Rated': return film.filter(f => f.rating === 5);
      case 'Seen Last Month':
        const lastMonth = dayjs().subtract(30, 'day');
        return film.filter(f => f.watchDate && f.watchDate.isAfter(lastMonth));
      case 'Unseen': return film.filter(f => !f.watchDate);
      default: return film; // 'All'
    }
  };

  return (
    <>
      <Header></Header>

      {/* Griglia Bootstrap per il layout principale */}
      <Container fluid className="mt-3">
        <Row>
          <Col md={4}>
            <Filters activeFilter={activeFilter} onSelectFilter={setActiveFilter} />
          </Col>
          <Col md={8}>
            <ListOfFilms films={getFilteredFilms()} activeFilter={activeFilter} />
          </Col>
        </Row>
      </Container>
      <AddFilmButton addFilm={addFilm} />
    </>
  )
}

export default App
